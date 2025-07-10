
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { findMatches } from '@/utils/matchingAlgorithm';

interface UserProfile {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  skillsToTeach: string[];
  skillsToLearn: string[];
}

interface MatchResult extends UserProfile {
  matchScore: number;
  commonTeachingSkills: string[];
  commonLearningSkills: string[];
  mutualExchangeSkills: string[];
}

export const useMatches = (currentUser: UserProfile | null) => {
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchMatches = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);

      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) throw profilesError;

      // Fetch all teaching skills
      const { data: teachingSkills, error: teachError } = await supabase
        .from('user_skills_teach')
        .select('user_id, skill_name');

      if (teachError) throw teachError;

      // Fetch all learning skills
      const { data: learningSkills, error: learnError } = await supabase
        .from('user_skills_learn')
        .select('user_id, skill_name');

      if (learnError) throw learnError;

      // Combine the data into user profiles
      const allUsers: UserProfile[] = profiles?.map(profile => ({
        id: profile.id,
        name: profile.name,
        bio: profile.bio,
        avatar: profile.avatar,
        skillsToTeach: teachingSkills
          ?.filter(skill => skill.user_id === profile.id)
          .map(skill => skill.skill_name) || [],
        skillsToLearn: learningSkills
          ?.filter(skill => skill.user_id === profile.id)
          .map(skill => skill.skill_name) || []
      })) || [];

      // Find matches using the algorithm
      const matchResults = findMatches(currentUser, allUsers);

      setMatches(matchResults.slice(0, 20)); // Limit to top 20 matches
    } catch (error: any) {
      console.error('Error fetching matches:', error);
      toast({
        title: "Error",
        description: "Failed to load matches. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [currentUser]);

  return {
    matches,
    loading,
    refetch: fetchMatches,
  };
};
