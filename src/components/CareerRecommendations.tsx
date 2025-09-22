'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SkillResult, PersonalProfile, CareerRecommendation } from '@/types';
import { ArrowLeft, CheckCircle, TrendingUp, GraduationCap, DollarSign, Users, Lightbulb, Target } from 'lucide-react';
import { useTestResultStore } from '@/store/test-result';
import { usePersonalProfileStore } from '@/store/personal-profile';
import { generateRecommendations } from '../app/actions/generate-recommendations';

export const CareerRecommendations: React.FC = () => {
  const router = useRouter();
  const skillResults = useTestResultStore((state) => state.skillResults);
  const personalProfile = usePersonalProfileStore((state) => state.personalProfile);
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (skillResults.length > 0 && personalProfile) {
        const recs = await generateRecommendations(skillResults, personalProfile);
        setRecommendations(recs);
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [skillResults, personalProfile]);

  const handleRestart = () => {
    router.push('/');
  };

  if (loading) {
    return <div>Loading recommendations...</div>;
  }

  const topSkills = skillResults.sort((a, b) => b.percentage - a.percentage).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <button
          onClick={handleRestart}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Take Assessment Again
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
            <CheckCircle size={20} />
            Assessment Complete
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Personalized Career Recommendations</h1>
          <p className="text-gray-600 text-xl">Based on your skills assessment and personal profile</p>
        </div>

        {/* Skills Summary */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Top Skills</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {topSkills.map((skill, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">#{index + 1}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{skill.area}</h3>
                <p className="text-2xl font-bold text-blue-600">{Math.round(skill.percentage)}%</p>
                <p className="text-sm text-gray-600">{skill.level}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Career Recommendations */}
        <div className="space-y-8">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{rec.title}</h2>
                    <p className="text-blue-100 text-lg">{rec.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-white bg-opacity-20 rounded-lg p-3">
                      <p className="text-sm text-blue-100">Match Score</p>
                      <p className="text-2xl font-bold">{rec.matchPercentage}%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="text-green-600" size={20} />
                        <h3 className="font-semibold text-gray-900">Why This Suits You</h3>
                      </div>
                      <p className="text-gray-700">{rec.whySuitable}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="text-blue-600" size={20} />
                        <h3 className="font-semibold text-gray-900">Key Responsibilities</h3>
                      </div>
                      <ul className="space-y-2">
                        {rec.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-700">
                            <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="text-orange-600" size={20} />
                        <h3 className="font-semibold text-gray-900">Matching Skills</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {rec.matchingSkills.map((skill, i) => (
                          <span key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <GraduationCap className="text-purple-600" size={20} />
                        <h3 className="font-semibold text-gray-900">Education Path</h3>
                      </div>
                      <p className="text-gray-700">{rec.educationPath}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <DollarSign className="text-green-600" size={20} />
                        <h3 className="font-semibold text-gray-900">Salary Range in India</h3>
                      </div>
                      <p className="text-gray-700">{rec.salaryRange}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="text-blue-600" size={20} />
                        <h3 className="font-semibold text-gray-900">Growth Prospects</h3>
                      </div>
                      <p className="text-gray-700">{rec.growthProspects}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="text-indigo-600" size={20} />
                        <h3 className="font-semibold text-gray-900">Key Skills to Develop</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {rec.keySkills.map((skill, i) => (
                          <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">Recommended Next Steps</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Immediate Actions</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  Research your top career recommendations in detail
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  Connect with professionals in these fields
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  Start developing the recommended key skills
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Long-term Planning</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  Explore relevant courses and entrance exam requirements
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  Seek internships or projects in your areas of interest
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  Build a portfolio showcasing your skills
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};