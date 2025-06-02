
import { TrendingUp, Users, BookOpen, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardProps {
  currentUser: any;
}

export const Dashboard = ({ currentUser }: DashboardProps) => {
  const stats = [
    { label: 'Skills to Teach', value: currentUser.skillsToTeach.length, icon: BookOpen, color: 'text-green-600' },
    { label: 'Skills to Learn', value: currentUser.skillsToLearn.length, icon: TrendingUp, color: 'text-blue-600' },
    { label: 'Potential Matches', value: '12', icon: Users, color: 'text-purple-600' },
    { label: 'Sessions This Week', value: '3', icon: Calendar, color: 'text-orange-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {currentUser.name}! 👋
        </h2>
        <p className="text-gray-600">Ready to share knowledge and learn something new today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-green-600" />
              <span>Your Teaching Skills</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {currentUser.skillsToTeach.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Learning Goals</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {currentUser.skillsToLearn.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-200">
              <Users className="w-6 h-6 mb-2" />
              <p className="font-medium">Find New Matches</p>
            </button>
            <button className="p-4 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-200">
              <Calendar className="w-6 h-6 mb-2" />
              <p className="font-medium">Schedule Session</p>
            </button>
            <button className="p-4 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-200">
              <BookOpen className="w-6 h-6 mb-2" />
              <p className="font-medium">Join Study Group</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
