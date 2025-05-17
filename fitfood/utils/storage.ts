import AsyncStorage from "@react-native-async-storage/async-storage"
import type { MealPlan } from "../api-service"

export interface SavedPlan {
  id: string
  date: string
  plan: MealPlan
}

const STORAGE_KEYS = {
  SAVED_MEAL_PLANS: "savedMealPlans",
}

export const saveMealPlan = async (mealPlan: MealPlan): Promise<boolean> => {
  try {
    // Get existing saved plans
    const savedPlansJson = await AsyncStorage.getItem(STORAGE_KEYS.SAVED_MEAL_PLANS)
    const savedPlans: SavedPlan[] = savedPlansJson ? JSON.parse(savedPlansJson) : []

    // Create a new plan entry
    const newPlan: SavedPlan = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      plan: mealPlan,
    }

    // Add to saved plans
    const updatedPlans = [newPlan, ...savedPlans]

    // Save to AsyncStorage
    await AsyncStorage.setItem(STORAGE_KEYS.SAVED_MEAL_PLANS, JSON.stringify(updatedPlans))

    return true
  } catch (error) {
    console.error("Error saving meal plan:", error)
    return false
  }
}

export const getSavedMealPlans = async (): Promise<SavedPlan[]> => {
  try {
    const savedPlansJson = await AsyncStorage.getItem(STORAGE_KEYS.SAVED_MEAL_PLANS)
    return savedPlansJson ? JSON.parse(savedPlansJson) : []
  } catch (error) {
    console.error("Error getting saved meal plans:", error)
    return []
  }
}

export const deleteSavedMealPlan = async (id: string): Promise<boolean> => {
  try {
    const savedPlans = await getSavedMealPlans()
    const updatedPlans = savedPlans.filter((plan) => plan.id !== id)
    await AsyncStorage.setItem(STORAGE_KEYS.SAVED_MEAL_PLANS, JSON.stringify(updatedPlans))
    return true
  } catch (error) {
    console.error("Error deleting saved meal plan:", error)
    return false
  }
}

export const clearAllSavedMealPlans = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.SAVED_MEAL_PLANS)
    return true
  } catch (error) {
    console.error("Error clearing saved meal plans:", error)
    return false
  }
}
