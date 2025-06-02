
import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export const CreateProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || skillsToTeach.length === 0 || skillsToLearn.length === 0) return;

    setLoading(true);

    try {
      // Save teaching skills
      const teachingSkills = skillsToTeach.map(skill => ({
        user_id: user.id,
        skill_name: skill,
      }));

      const { error: teachError } = await supabase
        .from('user_skills_teach')
        .insert(teachingSkills);

      if (teachError) throw teachError;

      // Save learning skills
      const learningSkills = skillsToLearn.map(skill => ({
        user_id: user.id,
        skill_name: skill,
      }));

      const { error: learnError } = await supabase
        .from('user_skills_learn')
        .insert(learningSkills);

      if (learnError) throw learnError;

      toast({
        title: "Profile Created!",
        description: "Your skills have been saved successfully.",
      });

      // Refresh the page to show the updated profile
      window.location.reload();
    } catch (error: any) {
      console.error('Error saving skills:', error);
      toast({
        title: "Error",
        description: "Failed to save your skills. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Complete Your Profile
        </h2>
        <p className="text-gray-600 text-lg">
          Add your skills to start exchanging knowledge with fellow learners
        </p>
      </div>

      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Add Your Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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
              disabled={loading || skillsToTeach.length === 0 || skillsToLearn.length === 0}
            >
              {loading ? 'Saving...' : 'Complete Profile & Start Learning'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
