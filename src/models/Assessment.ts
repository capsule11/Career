import mongoose, { Document, Schema } from 'mongoose';

export interface IAssessment extends Document {
  _id: string;
  userId: string;
  sessionId: string;
  answers: {
    questionId: string;
    selectedAnswer: number;
    isCorrect: boolean;
    timeSpent: number; // in seconds
    skillArea: string;
  }[];
  totalQuestionsAttempted: number;
  totalCorrectAnswers: number;
  totalTimeSpent: number; // in seconds
  status: 'in_progress' | 'completed' | 'abandoned';
  startedAt: Date;
  completedAt?: Date;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AssessmentAnswerSchema = new Schema({
  questionId: { type: String, required: true },
  selectedAnswer: { type: Number, required: true },
  isCorrect: { type: Boolean, required: true },
  timeSpent: { type: Number, required: true }, // seconds
  skillArea: { type: String, required: true }
});

const AssessmentSchema = new Schema<IAssessment>({
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  answers: [AssessmentAnswerSchema],
  totalQuestionsAttempted: {
    type: Number,
    default: 0
  },
  totalCorrectAnswers: {
    type: Number,
    default: 0
  },
  totalTimeSpent: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['in_progress', 'completed', 'abandoned'],
    default: 'in_progress'
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  }
}, {
  timestamps: true
});

// Indexes
AssessmentSchema.index({ userId: 1, createdAt: -1 });
AssessmentSchema.index({ sessionId: 1 });
AssessmentSchema.index({ status: 1 });

// Virtual for accuracy percentage
AssessmentSchema.virtual('accuracyPercentage').get(function() {
  if (this.totalQuestionsAttempted === 0) return 0;
  return Math.round((this.totalCorrectAnswers / this.totalQuestionsAttempted) * 100);
});

// Virtual for average time per question
AssessmentSchema.virtual('averageTimePerQuestion').get(function() {
  if (this.totalQuestionsAttempted === 0) return 0;
  return Math.round(this.totalTimeSpent / this.totalQuestionsAttempted);
});

// Method to add an answer
AssessmentSchema.methods.addAnswer = function(answer: {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
  skillArea: string;
}) {
  this.answers.push(answer);
  this.totalQuestionsAttempted += 1;
  if (answer.isCorrect) {
    this.totalCorrectAnswers += 1;
  }
  this.totalTimeSpent += answer.timeSpent;
};

// Method to complete assessment
AssessmentSchema.methods.complete = function() {
  this.status = 'completed';
  this.completedAt = new Date();
};

// Method to get performance by skill area
AssessmentSchema.methods.getPerformanceBySkillArea = function() {
  const skillAreaStats: { [key: string]: { correct: number; total: number; percentage: number } } = {};
  
  this.answers.forEach((answer: any) => {
    if (!skillAreaStats[answer.skillArea]) {
      skillAreaStats[answer.skillArea] = { correct: 0, total: 0, percentage: 0 };
    }
    skillAreaStats[answer.skillArea].total += 1;
    if (answer.isCorrect) {
      skillAreaStats[answer.skillArea].correct += 1;
    }
  });

  // Calculate percentages
  Object.keys(skillAreaStats).forEach(area => {
    const stats = skillAreaStats[area];
    stats.percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
  });

  return skillAreaStats;
};

export const Assessment = mongoose.models.Assessment || mongoose.model<IAssessment>('Assessment', AssessmentSchema);