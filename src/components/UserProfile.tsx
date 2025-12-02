'use client';

import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, X, Award, TrendingUp, Target, Clock, CheckCircle, History, BookOpen, Briefcase } from 'lucide-react';
import { SkillResult } from '@/types';

interface UserProfileProps {
  userProfile: {
    name: string;
    email: string;
    phone?: string;
    location?: string;
    joinDate: string;
    avatar?: string;
  };
  skillResults?: SkillResult[];
  recommendations?: any[];
  assessmentHistory?: {
    sessionId: string;
    completedAt: Date;
    skillResults: SkillResult[];
    recommendations?: any[];
  }[];
  onBack: () => void;
  onUpdateProfile: (profile: any) => void;
  onRetakeAssessment?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  userProfile,
  skillResults,
  recommendations = [],
  assessmentHistory = [],
  onBack,
  onUpdateProfile,
  onRetakeAssessment
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);
  const [activeTab, setActiveTab] = useState<'overview' | 'assessment' | 'history' | 'recommendations'>('overview');
  
  const handleSave = () => {
    onUpdateProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(userProfile);
    setIsEditing(false);
  };

  const averageScore = skillResults
    ? skillResults.reduce((sum, result) => sum + result.percentage, 0) / skillResults.length
    : 0;

  const topSkill = skillResults
    ? skillResults.sort((a, b) => b.percentage - a.percentage)[0]
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <X size={20} />
          Close Profile
        </button>

        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                {userProfile.avatar ? (
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <User className="text-white" size={40} />
                )}
              </div>
              {isEditing && (
                <button className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700">
                  <Edit3 size={16} />
                </button>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-blue-500 focus:outline-none"
                  />
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="text-gray-600 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{userProfile.name}</h1>
                  <p className="text-gray-600 text-lg mb-4">{userProfile.email}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  Joined {userProfile.joinDate}
                </div>
                {userProfile.location && (
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    {userProfile.location}
                  </div>
                )}
                {userProfile.phone && (
                  <div className="flex items-center gap-1">
                    <Phone size={16} />
                    {userProfile.phone}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save size={16} />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit3 size={16} />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            {[
              { key: 'overview', label: 'Overview', icon: User },
              { key: 'assessment', label: 'Assessment', icon: Award },
              { key: 'history', label: 'History', icon: History },
              { key: 'recommendations', label: 'Recommendations', icon: Briefcase }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div>
            {/* Progress Overview */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Progress</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className={`p-6 rounded-lg text-center bg-green-100'
                }`}>
                  <CheckCircle className={`mx-auto mb-2 text-green-600'
                  }`} size={32} />
                  <h3 className="font-semibold">Skills Assessment</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Completed
                  </p>
                </div>
                <div className={`p-6 rounded-lg text-center bg-green-100'
                }`}>
                  <CheckCircle className={`mx-auto mb-2 text-green-600'
                  }`} size={32} />
                  <h3 className="font-semibold">Personal Profile</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Completed
                  </p>
                </div>
                <div className={`p-6 rounded-lg text-center bg-green-100'
                }`}>
                  <CheckCircle className={`mx-auto mb-2 text-green-600'
                  }`} size={32} />
                  <h3 className="font-semibold">Career Recommendations</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Generated
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assessment' && (
          <div>
            {/* Assessment Actions */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Assessment Management</h2>
                {onRetakeAssessment && (
                  <button
                    onClick={onRetakeAssessment}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Retake Assessment
                  </button>
                )}
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800">✓ You have completed your skills assessment. Your results are available below.</p>
              </div>
            </div>

        {/* Assessment Results */}
        {skillResults && skillResults.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Assessment Results</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white text-center">
                <Award size={32} className="mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Overall Score</h3>
                <p className="text-2xl font-bold">{Math.round(averageScore)}%</p>
              </div>

              {topSkill && (
                <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-6 text-white text-center">
                  <TrendingUp size={32} className="mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Top Skill</h3>
                  <p className="text-lg font-bold">{topSkill.area.split(' &')[0]}</p>
                  <p className="text-sm opacity-90">{Math.round(topSkill.percentage)}%</p>
                </div>
              )}

              <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-6 text-white text-center">
                <Target size={32} className="mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Areas Tested</h3>
                <p className="text-2xl font-bold">{skillResults.length}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Detailed Skill Breakdown</h3>
              {skillResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{result.area}</h4>
                    <p className="text-sm text-gray-600">{result.level}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">{Math.round(result.percentage)}%</p>
                    <p className="text-sm text-gray-500">{result.score}/{result.maxScore}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Assessment History</h2>
            {assessmentHistory.length > 0 ? (
              <div className="space-y-6">
                {assessmentHistory.map((record, index) => {
                  const averageScore = record.skillResults.reduce((sum, result) => sum + result.percentage, 0) / record.skillResults.length;
                  return (
                    <div key={record.sessionId} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">
                            Assessment #{assessmentHistory.length - index}
                          </h3>
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <Clock size={16} />
                            Completed on {new Date(record.completedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">{Math.round(averageScore)}%</p>
                          <p className="text-sm text-gray-600">Overall Score</p>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {record.skillResults.map((result, skillIndex) => (
                          <div key={skillIndex} className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 text-sm">{result.area}</h4>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-lg font-bold text-blue-600">{Math.round(result.percentage)}%</span>
                              <span className="text-xs text-gray-600">{result.level}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <History className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Assessment History</h3>
                <p className="text-gray-600">Complete your first assessment to see your history here.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Career Recommendations</h2>
            {recommendations && recommendations.length > 0 ? (
              <div className="space-y-6">
                {recommendations.map((rec: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-lg text-gray-900">{rec.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{rec.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {rec.skills.map((skill: string, i: number) => (
                        <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Briefcase className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Recommendations Yet</h3>
                <p className="text-gray-600">Complete your skills assessment to receive personalized career recommendations.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
