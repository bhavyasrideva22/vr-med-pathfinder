import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Brain, 
  Heart, 
  Code, 
  Target, 
  Clock, 
  Award,
  ChevronRight,
  Stethoscope,
  Cpu,
  Users
} from 'lucide-react';
import { Assessment } from '@/components/Assessment';
import { Results } from '@/components/Results';
import { useAssessment } from '@/hooks/useAssessment';
import heroImage from '@/assets/vr-healthcare-hero.jpg';

const Index = () => {
  const [currentView, setCurrentView] = useState<'intro' | 'assessment' | 'results'>('intro');
  const { results, resetAssessment } = useAssessment();

  const handleStartAssessment = () => {
    setCurrentView('assessment');
  };

  const handleAssessmentComplete = () => {
    setCurrentView('results');
  };

  const handleRestart = () => {
    resetAssessment();
    setCurrentView('intro');
  };

  if (currentView === 'assessment') {
    return <Assessment onComplete={handleAssessmentComplete} />;
  }

  if (currentView === 'results' && results) {
    return <Results results={results} onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Career Assessment Tool
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Should I Learn{' '}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    VR for Healthcare
                  </span>{' '}
                  Specialist?
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Discover if you're ready for a career combining virtual reality technology 
                  with healthcare innovation. Get personalized insights and a clear learning roadmap.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={handleStartAssessment}
                  className="group"
                >
                  <Play className="w-5 h-5 group-hover:animate-pulse" />
                  Start Assessment
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  15-20 minutes
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Scientifically validated
                </div>
              </div>
            </div>

            <div className="relative animate-slide-up">
              <div className="relative rounded-2xl overflow-hidden shadow-elegant">
                <img 
                  src={heroImage} 
                  alt="VR Healthcare Professional" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-primary opacity-10" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent rounded-full shadow-accent animate-glow" />
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-primary rounded-full shadow-glow animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* What is VR Healthcare Section */}
      <section className="py-16 bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              What is VR for Healthcare?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              VR Healthcare Specialists design, develop, and implement virtual reality technologies 
              to enhance healthcare outcomes, combining medical knowledge with cutting-edge VR expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-elegant transition-smooth">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Patient Therapy</h3>
              <p className="text-muted-foreground">
                Create immersive therapeutic experiences for rehabilitation, 
                pain management, and mental health treatment.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-elegant transition-smooth">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Medical Training</h3>
              <p className="text-muted-foreground">
                Develop realistic simulations for medical education, 
                surgical training, and professional development.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-elegant transition-smooth">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Clinical Innovation</h3>
              <p className="text-muted-foreground">
                Research and implement VR solutions that improve 
                patient outcomes and healthcare delivery.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Assessment Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Comprehensive Career Assessment
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our scientifically-designed assessment evaluates your fit across multiple dimensions 
              using validated psychometric methods and the WISCAR framework.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="p-6 hover:shadow-elegant transition-smooth">
                <Brain className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Interest Scale</h3>
                <p className="text-sm text-muted-foreground">
                  Measures your curiosity and enthusiasm for VR technology and healthcare innovation.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-elegant transition-smooth">
                <Heart className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-semibold mb-2">Personality Fit</h3>
                <p className="text-sm text-muted-foreground">
                  Assesses Big Five traits and working preferences relevant to VR healthcare roles.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-elegant transition-smooth">
                <Code className="w-8 h-8 text-success mb-4" />
                <h3 className="font-semibold mb-2">Technical Aptitude</h3>
                <p className="text-sm text-muted-foreground">
                  Evaluates your technical readiness and domain-specific knowledge.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-elegant transition-smooth">
                <Target className="w-8 h-8 text-warning mb-4" />
                <h3 className="font-semibold mb-2">WISCAR Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive framework analyzing Will, Interest, Skill, Cognitive readiness, and more.
                </p>
              </Card>
            </div>

            <Card className="p-8 bg-gradient-secondary">
              <h3 className="text-xl font-bold mb-6">What You'll Get</h3>
              <ul className="space-y-4">
                {[
                  'Personalized career recommendation (Yes/No/Maybe)',
                  'Detailed scoring across all assessment dimensions',
                  'Interactive WISCAR framework visualization',
                  'Tailored learning path and next steps',
                  'Career role suggestions and skill gap analysis',
                  'Confidence score and readiness insights'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="p-12 shadow-elegant">
            <h2 className="text-3xl font-bold mb-6">Ready to Discover Your Path?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Take the first step toward a rewarding career in VR healthcare. 
              Our assessment will provide you with clear, actionable insights in just 15-20 minutes.
            </p>
            <Button 
              variant="hero" 
              size="lg" 
              onClick={handleStartAssessment}
              className="group animate-glow"
            >
              <Play className="w-5 h-5 group-hover:animate-pulse" />
              Begin Your Assessment
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;