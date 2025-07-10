
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './useAuth';

interface StudyGroup {
  id: string;
  skill_name: string;
  name: string;
  description?: string;
  created_by: string;
  member_count: number;
  created_at: string;
  is_member?: boolean;
}

export const useStudyGroups = () => {
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchGroups = async () => {
    try {
      setLoading(true);

      // Fetch all study groups
      const { data: groupsData, error: groupsError } = await supabase
        .from('study_groups')
        .select('*')
        .order('member_count', { ascending: false });

      if (groupsError) throw groupsError;

      // If user is logged in, check which groups they're members of
      if (user && groupsData) {
        const { data: memberships, error: memberError } = await supabase
          .from('study_group_members')
          .select('group_id')
          .eq('user_id', user.id);

        if (memberError) throw memberError;

        const memberGroupIds = memberships?.map(m => m.group_id) || [];

        const groupsWithMembership = groupsData.map(group => ({
          ...group,
          is_member: memberGroupIds.includes(group.id)
        }));

        setGroups(groupsWithMembership);
      } else {
        setGroups(groupsData || []);
      }
    } catch (error: any) {
      console.error('Error fetching study groups:', error);
      toast({
        title: "Error",
        description: "Failed to load study groups. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const joinGroup = async (groupId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to join study groups.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('study_group_members')
        .insert({
          group_id: groupId,
          user_id: user.id
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "You've joined the study group!",
      });

      // Refresh groups to update membership status
      fetchGroups();
    } catch (error: any) {
      console.error('Error joining group:', error);
      toast({
        title: "Error",
        description: "Failed to join the group. You might already be a member.",
        variant: "destructive",
      });
    }
  };

  const leaveGroup = async (groupId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('study_group_members')
        .delete()
        .eq('group_id', groupId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "You've left the study group.",
      });

      // Refresh groups to update membership status
      fetchGroups();
    } catch (error: any) {
      console.error('Error leaving group:', error);
      toast({
        title: "Error",
        description: "Failed to leave the group. Please try again.",
        variant: "destructive",
      });
    }
  };

  const createGroup = async (skillName: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to create study groups.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('study_groups')
        .insert({
          skill_name: skillName,
          name: `${skillName} Study Group`,
          description: `A community for learning and sharing knowledge about ${skillName}`,
          created_by: user.id
        })
        .select()
        .single();

      if (error) throw error;

      // Auto-join the creator to the group
      if (data) {
        await supabase
          .from('study_group_members')
          .insert({
            group_id: data.id,
            user_id: user.id
          });
      }

      toast({
        title: "Success",
        description: `Study group for ${skillName} created successfully!`,
      });

      // Refresh groups
      fetchGroups();
    } catch (error: any) {
      console.error('Error creating group:', error);
      toast({
        title: "Error",
        description: "Failed to create study group. It might already exist.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [user]);

  return {
    groups,
    loading,
    joinGroup,
    leaveGroup,
    createGroup,
    refetch: fetchGroups,
  };
};
