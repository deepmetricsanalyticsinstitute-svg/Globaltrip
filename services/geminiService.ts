import { GoogleGenAI, Type, Schema } from "@google/genai";
import { BookingRequest, TravelPackage } from "../types";

// Initialize Gemini Client
const apiKey = process.env.API_KEY;
// Note: In a real production app, you might proxy this through a backend to hide the key,
// or require the user to input their key if it's a BYOK tool.
// For this demo, we assume process.env.API_KEY is available or we handle the missing key gracefully in UI.

const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy_key' });

const itinerarySchema: Schema = {
  type: Type.OBJECT,
  properties: {
    destination: { type: Type.STRING },
    title: { type: Type.STRING, description: "Catchy title for the trip package" },
    price: { type: Type.STRING, description: "Estimated total price in USD, e.g. $2,500" },
    duration: { type: Type.STRING, description: "e.g. 7 Days / 6 Nights" },
    travelers: { type: Type.NUMBER },
    description: { type: Type.STRING, description: "A tempting summary of the trip" },
    hotelDetails: { type: Type.STRING, description: "Name and description of a suggested hotel" },
    inclusions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of what is included (flights, meals, guide, etc.)"
    },
    itinerary: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.NUMBER },
          title: { type: Type.STRING },
          description: { type: Type.STRING }
        },
        required: ["day", "title", "description"]
      }
    }
  },
  required: ["destination", "title", "price", "duration", "description", "hotelDetails", "inclusions", "itinerary"]
};

export const generateTripPackage = async (request: BookingRequest): Promise<TravelPackage | null> => {
  if (!apiKey) {
    console.error("API Key is missing");
    return null;
  }

  try {
    const prompt = `
      Create a detailed travel itinerary for a trip to ${request.destination}.
      Duration: ${request.duration} days.
      Travelers: ${request.travelers}.
      Budget Level: ${request.budget}.
      Dates: ${request.dates} (approximate).

      The output must be a complete travel package with a daily itinerary, estimated price, hotel suggestions, and inclusions.
      Make it sound exciting and professional like a high-end travel agency.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: itinerarySchema,
        temperature: 0.7,
      }
    });

    const text = response.text;
    if (!text) return null;

    const data = JSON.parse(text) as TravelPackage;
    
    // Add a placeholder image since Gemini doesn't return image URLs directly in this text mode easily without search grounding
    // We will handle images in the UI layer using picsum or similar based on destination name
    return data;

  } catch (error) {
    console.error("Error generating trip:", error);
    throw error;
  }
};