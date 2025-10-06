import mongoose, { Document, Schema } from 'mongoose';
import { PersonalProfile, SkillResult, CareerRecommendation } from '@/types';

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  provider?: string;
  providerId?: string;
  skillResults?: SkillResult[];
  personalProfile?: PersonalProfile;
  careerRecommendations?: CareerRecommendation[];
  assessmentCompleted: boolean;
  profileCompleted: boolean;
  recommendationsGenerated: boolean;
  guidanceViewed: {
    careerExploration: boolean;
    skillDevelopment: boolean;
    educationPlanning: boolean;
    industryInsights: boolean;
    lastViewedAt?: Date;
  };
  assessmentHistory: {
    sessionId: string;
    completedAt: Date;
    skillResults: SkillResult[];
    personalProfile?: PersonalProfile;
    recommendations?: CareerRecommendation[];
  }[];
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  assessmentStartedAt?: Date;
  assessmentCompletedAt?: Date;
  
  // Methods
  isFullyCompleted(): boolean;
  getTopSkills(limit?: number): SkillResult[];
  saveAssessmentToHistory(sessionId: string): void;
  needsGuidance(): boolean;
  markGuidanceViewed(section: string): void;
  progressPercentage: number;
}

const SkillResultSchema = new Schema({
  area: { type: String, required: true },
  score: { type: Number, required: true },
  maxScore: { type: Number, required: true },
  percentage: { type: Number, required: true },
  level: { 
    type: String, 
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    required: true 
  }
});

const PersonalProfileSchema = new Schema({
  interests: [{ type: String }],
  personalityTraits: [{ type: String }],
  workEnvironment: [{ type: String }],
  values: [{ type: String }],
  careerGoals: { type: String },
  additionalInfo: { type: String }
});

const CareerRecommendationSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  responsibilities: [{ type: String }],
  whySuitable: { type: String, required: true },
  educationPath: { type: String, required: true },
  salaryRange: { type: String, required: true },
  growthProspects: { type: String, required: true },
  keySkills: [{ type: String }],
  matchingSkills: [{ type: String }],
  matchPercentage: { type: Number, required: true }
});

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    minlength: 6
  },
  image: {
    type: String
  },
  provider: {
    type: String,
    enum: ['credentials', 'google', 'github'],
    default: 'credentials'
  },
  providerId: {
    type: String
  },
  skillResults: [SkillResultSchema],
  personalProfile: PersonalProfileSchema,
  careerRecommendations: [CareerRecommendationSchema],
  assessmentCompleted: {
    type: Boolean,
    default: false
  },
  profileCompleted: {
    type: Boolean,
    default: false
  },
  recommendationsGenerated: {
    type: Boolean,
    default: false
  },
  guidanceViewed: {
    type: {
      careerExploration: { type: Boolean, default: false },
      skillDevelopment: { type: Boolean, default: false },
      educationPlanning: { type: Boolean, default: false },
      industryInsights: { type: Boolean, default: false },
      lastViewedAt: { type: Date }
    },
    default: {
      careerExploration: false,
      skillDevelopment: false,
      educationPlanning: false,
      industryInsights: false
    }
  },
  assessmentHistory: {
    type: [{
      sessionId: { type: String, required: true },
      completedAt: { type: Date, required: true },
      skillResults: [SkillResultSchema],
      personalProfile: PersonalProfileSchema,
      recommendations: [CareerRecommendationSchema]
    }],
    default: []
  },
  lastLoginAt: {
    type: Date
  },
  assessmentStartedAt: {
    type: Date
  },
  assessmentCompletedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes for better query performance
UserSchema.index({ email: 1 });
UserSchema.index({ createdAt: -1 });
UserSchema.index({ assessmentCompleted: 1 });

// Virtual for user's progress percentage
UserSchema.virtual('progressPercentage').get(function() {
  let progress = 0;
  if (this.assessmentCompleted) progress += 40;
  if (this.profileCompleted) progress += 30;
  if (this.recommendationsGenerated) progress += 30;
  return progress;
});

// Method to check if user has completed all steps
UserSchema.methods.isFullyCompleted = function() {
  return this.assessmentCompleted && this.profileCompleted && this.recommendationsGenerated;
};

// Method to get user's top skills
UserSchema.methods.getTopSkills = function(limit: number = 3) {
  if (!this.skillResults) return [];
  return this.skillResults
    .sort((a: any, b: any) => b.percentage - a.percentage)
    .slice(0, limit);
};

// Method to save current assessment to history
UserSchema.methods.saveAssessmentToHistory = function(sessionId: string) {
  if (this.assessmentCompleted && this.skillResults) {
    const historyEntry = {
      sessionId,
      completedAt: new Date(),
      skillResults: this.skillResults,
      personalProfile: this.personalProfile,
      recommendations: this.careerRecommendations
    };
    this.assessmentHistory.push(historyEntry);
  }
};

// Method to check if user needs to view guidance
UserSchema.methods.needsGuidance = function() {
  return this.assessmentCompleted && !this.isFullyCompleted();
};

// Method to mark guidance section as viewed
UserSchema.methods.markGuidanceViewed = function(section: string) {
  if (this.guidanceViewed) {
    this.guidanceViewed[section as keyof typeof this.guidanceViewed] = true;
    this.guidanceViewed.lastViewedAt = new Date();
  }
};

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);