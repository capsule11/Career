'use client';

import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, X, Award, TrendingUp, Target } from 'lucide-react';
import { SkillResult, PersonalProfile } from '@/types';

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
  personalProfile?: PersonalProfile;
  onBack: () => void;
  onUpdateProfile: (profile: any) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  userProfile,
  skillResults,
  personalProfile,
  onBack,
  onUpdateProfile
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);

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

        {/* Personal Profile */}
        {personalProfile && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Profile</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {personalProfile.interests.map((interest, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Personality Traits</h3>
                  <div className="flex flex-wrap gap-2">
                    {personalProfile.personalityTraits.map((trait, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Work Environment</h3>
                  <div className="flex flex-wrap gap-2">
                    {personalProfile.workEnvironment.map((env, index) => (
                      <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        {env}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Values</h3>
                  <div className="flex flex-wrap gap-2">
                    {personalProfile.values.map((value, index) => (
                      <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {personalProfile.careerGoals && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Career Goals</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{personalProfile.careerGoals}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};