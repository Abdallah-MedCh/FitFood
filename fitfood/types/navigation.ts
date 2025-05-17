import type { StackNavigationProp } from "@react-navigation/stack"
import type { RouteProp } from "@react-navigation/native"
import type { MealPlan } from "../api-service"

// Define the param list for stack navigation
export type RootStackParamList = {
  Home: undefined
  Create: undefined
  GroceryList: undefined
  CalorieInput: undefined
  Loading: undefined
  Results: undefined
  SavedPlans: undefined
  Settings: undefined
  MealPlan: { mealPlan?: MealPlan }
}

// Navigation prop types
export type ScreenNavigationProp = StackNavigationProp<RootStackParamList>

// Route prop types
export type ResultsScreenRouteProp = RouteProp<RootStackParamList, "MealPlan">
