import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  TrendingUp, 
  Target, 
  BookOpen, 
  Users, 
  Lightbulb,
  RotateCcw 
} from 'lucide-react';
import { AssessmentResults } from '@/types/assessment';

interface ResultsProps {
  results: AssessmentResults;
  onRestart: () => void;
}

export function Results({ results, onRestart }: ResultsProps) {
  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'Yes':
        return <CheckCircle className="w-8 h-8 text-success" />;
      case 'Maybe':
        return <AlertCircle className="w-8 h-8 text-warning" />;
      case 'No':
        return <XCircle className="w-8 h-8 text-destructive" />;
    }
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'Yes':
        return 'bg-success/10 text-success border-success/20';
      case 'Maybe':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'No':
        return 'bg-destructive/10 text-destructive border-destructive/20';
    }
  };

  const getRecommendationMessage = () => {
    switch (results.recommendation) {
      case 'Yes':
        return 'You are well-suited for a career as a VR Healthcare Specialist!';
      case 'Maybe':
        return 'You show potential for VR Healthcare with some development needed.';
      case 'No':
        return 'Consider alternative paths or foundational skill building first.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Assessment Results</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your comprehensive evaluation for becoming a VR Healthcare Specialist
          </p>
        </div>

        {/* Main Recommendation */}
        <Card className={`p-8 border-2 ${getRecommendationColor()}`}>
          <div className="flex items-start gap-6">
            {getRecommendationIcon()}
            <div className="flex-1 space-y-4">
              <h2 className="text-2xl font-bold">{getRecommendationMessage()}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Overall Score</p>
                    <p className="text-2xl font-bold text-primary">{results.overallScore}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">Confidence Score</p>
                    <p className="text-2xl font-bold text-accent">{results.confidenceScore}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category Scores */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Category Assessment
            </h3>
            <div className="space-y-6">
              {results.categoryScores.map((category) => (
                <div key={category.category} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category.category}</span>
                    <Badge variant={category.level === 'Excellent' ? 'default' : 'secondary'}>
                      {category.level}
                    </Badge>
                  </div>
                  <Progress value={category.percentage} className="h-3" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{category.score}/{category.maxScore} points</span>
                    <span>{category.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* WISCAR Radar */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              WISCAR Framework
            </h3>
            <WISCARChart scores={results.wiscarScores} />
          </Card>
        </div>

        {/* Insights and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-warning" />
              Personalized Insights
            </h3>
            <ul className="space-y-3">
              {results.personalizedInsights.map((insight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-sm leading-relaxed">{insight}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-success" />
              Career Opportunities
            </h3>
            <div className="space-y-3">
              {results.careerRoles.map((role, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/50 border">
                  <p className="font-medium">{role}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Learning Path and Next Steps */}
        <Card className="p-8">
          <h3 className="text-xl font-bold mb-6">Your Recommended Learning Path</h3>
          <div className="space-y-6">
            <div className="p-4 bg-gradient-secondary rounded-lg">
              <p className="leading-relaxed">{results.recommendedPath}</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-success">Next Steps</h4>
                <ul className="space-y-2">
                  {results.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {results.skillGaps.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3 text-warning">Areas for Development</h4>
                  <ul className="space-y-2">
                    {results.skillGaps.map((gap, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <TrendingUp className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={onRestart} className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Retake Assessment
          </Button>
          <Button variant="hero" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Explore Learning Resources
          </Button>
        </div>
      </div>
    </div>
  );
}

function WISCARChart({ scores }: { scores: any }) {
  const dimensions = [
    { key: 'will', label: 'Will', color: 'text-blue-500' },
    { key: 'interest', label: 'Interest', color: 'text-green-500' },
    { key: 'skill', label: 'Skill', color: 'text-purple-500' },
    { key: 'cognitiveReadiness', label: 'Cognitive', color: 'text-orange-500' },
    { key: 'abilityToLearn', label: 'Learning', color: 'text-pink-500' },
    { key: 'realWorldAlignment', label: 'Alignment', color: 'text-cyan-500' },
  ];

  return (
    <div className="space-y-4">
      {dimensions.map((dimension) => (
        <div key={dimension.key} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className={`font-medium ${dimension.color}`}>{dimension.label}</span>
            <span className="text-sm font-bold">{scores[dimension.key]}/5</span>
          </div>
          <Progress value={(scores[dimension.key] / 5) * 100} className="h-2" />
        </div>
      ))}
    </div>
  );
}