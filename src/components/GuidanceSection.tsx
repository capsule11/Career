'use client';

import React, { useEffect, useState } from 'react';
import { BookOpen, Users, TrendingUp, Award, ArrowRight, ExternalLink, CheckCircle, Star } from 'lucide-react';
import { useGuidanceStore, useGuidanceViewed } from '@/store/guidance';
import { SkillResult } from '@/types';

interface GuidanceSectionProps {
  onBack?: () => void;
  skillResults?: SkillResult[];
  personalProfile?: {
    interests: string[];
    personalityTraits: string[];
    workEnvironment: string[];
    values: string[];
    careerGoals: string;
  };
}

export const GuidanceSection: React.FC<GuidanceSectionProps> = ({ 
  onBack, 
  skillResults, 
  personalProfile 
}) => {
  const { fetchGuidanceStatus, markSectionViewed } = useGuidanceStore();
  const guidanceViewed = useGuidanceViewed();
  const [personalizedRecommendations, setPersonalizedRecommendations] = useState<string[]>([]);

  useEffect(() => {
    fetchGuidanceStatus();
  }, [fetchGuidanceStatus]);

  useEffect(() => {
    // Generate personalized recommendations based on skills and profile
    if (skillResults && personalProfile) {
      const recommendations = generatePersonalizedRecommendations(skillResults, personalProfile);
      setPersonalizedRecommendations(recommendations);
    }
  }, [skillResults, personalProfile]);

  const generatePersonalizedRecommendations = (skills: SkillResult[], profile: any): string[] => {
    const recommendations = [];
    
    // Find top skills
    const topSkills = skills.sort((a, b) => b.percentage - a.percentage).slice(0, 3);
    
    // Generate skill-based recommendations
    topSkills.forEach(skill => {
      if (skill.area.includes('Technical') && skill.percentage > 70) {
        recommendations.push('Consider software engineering or tech careers');
      } else if (skill.area.includes('Creative') && skill.percentage > 70) {
        recommendations.push('Explore creative fields like design or content creation');
      } else if (skill.area.includes('Leadership') && skill.percentage > 70) {
        recommendations.push('Management roles might be a great fit for you');
      }
    });

    // Add interest-based recommendations
    if (profile.interests.includes('Technology')) {
      recommendations.push('Explore emerging tech fields like AI and Machine Learning');
    }
    if (profile.interests.includes('Healthcare')) {
      recommendations.push('Consider medical or healthcare administration careers');
    }

    return [...new Set(recommendations)]; // Remove duplicates
  };

  const handleSectionClick = async (sectionKey: string) => {
    if (!guidanceViewed[sectionKey as keyof typeof guidanceViewed]) {
      await markSectionViewed(sectionKey as keyof typeof guidanceViewed);
    }
  };

  const guidanceCategories = [
    {
      title: 'Career Exploration',
      key: 'careerExploration',
      description: 'Discover various career paths and their requirements',
      icon: BookOpen,
      color: 'blue',
      articles: [
        'Top 10 Emerging Careers in India 2025',
        'Engineering vs Medical: Making the Right Choice',
        'Career Opportunities in Data Science',
        'Government Jobs: Complete Guide'
      ]
    },
    {
      title: 'Skill Development',
      key: 'skillDevelopment',
      description: 'Learn about essential skills for your chosen career',
      icon: TrendingUp,
      color: 'green',
      articles: [
        'Essential Skills for Software Engineers',
        'Communication Skills for Career Success',
        'Leadership Development for Students',
        'Digital Marketing Skills Guide'
      ]
    },
    {
      title: 'Education Planning',
      key: 'educationPlanning',
      description: 'Get guidance on courses, colleges, and entrance exams',
      icon: Award,
      color: 'purple',
      articles: [
        'JEE vs NEET: Preparation Strategies',
        'Best Engineering Colleges in India',
        'MBA Entrance Exams Guide',
        'Study Abroad: Complete Guide'
      ]
    },
    {
      title: 'Industry Insights',
      key: 'industryInsights',
      description: 'Stay updated with industry trends and job market',
      icon: Users,
      color: 'orange',
      articles: [
        'IT Industry Trends 2025',
        'Healthcare Sector Growth in India',
        'Startup Ecosystem Overview',
        'Remote Work Opportunities'
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowRight className="rotate-180" size={20} />
          Back to Home
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Career Guidance Hub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Personalized resources based on your assessment results to help you make informed career decisions
          </p>
        </div>

        {/* Personalized Recommendations */}
        {personalizedRecommendations.length > 0 && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 mb-12 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Star className="text-yellow-300" size={32} />
              <h2 className="text-2xl font-bold">Personalized Recommendations for You</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {personalizedRecommendations.map((recommendation, index) => (
                <div key={index} className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-white/90">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Guidance Categories */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {guidanceCategories.map((category, index) => {
            const Icon = category.icon;
            const isViewed = guidanceViewed[category.key as keyof typeof guidanceViewed];
            return (
              <div key={index} className={`bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all relative ${isViewed ? 'ring-2 ring-green-200' : ''}`}>
                {isViewed && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="text-green-500" size={24} />
                  </div>
                )}
                
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-lg ${getColorClasses(category.color)}`}>
                    <Icon className={getIconColor(category.color)} size={32} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                      {isViewed && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Viewed</span>}
                    </div>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {category.articles.map((article, articleIndex) => (
                    <div key={articleIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <span className="text-gray-700">{article}</span>
                      <ExternalLink className="text-gray-400" size={16} />
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => handleSectionClick(category.key)}
                  className={`w-full mt-6 px-4 py-2 rounded-lg font-medium transition-all ${
                    isViewed 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:-translate-y-0.5'
                  }`}
                >
                  {isViewed ? 'View Again' : 'Explore More'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Featured Resources */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Resources</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Career Assessment</h3>
              <p className="text-blue-100 mb-4">Take our comprehensive assessment to discover your ideal career path</p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Start Assessment
              </button>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Expert Counseling</h3>
              <p className="text-green-100 mb-4">Get personalized guidance from career counseling experts</p>
              <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Book Session
              </button>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Success Stories</h3>
              <p className="text-purple-100 mb-4">Read inspiring stories from students who found their path</p>
              <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Read Stories
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};