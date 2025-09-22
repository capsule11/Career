"use server"
import { Content, GenerationConfig, Type } from '@google/genai';
import { Question, SkillArea } from '../types';
import { ai } from '@/gemini';
import { skillAreas as initialSkillAreas } from '../../data/skillsData';

const skillAreaSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING },
        description: { type: Type.STRING },
        questions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING },
                    question: { type: Type.STRING },
                    options: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                    },
                    correctAnswer: { type: Type.NUMBER },
                    difficulty: { type: Type.STRING },
                    explanation: { type: Type.STRING },
                },
                required: ['id', 'question', 'options', 'correctAnswer', 'difficulty', 'explanation'],
            },
        },
    },
    required: ['name', 'questions'],
};

const responseSchema = {
    type: Type.ARRAY,
    items: skillAreaSchema,
};

export async function formQuestions(): Promise<SkillArea[]> {
    const skillAreaNames = initialSkillAreas.map((area) => area.name);

    const prompt = `
        Generate 5 unique, high-quality questions for a skills assessment test for each of the following skill areas:
        ${skillAreaNames.join(', ')}

        For each skill area, provide the output as a JSON object with the following structure:
        - name: The name of the skill area.
        - questions: An array of 5 question objects.

        Each question object should have the following structure:
        - id: a unique identifier (e.g., "skill-area-name-1")
        - question: The question text.
        - options: An array of 4 strings representing the possible answers.
        - correctAnswer: The 0-based index of the correct answer in the options array.
        - difficulty: 'easy', 'medium', or 'hard'.
        - explanation: A brief explanation of why the correct answer is right.

        Return the output as a valid JSON array of skill area objects.
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
        const generatedSkillAreas = JSON.parse(responseText) as { name: string; questions: Question[] }[];

        // Merge the generated questions with the initial skill areas data
        const updatedSkillAreas = initialSkillAreas.map(initialArea => {
            const generatedArea = generatedSkillAreas.find(genArea => genArea.name === initialArea.name);
            return {
                ...initialArea,
                questions: generatedArea ? generatedArea.questions : [],
            };
        });

        console.log(updatedSkillAreas);

        return updatedSkillAreas;

    } catch (error) {
        console.error(`Error generating questions:`, error);
        return initialSkillAreas; // Return initial data in case of an error
    }
}
