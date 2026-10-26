import { GoogleGenAI } from "@google/genai";
import { KHALID_BIO } from '../constants';

// Created on first use, so a missing key only disables the chat instead of crashing the page
let ai: GoogleGenAI | null = null;

export const sendMessageToGemini = async (history: string[], userMessage: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "The assistant isn't connected right now. Use the contact form and Khalid will reply directly.";
  }
  ai ??= new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    // Upgraded to gemini-3-flash-preview for latest capabilities
    const model = 'gemini-3-flash-preview';
    
    const conversationContext = history.map((msg, index) => {
      const role = index % 2 === 0 ? 'Model' : 'User';
      return `${role}: ${msg}`;
    }).join('\n');

    const response = await ai.models.generateContent({
      model: model,
      contents: `Previous Conversation:\n${conversationContext}\n\nCurrent User Input: ${userMessage}`,
      config: {
        systemInstruction: `
          ${KHALID_BIO}
          
          Roleplay Instructions:
          You are an AI assistant living on Khalid's portfolio website.
          Your goal is to answer questions about Khalid's skills, experience, and projects based ONLY on the information provided above.
          Keep answers concise, professional, yet enthusiastic (tech-savvy tone).
          If asked about contact info, suggest using the contact form on the site.
          Do not make up facts not in the bio.
          Refer to Khalid in the third person (e.g., "Khalid has experience in...").
        `,
        temperature: 0.7,
      },
    });

    return response.text || "I apologize, I couldn't process that request right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I couldn't reach the assistant just now. Try again, or use the contact form.";
  }
};