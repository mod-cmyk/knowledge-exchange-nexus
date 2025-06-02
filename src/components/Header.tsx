
import { Users, User, MessageCircle, BookOpen } from 'lucide-react';

interface HeaderProps {
  currentUser: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header = ({ currentUser, activeTab, setActiveTab }: HeaderProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
    { id: 'matches', label: 'Find Matches', icon: Users },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SkillSwap
            </h1>
          </div>

          {currentUser && (
            <nav className="flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};
