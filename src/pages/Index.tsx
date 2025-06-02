
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';
import { UserProfile } from '@/components/UserProfile';
import { MatchSystem } from '@/components/MatchSystem';
import { CreateProfile } from '@/components/CreateProfile';

const Index = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      <Header 
        currentUser={currentUser} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
      />
      
      <main className="container mx-auto px-4 py-8">
        {!currentUser ? (
          <CreateProfile onProfileCreated={setCurrentUser} />
        ) : (
          <>
            {activeTab === 'dashboard' && <Dashboard currentUser={currentUser} />}
            {activeTab === 'profile' && <UserProfile user={currentUser} onUpdate={setCurrentUser} />}
            {activeTab === 'matches' && <MatchSystem currentUser={currentUser} />}
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
