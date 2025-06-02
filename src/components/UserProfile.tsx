
import { Edit, Mail, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface UserProfileProps {
  user: any;
}

export const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
                alt={user.name}
                className="w-24 h-24 rounded-full bg-gray-200"
              />
              <div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <p className="text-gray-600 mt-1">{user.bio || 'Learning enthusiast'}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span>Available for exchange</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Active member</span>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-600">
              <span>Skills I Can Teach</span>
              <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                {user.skillsToTeach?.length || 0}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {user.skillsToTeach?.map((skill: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
                >
                  <span className="font-medium text-green-800">{skill}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                      Available
                    </span>
                  </div>
                </div>
              )) || (
                <p className="text-gray-500 text-center py-4">No teaching skills added yet</p>
              )}
            </div>
            <Button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white">
              Add New Skill
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-600">
              <span>Skills I Want to Learn</span>
              <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {user.skillsToLearn?.length || 0}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {user.skillsToLearn?.map((skill: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200"
                >
                  <span className="font-medium text-blue-800">{skill}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      Seeking
                    </span>
                  </div>
                </div>
              )) || (
                <p className="text-gray-500 text-center py-4">No learning goals added yet</p>
              )}
            </div>
            <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white">
              Add Learning Goal
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Ready to Share Your Knowledge?</h3>
            <p className="mb-4 opacity-90">
              Your profile is active! Start connecting with learners who need your expertise.
            </p>
            <div className="flex justify-center space-x-4">
              <Button className="bg-white text-purple-600 hover:bg-gray-100">
                Find Students
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Browse Opportunities
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
