
import { Users, BookOpen, Plus, UserMinus, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStudyGroups } from '@/hooks/useStudyGroups';

interface StudyGroupsProps {
  currentUser: any;
  availableSkills?: string[];
}

export const StudyGroups = ({ currentUser, availableSkills = [] }: StudyGroupsProps) => {
  const { groups, loading, joinGroup, leaveGroup, createGroup } = useStudyGroups();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading study groups...</p>
        </div>
      </div>
    );
  }

  // Get skills that don't have groups yet
  const skillsWithoutGroups = availableSkills.filter(skill => 
    !groups.some(group => group.skill_name.toLowerCase() === skill.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Study Groups 📚</h2>
        <p className="text-gray-600">
          Join communities of learners sharing knowledge about specific skills
        </p>
      </div>

      {/* Create new groups section */}
      {skillsWithoutGroups.length > 0 && (
        <Card className="border-0 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Start a New Study Group</h3>
              <p className="mb-4 opacity-90">
                Create study groups for skills that don't have communities yet!
              </p>
              <div className="flex justify-center flex-wrap gap-2">
                {skillsWithoutGroups.slice(0, 6).map((skill) => (
                  <Button
                    key={skill}
                    onClick={() => createGroup(skill)}
                    className="bg-white text-purple-600 hover:bg-gray-100"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    {skill}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Study groups grid */}
      {groups.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No study groups yet</h3>
          <p className="text-gray-600 mb-6">
            Be the first to create study groups for your skills!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <Card key={group.id} className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {group.skill_name}
                  </Badge>
                </div>
                {group.description && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{group.description}</p>
                )}
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {group.member_count} {group.member_count === 1 ? 'member' : 'members'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Created {new Date(group.created_at).toLocaleDateString()}
                  </div>
                </div>

                <div className="pt-2">
                  {group.is_member ? (
                    <Button
                      onClick={() => leaveGroup(group.id)}
                      variant="outline"
                      className="w-full border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <UserMinus className="w-4 h-4 mr-2" />
                      Leave Group
                    </Button>
                  ) : (
                    <Button
                      onClick={() => joinGroup(group.id)}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Join Group
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
