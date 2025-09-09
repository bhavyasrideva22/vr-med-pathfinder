export interface AssessmentQuestion {
  id: string;
  category: 'interest' | 'personality' | 'technical' | 'wiscar';
  subcategory?: string;
  type: 'likert' | 'multiple-choice' | 'scenario';
  question: string;
  options?: string[];
  scale?: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
  };
}

export interface AssessmentAnswer {
  questionId: string;
  value: number | string;
  score: number;
}

export interface CategoryScore {
  category: string;
  score: number;
  maxScore: number;
  percentage: number;
  level: 'Low' | 'Moderate' | 'High' | 'Excellent';
}

export interface WISCARScore {
  will: number;
  interest: number;
  skill: number;
  cognitiveReadiness: number;
  abilityToLearn: number;
  realWorldAlignment: number;
}

export interface AssessmentResults {
  overallScore: number;
  confidenceScore: number;
  recommendation: 'Yes' | 'No' | 'Maybe';
  categoryScores: CategoryScore[];
  wiscarScores: WISCARScore;
  personalizedInsights: string[];
  nextSteps: string[];
  careerRoles: string[];
  skillGaps: string[];
  recommendedPath: string;
}

export interface AssessmentState {
  currentStep: number;
  totalSteps: number;
  answers: AssessmentAnswer[];
  results: AssessmentResults | null;
  isComplete: boolean;
}