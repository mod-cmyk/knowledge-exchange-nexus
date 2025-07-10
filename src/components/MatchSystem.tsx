
import { MessageCircle, Star, Users, ArrowRightLeft, BookOpen, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMatches } from '@/hooks/useMatches';
import { Badge } from '@/components/ui/badge';
import { StudyGroups } from './StudyGroups';
import { useState } from 'react';

interface MatchSystemProps {
  currentUser: any;
}

export const MatchSystem = ({ currentUser }: MatchSystemProps) => {
  const { matches, loading } = useMatches(currentUser);
  const [activeTab, setActiveTab] = useState<'matches' | 'groups'>('matches');

  // Get all unique skills from current user
  const allUserSkills = [
    ...(currentUser?.skillsToTeach || []),
    ...(currentUser?.skillsToLearn || [])
  ];

  if (loading && activeTab === 'matches') {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Finding your perfect matches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-1 shadow-sm border">
          <Button
            onClick={() => setActiveTab('matches')}
            variant={activeTab === 'matches' ? 'default' : 'ghost'}
            className={activeTab === 'matches' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : ''}
          >
            <Users className="w-4 h-4 mr-2" />
            Find Matches
          </Button>
          <Button
            onClick={() => setActiveTab('groups')}
            variant={activeTab === 'groups' ? 'default' : 'ghost'}
            className={activeTab === 'groups' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : ''}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Study Groups
          </Button>
        </div>
      </div>

      {activeTab === 'matches' ? (
        <>
          {matches.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches found yet</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any compatible users right now. Try adding more skills to your profile or check back later!
              </p>
              <Button 
                onClick={() => setActiveTab('groups')}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Explore Study Groups
              </Button>
            </div>
          ) : (
            <>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Perfect Matches 🎯</h2>
                <p className="text-gray-600">
                  Found {matches.length} compatible learners based on your skills and interests
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {matches.map((match) => (
                  <Card key={match.id} className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden group">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={match.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${match.id}`}
                          alt={match.name}
                          className="w-16 h-16 rounded-full bg-gray-200"
                        />
                        <div className="flex-1">
                          <CardTitle className="text-lg">{match.name}</CardTitle>
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium text-green-600">
                              {match.matchScore}% Match
                            </span>
                          </div>
                        </div>
                      </div>
                      {match.bio && (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{match.bio}</p>
                      )}
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Mutual Exchange Skills (Highest Priority) */}
                      {match.mutualExchangeSkills.length > 0 && (
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <ArrowRightLeft className="w-4 h-4 text-purple-600" />
                            <h4 className="text-sm font-medium text-purple-600">Perfect Exchange</h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {match.mutualExchangeSkills.slice(0, 3).map((skill, index) => (
                              <Badge key={index} className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Skills they can teach me */}
                      {match.skillsToTeach.filter(skill => 
                        currentUser?.skillsToLearn?.includes(skill)
                      ).length > 0 && (
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <BookOpen className="w-4 h-4 text-green-600" />
                            <h4 className="text-sm font-medium text-green-600">Can Teach You</h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {match.skillsToTeach
                              .filter(skill => currentUser?.skillsToLearn?.includes(skill))
                              .slice(0, 3)
                              .map((skill, index) => (
                                <Badge key={index} className="bg-green-100 text-green-700 hover:bg-green-200">
                                  {skill}
                                </Badge>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Skills I can teach them */}
                      {currentUser?.skillsToTeach?.filter(skill => 
                        match.skillsToLearn.includes(skill)
                      ).length > 0 && (
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Target className="w-4 h-4 text-blue-600" />
                            <h4 className="text-sm font-medium text-blue-600">Wants to Learn</h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {currentUser.skillsToTeach
                              .filter(skill => match.skillsToLearn.includes(skill))
                              .slice(0, 3)
                              .map((skill, index) => (
                                <Badge key={index} className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                                  {skill}
                                </Badge>
                              ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-2 space-y-2">
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Send Message
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Users className="w-4 h-4 mr-2" />
                          View Full Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-0 bg-gradient-to-r from-green-500 to-blue-500 text-white">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">Want more connections?</h3>
                    <p className="mb-4 opacity-90">
                      Join study groups to connect with more learners and share knowledge in communities!
                    </p>
                    <Button 
                      onClick={() => setActiveTab('groups')}
                      className="bg-white text-green-600 hover:bg-gray-100"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Explore Study Groups
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </>
      ) : (
        <StudyGroups currentUser={currentUser} availableSkills={allUserSkills} />
      )}
    </div>
  );
};
