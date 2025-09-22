'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SkillResult } from '@/types';
import { TrendingUp, Award, Target, BarChart3 } from 'lucide-react';
import { useTestResultStore } from '@/store/test-result';

export const SkillResults: React.FC = () => {
  const router = useRouter();
  const results = useTestResultStore((state) => state.skillResults);

  const handleContinue = () => {
    router.push('/personal-profile');
  };

  const averageScore = results.reduce((sum, result) => sum + result.percentage, 0) / results.length;
  const topSkills = results
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert': return 'text-purple-800 bg-purple-100';
      case 'Advanced': return 'text-green-800 bg-green-100';
      case 'Intermediate': return 'text-blue-800 bg-blue-100';
      default: return 'text-orange-800 bg-orange-100';
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
          <Award size={20} />
          Skills Assessment Complete
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Skills Profile</h1>
        <p className="text-gray-600 text-lg">Here's how you performed across different skill areas</p>
      </div>

      {/* Overall Summary */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 size={24} />
            <h3 className="text-lg font-semibold">Overall Score</h3>
          </div>
          <p className="text-3xl font-bold">{Math.round(averageScore)}%</p>
          <p className="text-blue-100">Average across all areas</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="text-green-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-900">Top Skill</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{topSkills[0]?.area.split(' &')[0]}</p>
          <p className="text-green-600 font-medium">{Math.round(topSkills[0]?.percentage)}% - {topSkills[0]?.level}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <Target className="text-purple-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-900">Areas Tested</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{results.length}</p>
          <p className="text-gray-600">Comprehensive evaluation</p>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Results</h2>

        <div className="space-y-6">
          {results.map((result, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{result.area}</h3>
                  <p className="text-gray-600">
                    {result.score} out of {result.maxScore} questions correct
                  </p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(result.level)}`}>
                    {result.level}
                  </div>
                  <p className={`text-2xl font-bold mt-1 ${getScoreColor(result.percentage)}`}>
                    {Math.round(result.percentage)}%
                  </p>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${result.percentage >= 80 ? 'bg-green-500' :
                    result.percentage >= 60 ? 'bg-blue-500' :
                      result.percentage >= 40 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                  style={{ width: `${result.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Skills Summary */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Top 3 Skills</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {topSkills.map((skill, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium">
                  #{index + 1}
                </span>
                <span className={`px-2 py-1 rounded text-sm font-medium ${getLevelColor(skill.level)}`}>
                  {skill.level}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{skill.area}</h3>
              <p className={`text-xl font-bold ${getScoreColor(skill.percentage)}`}>
                {Math.round(skill.percentage)}%
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="text-center">
        <button
          onClick={handleContinue}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all text-lg"
        >
          Continue to Personal Profile Assessment
        </button>
      </div>
    </div>
  );
};