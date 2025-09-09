import { useState, useCallback } from 'react';
import { AssessmentState, AssessmentAnswer, AssessmentResults, CategoryScore, WISCARScore } from '@/types/assessment';
import { assessmentQuestions } from '@/data/assessmentQuestions';

const initialState: AssessmentState = {
  currentStep: 0,
  totalSteps: assessmentQuestions.length,
  answers: [],
  results: null,
  isComplete: false,
};

export function useAssessment() {
  const [state, setState] = useState<AssessmentState>(initialState);

  const answerQuestion = useCallback((questionId: string, value: number | string) => {
    const question = assessmentQuestions.find(q => q.id === questionId);
    if (!question) return;

    // Calculate score based on question type
    let score = 0;
    if (question.type === 'likert') {
      score = typeof value === 'number' ? value : parseInt(value as string);
    } else if (question.type === 'multiple-choice') {
      // Score based on position in options array (higher index = higher score)
      const optionIndex = question.options?.indexOf(value as string) ?? 0;
      score = optionIndex + 1;
    } else if (question.type === 'scenario') {
      // All scenario answers get equal score
      score = 4;
    }

    const answer: AssessmentAnswer = {
      questionId,
      value,
      score,
    };

    setState(prev => ({
      ...prev,
      answers: prev.answers.filter(a => a.questionId !== questionId).concat(answer),
    }));
  }, []);

  const nextStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, prev.totalSteps - 1),
    }));
  }, []);

  const prevStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0),
    }));
  }, []);

  const calculateResults = useCallback(() => {
    const { answers } = state;
    
    // Calculate category scores
    const categoryScores: CategoryScore[] = [];
    const categories = ['interest', 'personality', 'technical', 'wiscar'];
    
    categories.forEach(category => {
      const categoryAnswers = answers.filter(a => {
        const question = assessmentQuestions.find(q => q.id === a.questionId);
        return question?.category === category;
      });
      
      const totalScore = categoryAnswers.reduce((sum, a) => sum + a.score, 0);
      const maxPossibleScore = categoryAnswers.length * 5; // Assuming max score is 5
      const percentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
      
      let level: CategoryScore['level'] = 'Low';
      if (percentage >= 85) level = 'Excellent';
      else if (percentage >= 70) level = 'High';
      else if (percentage >= 50) level = 'Moderate';
      
      categoryScores.push({
        category: category.charAt(0).toUpperCase() + category.slice(1),
        score: totalScore,
        maxScore: maxPossibleScore,
        percentage: Math.round(percentage),
        level,
      });
    });

    // Calculate WISCAR scores
    const wiscarScores: WISCARScore = {
      will: calculateWISCARDimension('will', answers),
      interest: calculateWISCARDimension('interest', answers),
      skill: calculateWISCARDimension('skill', answers),
      cognitiveReadiness: calculateWISCARDimension('cognitiveReadiness', answers),
      abilityToLearn: calculateWISCARDimension('abilityToLearn', answers),
      realWorldAlignment: calculateWISCARDimension('realWorldAlignment', answers),
    };

    // Calculate overall metrics
    const overallScore = Math.round(categoryScores.reduce((sum, cat) => sum + cat.percentage, 0) / categories.length);
    const confidenceScore = Math.round((Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6) * 100);
    
    let recommendation: AssessmentResults['recommendation'] = 'No';
    if (overallScore >= 75 && confidenceScore >= 70) recommendation = 'Yes';
    else if (overallScore >= 60 || confidenceScore >= 60) recommendation = 'Maybe';

    // Generate personalized insights
    const personalizedInsights = generateInsights(categoryScores, wiscarScores, overallScore);
    const nextSteps = generateNextSteps(recommendation, categoryScores);
    const careerRoles = generateCareerRoles(overallScore, wiscarScores);
    const skillGaps = generateSkillGaps(categoryScores);
    const recommendedPath = generateRecommendedPath(recommendation, categoryScores);

    const results: AssessmentResults = {
      overallScore,
      confidenceScore,
      recommendation,
      categoryScores,
      wiscarScores,
      personalizedInsights,
      nextSteps,
      careerRoles,
      skillGaps,
      recommendedPath,
    };

    setState(prev => ({
      ...prev,
      results,
      isComplete: true,
    }));
  }, [state]);

  const resetAssessment = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    ...state,
    answerQuestion,
    nextStep,
    prevStep,
    calculateResults,
    resetAssessment,
    currentQuestion: assessmentQuestions[state.currentStep],
    progress: ((state.currentStep + 1) / state.totalSteps) * 100,
  };
}

function calculateWISCARDimension(dimension: string, answers: AssessmentAnswer[]): number {
  const dimensionAnswers = answers.filter(a => {
    const question = assessmentQuestions.find(q => q.id === a.questionId);
    return question?.subcategory === dimension;
  });
  
  if (dimensionAnswers.length === 0) return 0;
  
  const totalScore = dimensionAnswers.reduce((sum, a) => sum + a.score, 0);
  const maxScore = dimensionAnswers.length * 5;
  return Math.round((totalScore / maxScore) * 5 * 100) / 100;
}

function generateInsights(categoryScores: CategoryScore[], wiscarScores: WISCARScore, overallScore: number): string[] {
  const insights: string[] = [];
  
  if (overallScore >= 80) {
    insights.push("Your strong motivation and comprehensive skill profile make you an excellent candidate for VR healthcare specialization.");
  } else if (overallScore >= 60) {
    insights.push("You show good potential for VR healthcare, with some areas for development.");
  } else {
    insights.push("Consider building foundational skills before pursuing VR healthcare specialization.");
  }

  const techScore = categoryScores.find(c => c.category === 'Technical');
  if (techScore && techScore.percentage < 60) {
    insights.push("Enhancing your technical skills, particularly in programming and VR development, will significantly improve your readiness.");
  }

  const interestScore = categoryScores.find(c => c.category === 'Interest');
  if (interestScore && interestScore.percentage >= 80) {
    insights.push("Your high interest level is a strong foundation for success in this interdisciplinary field.");
  }

  return insights;
}

function generateNextSteps(recommendation: string, categoryScores: CategoryScore[]): string[] {
  const steps: string[] = [];
  
  if (recommendation === 'Yes') {
    steps.push("Enroll in VR development courses focusing on Unity or Unreal Engine");
    steps.push("Build foundational knowledge in healthcare and medical terminology");
    steps.push("Start with simple VR healthcare projects or simulations");
    steps.push("Connect with VR healthcare professionals and communities");
  } else if (recommendation === 'Maybe') {
    steps.push("Strengthen areas with lower scores through targeted learning");
    steps.push("Gain hands-on experience with VR technology as a user");
    steps.push("Explore entry-level courses in both healthcare and VR development");
  } else {
    steps.push("Consider alternative paths in healthcare IT or VR development separately");
    steps.push("Build foundational skills in your areas of interest");
    steps.push("Reassess after gaining more experience in relevant fields");
  }
  
  return steps;
}

function generateCareerRoles(overallScore: number, wiscarScores: WISCARScore): string[] {
  const roles: string[] = [];
  
  if (wiscarScores.skill >= 4) {
    roles.push("VR Healthcare Developer");
    roles.push("Medical Simulation Specialist");
  }
  
  if (wiscarScores.interest >= 4 && wiscarScores.realWorldAlignment >= 4) {
    roles.push("Clinical VR Researcher");
    roles.push("Digital Therapeutics Designer");
  }
  
  if (overallScore >= 70) {
    roles.push("Healthcare UX Designer for VR");
    roles.push("VR Training Program Manager");
  }
  
  return roles.length > 0 ? roles : ["Healthcare IT Support", "VR Content Creator", "Medical Data Analyst"];
}

function generateSkillGaps(categoryScores: CategoryScore[]): string[] {
  const gaps: string[] = [];
  
  categoryScores.forEach(category => {
    if (category.percentage < 70) {
      switch (category.category.toLowerCase()) {
        case 'technical':
          gaps.push("Programming and VR development skills");
          break;
        case 'interest':
          gaps.push("Domain knowledge in healthcare applications");
          break;
        case 'personality':
          gaps.push("Collaborative and communication skills");
          break;
        case 'wiscar':
          gaps.push("Learning agility and adaptability");
          break;
      }
    }
  });
  
  return gaps;
}

function generateRecommendedPath(recommendation: string, categoryScores: CategoryScore[]): string {
  if (recommendation === 'Yes') {
    return "Advanced VR Healthcare Specialization Track: Start with Unity VR development, then progress to medical simulation projects, and finally pursue real-world healthcare VR internships.";
  } else if (recommendation === 'Maybe') {
    return "Foundation Building Track: Begin with VR fundamentals and basic healthcare knowledge, then reassess readiness for specialized VR healthcare training.";
  } else {
    return "Alternative Path Exploration: Consider related fields like healthcare IT, general VR development, or medical technology support while building relevant skills.";
  }
}