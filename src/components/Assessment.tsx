import React from 'react';
import { useAssessment } from '@/hooks/useAssessment';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AssessmentProps {
  onComplete: () => void;
}

export function Assessment({ onComplete }: AssessmentProps) {
  const {
    currentQuestion,
    currentStep,
    totalSteps,
    progress,
    answers,
    answerQuestion,
    nextStep,
    prevStep,
    calculateResults,
  } = useAssessment();

  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);

  const handleAnswer = (value: number | string) => {
    if (currentQuestion) {
      answerQuestion(currentQuestion.id, value);
    }
  };

  const handleNext = () => {
    if (currentStep === totalSteps - 1) {
      calculateResults();
      onComplete();
    } else {
      nextStep();
    }
  };

  const canProceed = currentAnswer !== undefined;

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-gradient-hero p-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">VR Healthcare Specialist Assessment</h1>
            <div className="text-sm text-muted-foreground">
              {currentStep + 1} of {totalSteps}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="p-8 animate-fade-in">
          <div className="space-y-6">
            {/* Category Badge */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {getCategoryLabel(currentQuestion.category, currentQuestion.subcategory)}
              </span>
            </div>

            {/* Question */}
            <h2 className="text-xl font-semibold text-foreground leading-relaxed">
              {currentQuestion.question}
            </h2>

            {/* Answer Options */}
            <div className="space-y-4">
              {currentQuestion.type === 'likert' && currentQuestion.scale && (
                <LikertScale
                  scale={currentQuestion.scale}
                  value={currentAnswer?.value as number}
                  onChange={handleAnswer}
                />
              )}

              {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                <MultipleChoice
                  options={currentQuestion.options}
                  value={currentAnswer?.value as string}
                  onChange={handleAnswer}
                />
              )}

              {currentQuestion.type === 'scenario' && currentQuestion.options && (
                <ScenarioChoice
                  options={currentQuestion.options}
                  value={currentAnswer?.value as string}
                  onChange={handleAnswer}
                />
              )}
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <Button
            variant={canProceed ? "hero" : "secondary"}
            onClick={handleNext}
            disabled={!canProceed}
            className="flex items-center gap-2"
          >
            {currentStep === totalSteps - 1 ? 'Complete Assessment' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Component for Likert Scale questions
function LikertScale({ scale, value, onChange }: {
  scale: { min: number; max: number; minLabel: string; maxLabel: string };
  value: number;
  onChange: (value: number) => void;
}) {
  const options = Array.from({ length: scale.max - scale.min + 1 }, (_, i) => scale.min + i);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-2">
        {options.map((option) => (
          <Button
            key={option}
            variant={value === option ? "hero" : "outline"}
            onClick={() => onChange(option)}
            className="h-12 flex flex-col items-center justify-center"
          >
            <span className="text-lg font-semibold">{option}</span>
          </Button>
        ))}
      </div>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{scale.minLabel}</span>
        <span>{scale.maxLabel}</span>
      </div>
    </div>
  );
}

// Component for Multiple Choice questions
function MultipleChoice({ options, value, onChange }: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <Button
          key={option}
          variant={value === option ? "hero" : "outline"}
          onClick={() => onChange(option)}
          className="w-full h-auto p-4 text-left justify-start whitespace-normal"
        >
          <span className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold">
              {String.fromCharCode(65 + index)}
            </span>
            {option}
          </span>
        </Button>
      ))}
    </div>
  );
}

// Component for Scenario-based questions
function ScenarioChoice({ options, value, onChange }: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <Card
          key={option}
          className={`p-4 cursor-pointer transition-smooth hover:shadow-elegant ${
            value === option ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-accent/50'
          }`}
          onClick={() => onChange(option)}
        >
          <div className="flex items-start gap-3">
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
              value === option ? 'bg-primary text-primary-foreground border-primary' : 'border-muted-foreground'
            }`}>
              {index + 1}
            </div>
            <p className="text-sm leading-relaxed">{option}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}

function getCategoryLabel(category: string, subcategory?: string) {
  const labels: Record<string, string> = {
    interest: 'Interest Assessment',
    personality: 'Personality Compatibility',
    technical: 'Technical Aptitude',
    wiscar: 'WISCAR Framework',
  };

  let label = labels[category] || category;
  
  if (subcategory) {
    const subLabels: Record<string, string> = {
      openness: 'Openness to Innovation',
      conscientiousness: 'Attention to Detail',
      agreeableness: 'Collaboration',
      'working-style': 'Working Preferences',
      programming: 'Programming Knowledge',
      healthcare: 'Healthcare Background',
      'vr-knowledge': 'VR Experience',
      scenario: 'Applied Thinking',
      will: 'Motivation & Persistence',
      skill: 'Current Abilities',
      cognitiveReadiness: 'Cognitive Readiness',
      abilityToLearn: 'Learning Agility',
      realWorldAlignment: 'Career Alignment',
    };
    
    if (subLabels[subcategory]) {
      label += ` • ${subLabels[subcategory]}`;
    }
  }
  
  return label;
}