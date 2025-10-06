import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface GuidanceViewed {
  careerExploration: boolean;
  skillDevelopment: boolean;
  educationPlanning: boolean;
  industryInsights: boolean;
  lastViewedAt?: Date;
}

interface GuidanceState {
  guidanceViewed: GuidanceViewed;
  needsGuidance: boolean;
  assessmentCompleted: boolean;
  profileCompleted: boolean;
  recommendationsGenerated: boolean;
  loading: boolean;
  error: string | null;
}

interface GuidanceActions {
  setGuidanceState: (state: Partial<GuidanceState>) => void;
  markSectionViewed: (section: keyof GuidanceViewed) => Promise<void>;
  fetchGuidanceStatus: () => Promise<void>;
  saveAssessmentToHistory: (sessionId: string) => Promise<void>;
  reset: () => void;
}

const initialState: GuidanceState = {
  guidanceViewed: {
    careerExploration: false,
    skillDevelopment: false,
    educationPlanning: false,
    industryInsights: false
  },
  needsGuidance: false,
  assessmentCompleted: false,
  profileCompleted: false,
  recommendationsGenerated: false,
  loading: false,
  error: null
};

export const useGuidanceStore = create<GuidanceState & GuidanceActions>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setGuidanceState: (state) => {
        set((current) => ({ ...current, ...state }), false, 'setGuidanceState');
      },

      markSectionViewed: async (section) => {
        set({ loading: true, error: null });
        
        try {
          const response = await fetch('/api/user/guidance', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ section }),
          });

          if (!response.ok) {
            throw new Error('Failed to mark section as viewed');
          }

          const data = await response.json();
          
          set(
            (state) => ({
              ...state,
              guidanceViewed: {
                ...state.guidanceViewed,
                [section]: true,
                lastViewedAt: new Date()
              },
              loading: false
            }),
            false,
            'markSectionViewed'
          );
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to mark section as viewed'
          });
        }
      },

      fetchGuidanceStatus: async () => {
        set({ loading: true, error: null });
        
        try {
          const response = await fetch('/api/user/guidance', {
            credentials: 'include'
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch guidance status');
          }

          const data = await response.json();
          
          set(
            {
              guidanceViewed: data.guidanceViewed,
              needsGuidance: data.needsGuidance,
              assessmentCompleted: data.assessmentCompleted,
              profileCompleted: data.profileCompleted,
              recommendationsGenerated: data.recommendationsGenerated,
              loading: false
            },
            false,
            'fetchGuidanceStatus'
          );
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch guidance status'
          });
        }
      },

      saveAssessmentToHistory: async (sessionId) => {
        set({ loading: true, error: null });
        
        try {
          const response = await fetch('/api/user/guidance', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ sessionId }),
          });

          if (!response.ok) {
            throw new Error('Failed to save assessment to history');
          }

          set({ loading: false }, false, 'saveAssessmentToHistory');
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to save assessment to history'
          });
        }
      },

      reset: () => {
        set(initialState, false, 'reset');
      }
    }),
    {
      name: 'guidance-store'
    }
  )
);

// Helper hooks
export const useGuidanceViewed = () => {
  const guidanceViewed = useGuidanceStore((state) => state.guidanceViewed);
  return guidanceViewed;
};

export const useNeedsGuidance = () => {
  const needsGuidance = useGuidanceStore((state) => state.needsGuidance);
  const assessmentCompleted = useGuidanceStore((state) => state.assessmentCompleted);
  const recommendationsGenerated = useGuidanceStore((state) => state.recommendationsGenerated);
  
  return needsGuidance && assessmentCompleted && !recommendationsGenerated;
};

export const useUserProgress = () => {
  const assessmentCompleted = useGuidanceStore((state) => state.assessmentCompleted);
  const profileCompleted = useGuidanceStore((state) => state.profileCompleted);
  const recommendationsGenerated = useGuidanceStore((state) => state.recommendationsGenerated);
  
  return {
    assessmentCompleted,
    profileCompleted,
    recommendationsGenerated,
    isFullyCompleted: assessmentCompleted && profileCompleted && recommendationsGenerated
  };
};