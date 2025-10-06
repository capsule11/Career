'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { User, Menu, X, Home, Brain, Compass, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from './AuthModal';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'welcome', label: 'Home', icon: Home, path: '/' },
    { id: 'skills-test', label: 'Assessment', icon: Brain, path: '/skills-test' },
    { id: 'guidance', label: 'Guidance', icon: Compass, path: '/guidance' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push('/')}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-2">
              <Brain className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900">CareerGuide</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              
              return (
                <button
                  key={item.id}
                  onClick={() => router.push(item.path)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* User Profile / Login */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                {/* Progress Indicator */}
                {user.progressPercentage !== undefined && (
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${user.progressPercentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600">{user.progressPercentage}%</span>
                  </div>
                )}
                
                <button
                  onClick={() => router.push('/user-profile')}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    {user.image ? (
                      <img 
                        src={user.image} 
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="text-white" size={16} />
                    )}
                  </div>
                  <span className="text-gray-700 font-medium">{user.name}</span>
                </button>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              >
                <LogIn size={16} />
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      router.push(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                );
              })}
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                {user ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        router.push('/user-profile');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all"
                    >
                      <User size={18} />
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setShowAuthModal(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
                  >
                    <LogIn size={18} />
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </nav>
  );
};
