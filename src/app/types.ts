export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
}

export interface SkillArea {
  name: string;
  description: string;
  questions: Question[];
  icon: string;
}

export interface SkillResult {
  area: string;
  score: number;
  maxScore: number;
  percentage: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface PersonalProfile {
  interests: string[];
  personalityTraits: string[];
  workEnvironment: string[];
  values: string[];
  careerGoals: string;
  additionalInfo: string;
}

export interface CareerRecommendation {
  title: string;
  description: string;
  responsibilities: string[];
  whySuitable: string;
  educationPath: string;
  salaryRange: string;
  growthProspects: string;
  keySkills: string[];
  matchingSkills: string[];
  matchPercentage: number;
}