"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { generateMealPlan, type MealPlan } from "../api-service"

interface MealPlanContextType {
  groceryList: string
  setGroceryList: (list: string) => void
  calorieTarget: number
  setCalorieTarget: (calories: number) => void
  mealCount: number
  setMealCount: (count: number) => void
  mealPlan: MealPlan | null
  setMealPlan: (plan: MealPlan | null) => void
  isLoading: boolean
  generatePlan: () => Promise<void>
  saveMealPlan: () => Promise<void>
}

const MealPlanContext = createContext<MealPlanContextType>({
  groceryList: "",
  setGroceryList: () => {},
  calorieTarget: 2000,
  setCalorieTarget: () => {},
  mealCount: 3,
  setMealCount: () => {},
  mealPlan: null,
  setMealPlan: () => {},
  isLoading: false,
  generatePlan: async () => {},
  saveMealPlan: async () => {},
})

export const useMealPlan = () => useContext(MealPlanContext)

export const MealPlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [groceryList, setGroceryList] = useState("")
  const [calorieTarget, setCalorieTarget] = useState(2000)
  const [mealCount, setMealCount] = useState(3)
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const generatePlan = async () => {
    try {
      setIsLoading(true)
      const plan = await generateMealPlan(groceryList, calorieTarget, mealCount)
      setMealPlan(plan)
    } catch (error) {
      console.error("Error generating meal plan:", error)
      // Handle error here
    } finally {
      setIsLoading(false)
    }
  }

  const saveMealPlan = async () => {
    try {
      if (!mealPlan) return

      // Get existing saved plans
      const savedPlansJson = await AsyncStorage.getItem("savedMealPlans")
      const savedPlans = savedPlansJson ? JSON.parse(savedPlansJson) : []

      // Create a new plan entry
      const newPlan = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        plan: mealPlan,
      }

      // Add to saved plans
      const updatedPlans = [newPlan, ...savedPlans]
      await AsyncStorage.setItem("savedMealPlans", JSON.stringify(updatedPlans))

    } catch (error) {
      console.error("Error saving meal plan:", error)
    }
  }

  return (
    <MealPlanContext.Provider
      value={{
        groceryList,
        setGroceryList,
        calorieTarget,
        setCalorieTarget,
        mealCount,
        setMealCount,
        mealPlan,
        setMealPlan,
        isLoading,
        generatePlan,
        saveMealPlan,
      }}
    >
      {children}
    </MealPlanContext.Provider>
  )
}
