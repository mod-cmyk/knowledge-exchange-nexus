
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  skillsToTeach: string[];
  skillsToLearn: string[];
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      // Fetch teaching skills
      const { data: teachSkills, error: teachError } = await supabase
        .from('user_skills_teach')
        .select('skill_name')
        .eq('user_id', user.id);

      if (teachError) throw teachError;

      // Fetch learning skills
      const { data: learnSkills, error: learnError } = await supabase
        .from('user_skills_learn')
        .select('skill_name')
        .eq('user_id', user.id);

      if (learnError) throw learnError;

      setProfile({
        id: profileData.id,
        name: profileData.name,
        bio: profileData.bio,
        avatar: profileData.avatar,
        skillsToTeach: teachSkills?.map(s => s.skill_name) || [],
        skillsToLearn: learnSkills?.map(s => s.skill_name) || [],
      });
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Pick<Profile, 'name' | 'bio'>>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...updates } : null);
      
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    }
  };

  return {
    profile,
    loading,
    updateProfile,
    refetch: fetchProfile,
  };
};
