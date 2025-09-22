import { create } from 'zustand';
import { SkillResult } from '../types';

interface TestResultState {
  skillResults: SkillResult[];
  setSkillResults: (results: SkillResult[]) => void;
}

export const useTestResultStore = create<TestResultState>((set) => ({
  skillResults: [],
  setSkillResults: (results) => set({ skillResults: results }),
}));
