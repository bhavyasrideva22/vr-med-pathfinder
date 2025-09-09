import { AssessmentQuestion } from '@/types/assessment';

export const assessmentQuestions: AssessmentQuestion[] = [
  // Interest Scale Questions
  {
    id: 'int-1',
    category: 'interest',
    type: 'likert',
    question: 'How excited are you about using technology to improve patient care and medical training?',
    scale: { min: 1, max: 5, minLabel: 'Not excited at all', maxLabel: 'Extremely excited' }
  },
  {
    id: 'int-2',
    category: 'interest',
    type: 'likert',
    question: 'How interested are you in combining healthcare knowledge with cutting-edge VR technology?',
    scale: { min: 1, max: 5, minLabel: 'Not interested', maxLabel: 'Very interested' }
  },
  {
    id: 'int-3',
    category: 'interest',
    type: 'likert',
    question: 'How motivated are you to work in an interdisciplinary field that bridges technology and medicine?',
    scale: { min: 1, max: 5, minLabel: 'Not motivated', maxLabel: 'Highly motivated' }
  },

  // Personality Compatibility Questions
  {
    id: 'per-1',
    category: 'personality',
    subcategory: 'openness',
    type: 'likert',
    question: 'I enjoy exploring new technologies and innovative solutions to healthcare challenges.',
    scale: { min: 1, max: 5, minLabel: 'Strongly disagree', maxLabel: 'Strongly agree' }
  },
  {
    id: 'per-2',
    category: 'personality',
    subcategory: 'conscientiousness',
    type: 'likert',
    question: 'I pay close attention to detail when working on complex technical projects.',
    scale: { min: 1, max: 5, minLabel: 'Strongly disagree', maxLabel: 'Strongly agree' }
  },
  {
    id: 'per-3',
    category: 'personality',
    subcategory: 'agreeableness',
    type: 'likert',
    question: 'I work well in teams with healthcare professionals and enjoy collaborative problem-solving.',
    scale: { min: 1, max: 5, minLabel: 'Strongly disagree', maxLabel: 'Strongly agree' }
  },
  {
    id: 'per-4',
    category: 'personality',
    subcategory: 'working-style',
    type: 'multiple-choice',
    question: 'Which working environment appeals to you most?',
    options: [
      'Structured clinical settings with clear protocols',
      'Research labs with experimental projects',
      'Tech companies developing healthcare solutions',
      'Mix of clinical and technical environments'
    ]
  },

  // Technical Aptitude Questions
  {
    id: 'tech-1',
    category: 'technical',
    subcategory: 'programming',
    type: 'multiple-choice',
    question: 'What is your current level of programming experience?',
    options: [
      'No programming experience',
      'Basic understanding of programming concepts',
      'Can write simple programs in one language',
      'Proficient in multiple programming languages',
      'Advanced programmer with project experience'
    ]
  },
  {
    id: 'tech-2',
    category: 'technical',
    subcategory: 'healthcare',
    type: 'multiple-choice',
    question: 'What is your background in healthcare or medical sciences?',
    options: [
      'No healthcare background',
      'General interest and basic knowledge',
      'Some coursework or training in health sciences',
      'Healthcare degree or certification',
      'Professional experience in healthcare field'
    ]
  },
  {
    id: 'tech-3',
    category: 'technical',
    subcategory: 'vr-knowledge',
    type: 'multiple-choice',
    question: 'How familiar are you with VR technology and development?',
    options: [
      'Never used VR technology',
      'Used VR apps/games as a consumer',
      'Basic understanding of VR development concepts',
      'Some experience with VR development tools',
      'Advanced VR development experience'
    ]
  },
  {
    id: 'tech-4',
    category: 'technical',
    subcategory: 'scenario',
    type: 'scenario',
    question: 'A hospital wants to implement VR training for surgical procedures. What would be your primary consideration?',
    options: [
      'Ensuring the VR simulation is medically accurate',
      'Making the interface intuitive for medical staff',
      'Integrating with existing hospital systems',
      'Measuring training effectiveness and outcomes'
    ]
  },

  // WISCAR Framework Questions
  {
    id: 'wis-will-1',
    category: 'wiscar',
    subcategory: 'will',
    type: 'likert',
    question: 'I am willing to invest significant time learning both technical and medical concepts.',
    scale: { min: 1, max: 5, minLabel: 'Strongly disagree', maxLabel: 'Strongly agree' }
  },
  {
    id: 'wis-will-2',
    category: 'wiscar',
    subcategory: 'will',
    type: 'likert',
    question: 'I persist through challenging projects even when they require learning new skills.',
    scale: { min: 1, max: 5, minLabel: 'Strongly disagree', maxLabel: 'Strongly agree' }
  },
  {
    id: 'wis-interest-1',
    category: 'wiscar',
    subcategory: 'interest',
    type: 'likert',
    question: 'I find myself naturally curious about how technology can solve healthcare problems.',
    scale: { min: 1, max: 5, minLabel: 'Strongly disagree', maxLabel: 'Strongly agree' }
  },
  {
    id: 'wis-skill-1',
    category: 'wiscar',
    subcategory: 'skill',
    type: 'likert',
    question: 'I have strong analytical and problem-solving abilities.',
    scale: { min: 1, max: 5, minLabel: 'Strongly disagree', maxLabel: 'Strongly agree' }
  },
  {
    id: 'wis-cognitive-1',
    category: 'wiscar',
    subcategory: 'cognitiveReadiness',
    type: 'likert',
    question: 'I can effectively manage multiple complex concepts simultaneously.',
    scale: { min: 1, max: 5, minLabel: 'Strongly disagree', maxLabel: 'Strongly agree' }
  },
  {
    id: 'wis-ability-1',
    category: 'wiscar',
    subcategory: 'abilityToLearn',
    type: 'likert',
    question: 'I actively seek feedback and use it to improve my skills.',
    scale: { min: 1, max: 5, minLabel: 'Strongly disagree', maxLabel: 'Strongly agree' }
  },
  {
    id: 'wis-alignment-1',
    category: 'wiscar',
    subcategory: 'realWorldAlignment',
    type: 'scenario',
    question: 'Which aspect of VR healthcare work excites you most?',
    options: [
      'Developing immersive training simulations for medical students',
      'Creating therapeutic VR experiences for patient rehabilitation',
      'Building surgical planning and visualization tools',
      'Researching VR effectiveness in clinical settings'
    ]
  }
];