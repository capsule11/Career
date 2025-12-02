# 🎯 Career Guidance Platform for Indian Students

> **Discover Your Perfect Career Path Through AI-Powered Assessment**

A comprehensive career guidance platform built with Next.js 15 and powered by Google Gemini AI. This platform helps Indian students and professionals discover their ideal career paths through personalized skills assessments, personality analysis, and AI-generated recommendations tailored for the Indian job market.

![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)
![Google Gemini](https://img.shields.io/badge/Google_Gemini_AI-1.20.0-4285F4?style=for-the-badge&logo=google)

## 🌟 Features

### 🎓 Comprehensive Skills Assessment
- **7 Core Skill Areas**: Mathematics & Analytical Reasoning, Language & Communication, Scientific Reasoning, Creative & Artistic Abilities, Technical Skills, Social Intelligence, and Leadership Potential
- **Adaptive Testing**: Questions dynamically generated using AI for personalized difficulty
- **Timed Assessments**: 30-second timer per question with immediate explanations
- **Real-time Scoring**: Instant feedback with performance levels (Beginner, Intermediate, Advanced, Expert)

### 🧠 AI-Powered Career Matching
- **Google Gemini Integration**: Advanced AI analysis for career recommendations
- **Personalized Results**: 5-7 tailored career suggestions based on skills and preferences
- **Indian Job Market Focus**: Salary ranges, education paths, and growth prospects specific to India
- **Match Scoring**: Percentage-based compatibility scores for each career recommendation

### 👤 Personal Profile Analysis
- **Multi-dimensional Assessment**: Interests, personality traits, work environment preferences, values, and career goals
- **Interactive Interface**: Modern UI with step-by-step guidance
- **Dynamic Content**: AI-generated options based on assessment results

### 🔐 User Authentication & Data Persistence
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **MongoDB Integration**: Complete user data persistence with progress tracking
- **Session Management**: Secure cookie-based session handling
- **Progress Tracking**: Visual progress indicators showing assessment completion

### 🎨 Enhanced User Experience
- **Professional Loading Screens**: Engaging animations with educational content during AI processing
- **Progress Tracking**: Visual progress indicators throughout the assessment journey
- **Responsive Design**: Optimized for all devices with mobile-first approach
- **Error Handling**: Comprehensive error states with recovery options

## 🚀 Getting Started

### Prerequisites

Before running this project, make sure you have:
- **Node.js** 18.x or later
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **MongoDB Database** (Atlas or local instance)
- **Google Gemini API Key** for AI-powered features

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd career
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB Database
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/career-guidance?retryWrites=true&w=majority
   
   # Google Gemini AI
   GEMINI_API_KEY=your_google_gemini_api_key_here
   
   # Authentication
   JWT_SECRET=your_jwt_secret_key_here
   NEXTAUTH_SECRET=your_nextauth_secret_here
   ```
   
   **Note:** Copy `.env.example` to `.env.local` and fill in your actual values.

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
career/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── actions/            # Server Actions for AI integration
│   │   │   ├── generate-recommendations.ts
│   │   │   ├── generate-questions.ts
│   │   │   └── generate-profile-options.ts
│   │   ├── skills-test/        # Skills assessment page
│   │   ├── skill-results/      # Results display page
│   │   ├── personal-profile/   # Personal profile form
│   │   ├── recommendations/    # Career recommendations
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx           # Landing page
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable React components
│   │   ├── CareerRecommendations.tsx
│   │   ├── SkillsTest.tsx
│   │   ├── PersonalProfile.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── SkillsTestLoadingScreen.tsx
│   │   ├── PersonalProfileLoadingScreen.tsx
│   │   ├── AuthModal.tsx
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── contexts/             # React contexts
│   │   └── AuthContext.tsx   # Authentication context
│   ├── lib/                  # Utility functions and configurations
│   │   ├── mongodb.ts        # MongoDB connection
│   │   └── auth.ts           # Authentication utilities
│   ├── models/               # MongoDB/Mongoose models
│   │   ├── User.ts           # User model
│   │   └── Assessment.ts     # Assessment session model
│   ├── data/                  # Static data and utilities
│   │   ├── skillsData.ts      # Pre-defined skill areas and questions
│   │   └── actions.ts
│   ├── gemini/               # AI integration
│   │   └── index.ts          # Google Gemini client setup
│   ├── store/                # State management (Zustand)
│   │   ├── personal-profile.ts
│   │   └── test-result.ts
│   └── types.ts              # TypeScript type definitions
├── public/                   # Static assets
├── package.json             # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # TailwindCSS configuration
└── next.config.ts          # Next.js configuration
```

## 🛠 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production (with Turbopack) |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint for code quality checks |

## 🧪 Technology Stack

### Frontend Framework
- **Next.js 15.5.3** - React framework with App Router
- **React 19.1.0** - Latest React with new features
- **TypeScript 5.x** - Type-safe development

### Styling & UI
- **TailwindCSS 4.x** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **Custom Components** - Professional UI components

### AI & Data Processing
- **Google Gemini AI** - Advanced language model for career analysis
- **Structured JSON Responses** - Schema-validated AI outputs
- **Server Actions** - Next.js server-side processing

### Database & Authentication
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Object modeling for Node.js and MongoDB
- **JWT** - Secure token-based authentication
- **bcryptjs** - Password hashing and security

### State Management
- **Zustand** - Lightweight state management
- **TypeScript Interfaces** - Type-safe state definitions

### Development Tools
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **Turbopack** - Fast build system

## 🎯 User Journey

1. **Landing Page** - Introduction and call-to-action to start assessment
2. **Skills Test** - Comprehensive assessment across 7 skill areas with AI-generated questions
3. **Results Analysis** - Detailed breakdown of skill scores and performance levels
4. **Personal Profile** - 5-step personality and preference assessment
5. **AI Recommendations** - Personalized career suggestions with detailed information
6. **Career Insights** - Education paths, salary ranges, and growth prospects for Indian market

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key for AI features | Yes |

### Google Gemini API Setup

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add the key to your `.env.local` file
4. Ensure you have sufficient API quotas for your usage

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in the Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy your app

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/career-guidance-platform)

### Other Platforms

This Next.js application can be deployed on:
- **Netlify**
- **Railway**
- **AWS Amplify**
- **Digital Ocean App Platform**

## 🎨 Key Features in Detail

### Advanced Loading States
- **Progressive Loading**: Step-by-step progress visualization
- **Educational Content**: Tips, facts, and insights during wait times
- **Error Recovery**: Comprehensive error handling with retry mechanisms
- **Responsive Design**: Optimized for all screen sizes

### AI-Powered Question Generation
- **Dynamic Content**: Questions generated based on skill areas
- **Difficulty Adaptation**: Adjusts to user performance
- **Explanation System**: Detailed explanations for each answer
- **Progress Tracking**: Real-time assessment progress

### Personalized Recommendations
- **Multi-factor Analysis**: Combines skills, personality, and preferences
- **Indian Job Market Data**: Salary ranges and growth prospects for India
- **Actionable Insights**: Specific education paths and skill development recommendations
- **Match Scoring**: Quantified compatibility for each career option

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
1. Follow the existing code style and structure
2. Add TypeScript types for new features
3. Include proper error handling
4. Test your changes thoroughly
5. Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋‍♂️ Support

If you encounter any issues or have questions:
1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Provide steps to reproduce any bugs

## 🔮 Future Enhancements

- [ ] Multi-language support (Hindi, regional languages)
- [ ] Industry-specific assessments
- [ ] Career pathway visualization
- [ ] Alumni/professional networking features
- [ ] Interview preparation modules
- [ ] Real-time job market data integration
- [ ] Mobile application development

---

**Made with ❤️ for Indian students and professionals seeking their ideal career path.**
