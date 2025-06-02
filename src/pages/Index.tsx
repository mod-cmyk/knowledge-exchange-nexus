
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { AuthPage } from '@/components/AuthPage';
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';
import { UserProfile } from '@/components/UserProfile';
import { MatchSystem } from '@/components/MatchSystem';
import { CreateProfile } from '@/components/CreateProfile';
import { useState } from 'react';

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      <Header 
        currentUser={profile} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
      />
      
      <main className="container mx-auto px-4 py-8">
        {!profile || (profile.skillsToTeach.length === 0 && profile.skillsToLearn.length === 0) ? (
          <CreateProfile />
        ) : (
          <>
            {activeTab === 'dashboard' && <Dashboard currentUser={profile} />}
            {activeTab === 'profile' && <UserProfile user={profile} />}
            {activeTab === 'matches' && <MatchSystem currentUser={profile} />}
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
