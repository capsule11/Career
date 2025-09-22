import { SkillArea } from '../types';

export const skillAreas: SkillArea[] = [
  {
    name: 'Mathematics & Analytical Reasoning',
    description: 'Test your mathematical problem-solving and logical reasoning abilities',
    icon: 'Calculator',
    questions: [
      {
        id: 'math1',
        question: 'If a train travels 240 km in 3 hours, what is its average speed?',
        options: ['60 km/h', '80 km/h', '90 km/h', '120 km/h'],
        correctAnswer: 1,
        difficulty: 'easy',
        explanation: 'Speed = Distance ÷ Time = 240 ÷ 3 = 80 km/h'
      },
      {
        id: 'math2',
        question: 'What is the next number in the sequence: 2, 6, 12, 20, 30, ?',
        options: ['40', '42', '44', '46'],
        correctAnswer: 1,
        difficulty: 'medium',
        explanation: 'The differences are 4, 6, 8, 10, so the next difference is 12. 30 + 12 = 42'
      },
      {
        id: 'math3',
        question: 'A company\'s profit increased by 25% in the first year and decreased by 20% in the second year. If the initial profit was ₹100,000, what is the final profit?',
        options: ['₹100,000', '₹105,000', '₹110,000', '₹125,000'],
        correctAnswer: 0,
        difficulty: 'hard',
        explanation: 'Year 1: 100,000 × 1.25 = 125,000. Year 2: 125,000 × 0.8 = 100,000'
      },
      {
        id: 'math4',
        question: 'If log₂(x) = 3, what is the value of x?',
        options: ['6', '8', '9', '16'],
        correctAnswer: 1,
        difficulty: 'medium',
        explanation: 'log₂(x) = 3 means 2³ = x, so x = 8'
      },
      {
        id: 'math5',
        question: 'In a group of 100 people, 60 like tea, 50 like coffee, and 20 like both. How many like neither?',
        options: ['10', '20', '30', '40'],
        correctAnswer: 0,
        difficulty: 'medium',
        explanation: 'Using Venn diagram: Tea only = 40, Coffee only = 30, Both = 20. Neither = 100 - (40 + 30 + 20) = 10'
      }
    ]
  },
  {
    name: 'Language & Communication',
    description: 'Evaluate your verbal reasoning and communication skills',
    icon: 'MessageCircle',
    questions: [
      {
        id: 'lang1',
        question: 'Choose the word that best completes the analogy: Book : Author :: Painting : ?',
        options: ['Canvas', 'Artist', 'Gallery', 'Color'],
        correctAnswer: 1,
        difficulty: 'easy',
        explanation: 'A book is created by an author, just as a painting is created by an artist'
      },
      {
        id: 'lang2',
        question: 'Which sentence is grammatically correct?',
        options: [
          'Neither of the students have completed their assignment',
          'Neither of the students has completed their assignment',
          'Neither of the students have completed his assignment',
          'Neither of the students has completed his assignment'
        ],
        correctAnswer: 1,
        difficulty: 'medium',
        explanation: '"Neither" is singular, so it takes "has". "Their" is acceptable for gender-neutral reference.'
      },
      {
        id: 'lang3',
        question: 'What is the main idea of this passage: "Despite technological advances, human creativity remains irreplaceable in problem-solving. While AI can process data quickly, it lacks the intuitive leaps that lead to breakthrough innovations."',
        options: [
          'Technology is advancing rapidly',
          'AI processes data quickly',
          'Human creativity is unique and valuable',
          'Problem-solving requires data processing'
        ],
        correctAnswer: 2,
        difficulty: 'medium',
        explanation: 'The passage emphasizes that human creativity remains irreplaceable despite technological advances'
      },
      {
        id: 'lang4',
        question: 'Choose the most appropriate word: The speaker\'s argument was so _____ that even skeptics were convinced.',
        options: ['verbose', 'compelling', 'lengthy', 'complex'],
        correctAnswer: 1,
        difficulty: 'easy',
        explanation: '"Compelling" means convincing or persuasive, which fits the context of convincing skeptics'
      },
      {
        id: 'lang5',
        question: 'Identify the logical fallacy: "Everyone I know uses this brand, so it must be the best."',
        options: ['Ad hominem', 'Bandwagon fallacy', 'Straw man', 'False dilemma'],
        correctAnswer: 1,
        difficulty: 'hard',
        explanation: 'This is a bandwagon fallacy - assuming something is correct because many people believe it'
      }
    ]
  },
  {
    name: 'Scientific Reasoning',
    description: 'Test your understanding of scientific concepts and logical thinking',
    icon: 'Microscope',
    questions: [
      {
        id: 'sci1',
        question: 'What happens to the volume of a gas when temperature increases at constant pressure?',
        options: ['Decreases', 'Increases', 'Remains constant', 'Becomes zero'],
        correctAnswer: 1,
        difficulty: 'easy',
        explanation: 'According to Charles\' Law, volume is directly proportional to temperature at constant pressure'
      },
      {
        id: 'sci2',
        question: 'A hypothesis in scientific method is:',
        options: [
          'A proven fact',
          'A testable prediction',
          'The final conclusion',
          'An observation'
        ],
        correctAnswer: 1,
        difficulty: 'easy',
        explanation: 'A hypothesis is a testable prediction that can be supported or refuted through experimentation'
      },
      {
        id: 'sci3',
        question: 'If you observe that plants grow taller near a window, what would be the best next step?',
        options: [
          'Conclude that windows help plants grow',
          'Test if light affects plant growth',
          'Move all plants near windows',
          'Ignore the observation'
        ],
        correctAnswer: 1,
        difficulty: 'medium',
        explanation: 'The scientific approach is to form a hypothesis and test it systematically'
      },
      {
        id: 'sci4',
        question: 'What is the pH of a solution with [H+] = 1 × 10⁻⁵ M?',
        options: ['5', '9', '10⁻⁵', '-5'],
        correctAnswer: 0,
        difficulty: 'medium',
        explanation: 'pH = -log[H+] = -log(1 × 10⁻⁵) = 5'
      },
      {
        id: 'sci5',
        question: 'Which of the following best describes natural selection?',
        options: [
          'Organisms choose to evolve',
          'Favorable traits become more common over time',
          'All organisms evolve at the same rate',
          'Evolution happens randomly'
        ],
        correctAnswer: 1,
        difficulty: 'medium',
        explanation: 'Natural selection favors organisms with advantageous traits, making these traits more common in populations over time'
      }
    ]
  },
  {
    name: 'Creative & Artistic Abilities',
    description: 'Assess your creative thinking and artistic sensibilities',
    icon: 'Palette',
    questions: [
      {
        id: 'art1',
        question: 'Which color combination creates the most visual contrast?',
        options: ['Red and pink', 'Blue and green', 'Yellow and purple', 'Orange and red'],
        correctAnswer: 2,
        difficulty: 'easy',
        explanation: 'Yellow and purple are complementary colors, creating the highest contrast'
      },
      {
        id: 'art2',
        question: 'You need to design a logo for a children\'s toy company. Which approach would be most effective?',
        options: [
          'Use dark colors and sharp edges',
          'Use bright colors and rounded shapes',
          'Use only text without graphics',
          'Use complex geometric patterns'
        ],
        correctAnswer: 1,
        difficulty: 'easy',
        explanation: 'Bright colors and rounded shapes are more appealing and safe-feeling for children'
      },
      {
        id: 'art3',
        question: 'What is the "rule of thirds" in visual composition?',
        options: [
          'Using only three colors',
          'Dividing the image into nine equal parts',
          'Making objects one-third the size',
          'Using three different fonts'
        ],
        correctAnswer: 1,
        difficulty: 'medium',
        explanation: 'The rule of thirds divides an image into nine equal parts to create more interesting compositions'
      },
      {
        id: 'art4',
        question: 'How many different ways can you use a paperclip? (Choose the most creative approach)',
        options: [
          'Only for holding papers together',
          '5-10 different ways',
          '20+ different ways including art and tools',
          'Just 2-3 office uses'
        ],
        correctAnswer: 2,
        difficulty: 'medium',
        explanation: 'Creative thinking involves seeing multiple possibilities - paperclips can be jewelry, tools, art materials, etc.'
      },
      {
        id: 'art5',
        question: 'What makes a story compelling?',
        options: [
          'Complex vocabulary',
          'Character development and conflict',
          'Length and detail',
          'Perfect grammar'
        ],
        correctAnswer: 1,
        difficulty: 'medium',
        explanation: 'Compelling stories focus on character growth and meaningful conflicts that engage readers emotionally'
      }
    ]
  },
  {
    name: 'Technical & Mechanical Aptitude',
    description: 'Evaluate your understanding of technical concepts and mechanical reasoning',
    icon: 'Settings',
    questions: [
      {
        id: 'tech1',
        question: 'If gear A has 20 teeth and gear B has 40 teeth, and gear A rotates 4 times, how many times does gear B rotate?',
        options: ['1 time', '2 times', '4 times', '8 times'],
        correctAnswer: 1,
        difficulty: 'easy',
        explanation: 'Gear ratio is inversely proportional. 20/40 = 1/2, so gear B rotates 4 × 1/2 = 2 times'
      },
      {
        id: 'tech2',
        question: 'What is the primary function of a capacitor in an electronic circuit?',
        options: [
          'To resist current flow',
          'To store electrical energy',
          'To amplify signals',
          'To convert AC to DC'
        ],
        correctAnswer: 1,
        difficulty: 'medium',
        explanation: 'A capacitor stores electrical energy in an electric field between its plates'
      },
      {
        id: 'tech3',
        question: 'Which tool would be most appropriate for measuring the internal diameter of a pipe?',
        options: ['Ruler', 'Caliper', 'Protractor', 'Level'],
        correctAnswer: 1,
        difficulty: 'easy',
        explanation: 'Calipers are designed to measure internal and external dimensions accurately'
      },
      {
        id: 'tech4',
        question: 'In programming, what is the purpose of a loop?',
        options: [
          'To store data',
          'To repeat a set of instructions',
          'To make decisions',
          'To display output'
        ],
        correctAnswer: 1,
        difficulty: 'easy',
        explanation: 'Loops are used to repeat a block of code multiple times until a condition is met'
      },
      {
        id: 'tech5',
        question: 'If a lever has a fulcrum 2 meters from a 100N load and 8 meters from the effort, what effort is needed?',
        options: ['25N', '50N', '200N', '400N'],
        correctAnswer: 0,
        difficulty: 'hard',
        explanation: 'Using the lever principle: Load × Load arm = Effort × Effort arm. 100 × 2 = Effort × 8, so Effort = 25N'
      }
    ]
  },
  {
    name: 'Social & Interpersonal Skills',
    description: 'Assess your ability to understand and work with others',
    icon: 'Users',
    questions: [
      {
        id: 'social1',
        question: 'A team member consistently misses deadlines. What\'s the best approach?',
        options: [
          'Ignore it and do their work yourself',
          'Complain to the manager immediately',
          'Have a private conversation to understand the issue',
          'Criticize them in front of the team'
        ],
        correctAnswer: 2,
        difficulty: 'easy',
        explanation: 'Direct, private communication helps understand root causes and maintains relationships'
      },
      {
        id: 'social2',
        question: 'During a heated discussion, what\'s the most effective way to de-escalate tension?',
        options: [
          'Raise your voice to be heard',
          'Acknowledge different viewpoints and find common ground',
          'Leave the room immediately',
          'Insist that you\'re right'
        ],
        correctAnswer: 1,
        difficulty: 'medium',
        explanation: 'Acknowledging different perspectives and finding common ground helps reduce tension and move toward resolution'
      },
      {
        id: 'social3',
        question: 'You notice a colleague seems stressed and withdrawn. What should you do?',
        options: [
          'Mind your own business',
          'Tell everyone else about your observation',
          'Offer support and ask if they need help',
          'Report them to HR'
        ],
        correctAnswer: 2,
        difficulty: 'easy',
        explanation: 'Offering genuine support shows empathy and can help a colleague in need'
      },
      {
        id: 'social4',
        question: 'What is active listening?',
        options: [
          'Waiting for your turn to speak',
          'Fully concentrating and responding thoughtfully',
          'Taking notes during conversation',
          'Agreeing with everything said'
        ],
        correctAnswer: 1,
        difficulty: 'medium',
        explanation: 'Active listening involves full attention, understanding, and thoughtful responses'
      },
      {
        id: 'social5',
        question: 'How do you handle cultural differences in a diverse workplace?',
        options: [
          'Expect everyone to adapt to your culture',
          'Avoid interacting with different cultures',
          'Learn about and respect different perspectives',
          'Point out cultural differences to others'
        ],
        correctAnswer: 2,
        difficulty: 'medium',
        explanation: 'Respecting and learning about different cultures creates an inclusive environment'
      }
    ]
  },
  {
    name: 'Leadership & Management',
    description: 'Test your leadership potential and management understanding',
    icon: 'Crown',
    questions: [
      {
        id: 'lead1',
        question: 'What is the most important quality of a good leader?',
        options: [
          'Being the smartest person in the room',
          'Making all decisions quickly',
          'Inspiring and empowering others',
          'Having the most experience'
        ],
        correctAnswer: 2,
        difficulty: 'easy',
        explanation: 'Great leaders inspire and empower their teams to achieve collective goals'
      },
      {
        id: 'lead2',
        question: 'Your team is facing a challenging project with tight deadlines. What\'s your approach?',
        options: [
          'Work overtime yourself to complete everything',
          'Delegate tasks based on team strengths and provide support',
          'Ask for deadline extension immediately',
          'Reduce project scope without consulting anyone'
        ],
        correctAnswer: 1,
        difficulty: 'medium',
        explanation: 'Effective delegation based on strengths, combined with support, maximizes team potential'
      },
      {
        id: 'lead3',
        question: 'How should you handle a conflict between two team members?',
        options: [
          'Let them work it out themselves',
          'Take sides with the person you like more',
          'Facilitate a discussion to find resolution',
          'Separate them permanently'
        ],
        correctAnswer: 2,
        difficulty: 'medium',
        explanation: 'Leaders should facilitate resolution by helping parties communicate and find common ground'
      },
      {
        id: 'lead4',
        question: 'What\'s the best way to motivate a team?',
        options: [
          'Offer only monetary rewards',
          'Use fear of consequences',
          'Understand individual motivations and provide meaningful work',
          'Set impossible goals to challenge them'
        ],
        correctAnswer: 2,
        difficulty: 'medium',
        explanation: 'Understanding what motivates each individual and providing meaningful work creates lasting motivation'
      },
      {
        id: 'lead5',
        question: 'A team member made a significant mistake. How do you respond?',
        options: [
          'Publicly criticize them as an example',
          'Fire them immediately',
          'Address it privately, focus on learning and prevention',
          'Ignore it and hope it doesn\'t happen again'
        ],
        correctAnswer: 2,
        difficulty: 'easy',
        explanation: 'Private discussion focusing on learning and prevention maintains dignity while addressing the issue'
      }
    ]
  }
];