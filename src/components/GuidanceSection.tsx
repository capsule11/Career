'use client';

import React from 'react';
import { BookOpen, Users, TrendingUp, Award, ArrowRight, ExternalLink } from 'lucide-react';

interface GuidanceSectionProps {
  onBack?: () => void;
}

export const GuidanceSection: React.FC<GuidanceSectionProps> = ({ onBack }) => {
  const guidanceCategories = [
    {
      title: 'Career Exploration',
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
            Comprehensive resources to help you make informed career decisions and plan your future
          </p>
        </div>

        {/* Guidance Categories */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {guidanceCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-lg ${getColorClasses(category.color)}`}>
                    <Icon className={getIconColor(category.color)} size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
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

                <button className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
                  Explore More
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