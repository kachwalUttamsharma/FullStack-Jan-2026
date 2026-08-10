import { GoogleGenAI } from "@google/genai";
const GEMINI_API_KEY = "AIzaSyBZmQuQ75AiL4BVcIocKtWsFYhlmwSA8ts";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const getMovieRecommendations = async (movies, userPrompt) => {
  try {
    const prompt = `
      Based on the user's watchlist:${movies?.map((movie) => `- ${movie.title}`).join("\n")}
      Recommend exactly 6 similar real movies based on genres, themes, and user preferences.
      Rules:
      - Do not recommend movies already in the watchlist
      - No duplicates
      - Return only valid JSON
      {
        "recommendations": [
          {
            "title": "Movie Title",
            "reason": "Short reason",
            "confidence": 85,
            "bannerImage":"https://..."
          }
        ]
      }
      use this as a user prompt keep this as a important information: ${userPrompt}
`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });
    const text = response.text.trim();
    return JSON.parse(text);
  } catch (error) {
    console.log(error);
  }
};
