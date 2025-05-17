import axios from "axios"

// Types for our meal plan data
export interface Meal {
  name: string
  ingredients: string[]
  instructions: string
  calories: number
}

export interface MealPlan {
  meals: Meal[]
  totalCalories: number
}

// Function to generate meal plan using Google AI API
export async function generateMealPlan(
  groceryList: string,
  calorieTarget: number,
  mealCount: number,
): Promise<MealPlan> {
  const API_KEY = "put your api key here" // Replace with your actual API key
  const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent"

  // Construct the prompt for the AI
  const prompt = `
    Create a one-day meal plan with exactly ${mealCount} meals using only the following ingredients:
    ${groceryList}
    
    The total daily calories should be approximately ${calorieTarget} calories.
    
    For each meal, provide:
    1. A name for the meal
    2. List of ingredients with approximate quantities (use grams)
    3. Brief preparation instructions (2-3 sentences)
    4. Estimated calories
    
    Format the response as a JSON object with this structure:
    {
      "meals": [
        {
          "name": "Meal name",
          "ingredients": ["ingredient 1 with quantity", "ingredient 2 with quantity"],
          "instructions": "Brief preparation instructions",
          "calories": number
        }
      ],
      "totalCalories": number
    }
    
    Only use ingredients from the provided list. If the list is too limited, work with what's available.
  `

  try {
    const response = await axios.post(`${API_URL}?key=${API_KEY}`, {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    })

    // Extract the generated text from the response
    const generatedText = response.data.candidates[0].content.parts[0].text

    // Parse the JSON response
    // Find the JSON object in the text (in case there's additional text)
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Failed to parse meal plan from AI response")
    }

    const mealPlanData = JSON.parse(jsonMatch[0])
    return mealPlanData as MealPlan
  } catch (error) {
    console.error("Error generating meal plan:", error)
    throw error
  }
}
