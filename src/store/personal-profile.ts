import { create } from 'zustand';
import { PersonalProfile as PersonalProfileType } from '../types';

interface PersonalProfileState {
  personalProfile: PersonalProfileType;
  setPersonalProfile: (profile: PersonalProfileType) => void;
}

export const usePersonalProfileStore = create<PersonalProfileState>((set) => ({
  personalProfile: {
    interests: [],
    personalityTraits: [],
    workEnvironment: [],
    values: [],
    careerGoals: '',
    additionalInfo: ''
  },
  setPersonalProfile: (profile) => set({ personalProfile: profile }),
}));
