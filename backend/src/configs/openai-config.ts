
import { GoogleGenAI } from "@google/genai";

export const configureGemini = () => {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is missing in .env");
    }

    return new GoogleGenAI({ apiKey });
};
