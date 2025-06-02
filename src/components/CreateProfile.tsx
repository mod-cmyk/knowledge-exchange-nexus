
import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CreateProfileProps {
  onProfileCreated: (user: any) => void;
}

export const CreateProfile = ({ onProfileCreated }: CreateProfileProps) => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [skillsToTeach, setSkillsToTeach] = useState<string[]>([]);
  const [skillsToLearn, setSkillsToLearn] = useState<string[]>([]);
  const [newTeachSkill, setNewTeachSkill] = useState('');
  const [newLearnSkill, setNewLearnSkill] = useState('');

  const addSkill = (skill: string, type: 'teach' | 'learn') => {
    if (skill.trim()) {
      if (type === 'teach') {
        setSkillsToTeach([...skillsToTeach, skill.trim()]);
        setNewTeachSkill('');
      } else {
        setSkillsToLearn([...skillsToLearn, skill.trim()]);
        setNewLearnSkill('');
      }
    }
  };

  const removeSkill = (index: number, type: 'teach' | 'learn') => {
    if (type === 'teach') {
      setSkillsToTeach(skillsToTeach.filter((_, i) => i !== index));
    } else {
      setSkillsToLearn(skillsToLearn.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && skillsToTeach.length > 0 && skillsToLearn.length > 0) {
      const user = {
        id: Date.now(),
        name,
        bio,
        skillsToTeach,
        skillsToLearn,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      };
      onProfileCreated(user);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Welcome to SkillSwap!
        </h2>
        <p className="text-gray-600 text-lg">
          Create your profile to start exchanging knowledge with fellow learners
        </p>
      </div>

      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio (Optional)
              </label>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us a bit about yourself..."
                className="w-full"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills I Can Teach
              </label>
              <div className="flex space-x-2 mb-3">
                <Input
                  value={newTeachSkill}
                  onChange={(e) => setNewTeachSkill(e.target.value)}
                  placeholder="Add a skill you can teach"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(newTeachSkill, 'teach'))}
                />
                <Button
                  type="button"
                  onClick={() => addSkill(newTeachSkill, 'teach')}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsToTeach.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(index, 'teach')}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills I Want to Learn
              </label>
              <div className="flex space-x-2 mb-3">
                <Input
                  value={newLearnSkill}
                  onChange={(e) => setNewLearnSkill(e.target.value)}
                  placeholder="Add a skill you want to learn"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(newLearnSkill, 'learn'))}
                />
                <Button
                  type="button"
                  onClick={() => addSkill(newLearnSkill, 'learn')}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsToLearn.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(index, 'learn')}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-lg"
              disabled={!name || skillsToTeach.length === 0 || skillsToLearn.length === 0}
            >
              Create Profile & Start Learning
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
