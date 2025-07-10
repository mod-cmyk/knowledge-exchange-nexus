
interface UserProfile {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  skillsToTeach: string[];
  skillsToLearn: string[];
}

interface MatchResult extends UserProfile {
  matchScore: number;
  commonTeachingSkills: string[];
  commonLearningSkills: string[];
  mutualExchangeSkills: string[];
}

export const calculateMatchScore = (currentUser: UserProfile, otherUser: UserProfile): MatchResult => {
  // Skills that the other user can teach that current user wants to learn
  const canTeachToMe = otherUser.skillsToTeach.filter(skill => 
    currentUser.skillsToLearn.includes(skill)
  );

  // Skills that current user can teach that other user wants to learn
  const canLearnFromMe = currentUser.skillsToTeach.filter(skill => 
    otherUser.skillsToLearn.includes(skill)
  );

  // Mutual exchange skills (bidirectional learning opportunity)
  const mutualExchange = canTeachToMe.filter(skill => canLearnFromMe.includes(skill));

  // Common skills they both want to teach (potential collaboration)
  const commonTeaching = currentUser.skillsToTeach.filter(skill => 
    otherUser.skillsToTeach.includes(skill)
  );

  // Common skills they both want to learn (potential study group)
  const commonLearning = currentUser.skillsToLearn.filter(skill => 
    otherUser.skillsToLearn.includes(skill)
  );

  // Calculate match score based on different factors
  let score = 0;

  // Bidirectional teaching/learning gets highest score (perfect match)
  score += mutualExchange.length * 40;

  // One-way teaching opportunities
  score += canTeachToMe.length * 25;
  score += canLearnFromMe.length * 25;

  // Common interests add moderate value
  score += commonTeaching.length * 10;
  score += commonLearning.length * 15;

  // Bonus for having a bio (more serious users)
  if (otherUser.bio && otherUser.bio.length > 20) {
    score += 5;
  }

  // Cap the score at 100
  const finalScore = Math.min(score, 100);

  return {
    ...otherUser,
    matchScore: finalScore,
    commonTeachingSkills: commonTeaching,
    commonLearningSkills: commonLearning,
    mutualExchangeSkills: mutualExchange
  };
};

export const findMatches = (currentUser: UserProfile, allUsers: UserProfile[]): MatchResult[] => {
  // Filter out current user and users with no skills
  const potentialMatches = allUsers.filter(user => 
    user.id !== currentUser.id && 
    (user.skillsToTeach.length > 0 || user.skillsToLearn.length > 0)
  );

  // Calculate match scores for all potential matches
  const matches = potentialMatches.map(user => calculateMatchScore(currentUser, user));

  // Filter out matches with score 0 and sort by score
  return matches
    .filter(match => match.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);
};
