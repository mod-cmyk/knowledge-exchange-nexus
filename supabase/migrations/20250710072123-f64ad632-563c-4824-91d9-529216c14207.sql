
-- Create study groups table
CREATE TABLE public.study_groups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  skill_name TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  member_count INTEGER NOT NULL DEFAULT 1,
  UNIQUE(skill_name)
);

-- Create study group members table
CREATE TABLE public.study_group_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES public.study_groups(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- Enable RLS on study_groups
ALTER TABLE public.study_groups ENABLE ROW LEVEL SECURITY;

-- Enable RLS on study_group_members
ALTER TABLE public.study_group_members ENABLE ROW LEVEL SECURITY;

-- RLS policies for study_groups
CREATE POLICY "Study groups are viewable by everyone" 
  ON public.study_groups 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can create study groups" 
  ON public.study_groups 
  FOR INSERT 
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Group creators can update their groups" 
  ON public.study_groups 
  FOR UPDATE 
  USING (auth.uid() = created_by);

-- RLS policies for study_group_members
CREATE POLICY "Group members are viewable by everyone" 
  ON public.study_group_members 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can join groups" 
  ON public.study_group_members 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave groups" 
  ON public.study_group_members 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Function to update member count
CREATE OR REPLACE FUNCTION update_group_member_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.study_groups 
    SET member_count = member_count + 1 
    WHERE id = NEW.group_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.study_groups 
    SET member_count = member_count - 1 
    WHERE id = OLD.group_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update member count
CREATE TRIGGER update_member_count_trigger
  AFTER INSERT OR DELETE ON public.study_group_members
  FOR EACH ROW EXECUTE FUNCTION update_group_member_count();
