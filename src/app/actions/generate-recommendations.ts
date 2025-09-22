'use server'
import { Content, GenerationConfig, Type } from '@google/genai';
import { ai } from '@/gemini';
import { SkillResult, PersonalProfile, CareerRecommendation } from '@/types';

const recommendationSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    responsibilities: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    whySuitable: { type: Type.STRING },
    educationPath: { type: Type.STRING },
    salaryRange: { type: Type.STRING },
    growthProspects: { type: Type.STRING },
    keySkills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    matchingSkills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    matchPercentage: { type: Type.NUMBER },
  },
  required: [
    'title',
    'description',
    'responsibilities',
    'whySuitable',
    'educationPath',
    'salaryRange',
    'growthProspects',
    'keySkills',
    'matchingSkills',
    'matchPercentage',
  ],
};

const responseSchema = {
  type: Type.ARRAY,
  items: recommendationSchema,
};

export async function generateRecommendations(
  skillResults: SkillResult[],
  personalProfile: PersonalProfile
): Promise<CareerRecommendation[]> {
  const prompt = `
    Based on the following user data, generate 5 personalized career recommendations.

    **Skill Assessment Results:**
    ${skillResults.map(r => `- ${r.area}: ${r.percentage.toFixed(2)}% (${r.level})`).join('\n')}

    **Personal Profile:**
    - Interests: ${personalProfile.interests.join(', ')}
    - Personality Traits: ${personalProfile.personalityTraits.join(', ')}
    - Preferred Work Environment: ${personalProfile.workEnvironment.join(', ')}
    - Values: ${personalProfile.values.join(', ')}
    - Career Goals: ${personalProfile.careerGoals}

    For each recommendation, provide the output as a JSON object with the following structure:
    - title: The career title.
    - description: A brief description of the career.
    - responsibilities: An array of key responsibilities.
    - whySuitable: A sentence explaining why this career is suitable for the user.
    - educationPath: The typical education path for this career in India.
    - salaryRange: The typical salary range for this career in India.
    - growthProspects: The growth prospects for this career in India.
    - keySkills: An array of key skills to develop for this career.
    - matchingSkills: An array of the user's skills that match this career.
    - matchPercentage: A number from 0 to 100 representing the match percentage.

    Return the output as a valid JSON array of career recommendation objects.
  `;

  const contents: Content[] = [{ parts: [{ text: prompt }] }];

  try {
    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });
    const responseText = result.text ?? "";
    return JSON.parse(responseText) as CareerRecommendation[];
  } catch (error) {
    console.error(`Error generating recommendations:`, error);
    return [];
  }
}