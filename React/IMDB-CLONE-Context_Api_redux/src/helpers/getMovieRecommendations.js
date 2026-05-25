import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = "AIzaSyAPSO1wn0IZtC0P9crtDV655DJQKaQYnnE";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const getMovieRecommendations = async (movies) => {
  console.log(movies);
  try {
    const promt = `
        Based on these Movies in user's list: ${movies?.map((movie) => `- {movie.title}`).join("\n")}
        Recommend 6 Similar Movies.
        Return only valid JSON in this exact format
        {
            "recommendations": [
                {
                  "title": "Movie Title",
                  "reason": "Reason for recommendation",
                  "confidence": 85
                }
            ]
        }  
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: promt,
      config: {
        responseMimeType: "application/json",
      },
    });
    const text = response.text.trim();
    return JSON.parse(text);
  } catch (error) {
    console.log(error);
    return [];
  }
};
