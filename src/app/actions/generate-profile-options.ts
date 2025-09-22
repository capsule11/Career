'use server'
import { Content, GenerationConfig, Type } from '@google/genai';
import { ai } from '@/gemini';

export interface ProfileOptions {
  interests: string[];
  personalityTraits: string[];
  workEnvironments: string[];
  values: string[];
}

const profileOptionsSchema = {
  type: Type.OBJECT,
  properties: {
    interests: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    personalityTraits: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    workEnvironments: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    values: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
  },
  required: ['interests', 'personalityTraits', 'workEnvironments', 'values'],
};

export async function generateProfileOptions(): Promise<ProfileOptions> {
  const prompt = `
        Generate a list of options for a personal profile assessment.
        Provide the output as a JSON object with the following keys:
        - interests: An array of 14 strings representing different interests and hobbies.
        - personalityTraits: An array of 14 strings representing different personality traits.
        - workEnvironments: An array of 12 strings representing different work environments.
        - values: An array of 12 strings representing different work values and motivations.
    `;

  const contents: Content[] = [{ parts: [{ text: prompt }] }];

  try {
    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: profileOptionsSchema,
      },
    });
    const responseText = result.text ?? "";
    return JSON.parse(responseText) as ProfileOptions;
  } catch (error) {
    console.error(`Error generating profile options:`, error);
    return {
      interests: [],
      personalityTraits: [],
      workEnvironments: [],
      values: [],
    };
  }
}
