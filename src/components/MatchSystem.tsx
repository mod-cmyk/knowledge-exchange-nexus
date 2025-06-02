
import { useState } from 'react';
import { MessageCircle, Star, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MatchSystemProps {
  currentUser: any;
}

export const MatchSystem = ({ currentUser }: MatchSystemProps) => {
  const [matches] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      bio: 'Computer Science student passionate about web development and design',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      skillsToTeach: ['React', 'JavaScript', 'UI/UX Design'],
      skillsToLearn: ['Python', 'Data Science', 'Machine Learning'],
      matchScore: 95,
      commonSkills: ['JavaScript', 'Python']
    },
    {
      id: 2,
      name: 'Alex Rodriguez',
      bio: 'Marketing student with a love for data analysis and photography',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
      skillsToTeach: ['Photography', 'Adobe Photoshop', 'Social Media Marketing'],
      skillsToLearn: ['Web Development', 'JavaScript', 'SEO'],
      matchScore: 87,
      commonSkills: ['JavaScript', 'Marketing']
    },
    {
      id: 3,
      name: 'Maya Patel',
      bio: 'Psychology major interested in research methods and statistics',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maya',
      skillsToTeach: ['Research Methods', 'SPSS', 'Academic Writing'],
      skillsToLearn: ['Data Visualization', 'Python', 'Statistics'],
      matchScore: 78,
      commonSkills: ['Statistics', 'Research']
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Perfect Matches 🎯</h2>
        <p className="text-gray-600">Connect with fellow learners who complement your skills</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {matches.map((match) => (
          <Card key={match.id} className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden group">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={match.avatar}
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
              <p className="text-sm text-gray-600 mt-2">{match.bio}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Can Teach You:</h4>
                <div className="flex flex-wrap gap-1">
                  {match.skillsToTeach.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Wants to Learn:</h4>
                <div className="flex flex-wrap gap-1">
                  {match.skillsToLearn.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

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
            <h3 className="text-xl font-bold mb-2">Can't find the right match?</h3>
            <p className="mb-4 opacity-90">Join a study group or create your own learning circle!</p>
            <Button className="bg-white text-green-600 hover:bg-gray-100">
              <Users className="w-4 h-4 mr-2" />
              Browse Study Groups
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
