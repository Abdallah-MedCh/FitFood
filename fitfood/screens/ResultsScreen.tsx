"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Feather } from "@expo/vector-icons"
import { useMealPlan } from "../context/MealPlanContext"
import { COLORS, FONTS, SIZES } from "../constants/theme"
import { saveMealPlan } from "../utils/storage"
import type { ScreenNavigationProp, ResultsScreenRouteProp } from "../types/navigation"

export default function ResultsScreen() {
  const navigation = useNavigation<ScreenNavigationProp>()
  const route = useRoute<ResultsScreenRouteProp>()
  const { mealPlan: contextMealPlan, calorieTarget } = useMealPlan()
  const [isSaving, setIsSaving] = useState(false)

  // Use either the meal plan from context or from route params
  const mealPlan = route.params?.mealPlan || contextMealPlan

  const handleShare = async () => {
    try {
      // Format meal plan as text for sharing
      let mealPlanText = "My FitFood Meal Plan:\n\n"

      if (mealPlan && mealPlan.meals) {
        mealPlan.meals.forEach((meal, index) => {
          mealPlanText += `Meal ${index + 1}: ${meal.name} (${meal.calories} cal)\n`
          mealPlanText += "Ingredients:\n"
          meal.ingredients.forEach((ingredient) => {
            mealPlanText += `- ${ingredient}\n`
          })
          mealPlanText += `Instructions: ${meal.instructions}\n\n`
        })

        mealPlanText += `Total calories: ${mealPlan.totalCalories} / ${calorieTarget} target`
      }

      await Share.share({
        message: mealPlanText,
        title: "My FitFood Meal Plan",
      })
    } catch (error) {
      console.error("Error sharing meal plan:", error)
      Alert.alert("Error", "Failed to share meal plan")
    }
  }

  const handleSaveMealPlan = async () => {
    if (!mealPlan) {
      Alert.alert("Error", "No meal plan to save")
      return
    }

    try {
      setIsSaving(true)

      const success = await saveMealPlan(mealPlan)

      if (success) {
        Alert.alert("Success", "Meal plan saved successfully!", [
          {
            text: "View Saved Plans",
            onPress: () => navigation.navigate("SavedPlans"),
          },
          {
            text: "OK",
            style: "cancel",
          },
        ])
      } else {
        Alert.alert("Error", "Failed to save meal plan")
      }
    } catch (error) {
      console.error("Error saving meal plan:", error)
      Alert.alert("Error", "Failed to save meal plan: " + (error instanceof Error ? error.message : String(error)))
    } finally {
      setIsSaving(false)
    }
  }

  if (!mealPlan || !mealPlan.meals || mealPlan.meals.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Feather name="alert-circle" size={60} color={COLORS.gray} />
          <Text style={styles.errorText}>No meal plan available.</Text>
          <TouchableOpacity style={styles.errorButton} onPress={() => navigation.navigate("Create")}>
            <Text style={styles.errorButtonText}>Create a Plan</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
<View style={styles.backgroundLayer}>
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.calorieInfo}>
            <View style={styles.calorieRow}>
              <Text style={styles.calorieLabel}>Total Calories:</Text>
              <Text style={styles.calorieValue}>{mealPlan.totalCalories}</Text>
            </View>
            <View style={styles.calorieRow}>
              <Text style={styles.calorieLabel}>Target:</Text>
              <Text style={styles.calorieTarget}>{calorieTarget} cal</Text>
            </View>
          </View>
        </View>

        {mealPlan.meals.map((meal, index) => (
          <View key={index} style={styles.mealCard}>
            <View style={styles.mealHeader}>
              <View style={styles.mealNumberContainer}>
                <Text style={styles.mealNumber}>{index + 1}</Text>
              </View>
              <Text style={styles.mealTitle}>{meal.name}</Text>
              <Text style={styles.mealCalories}>{meal.calories} cal</Text>
            </View>

            <View style={styles.mealSection}>
              <View style={styles.sectionHeader}>
                <Feather name="shopping-bag" size={18} color={COLORS.primary} />
                <Text style={styles.sectionTitle}>Ingredients</Text>
              </View>
              {meal.ingredients.map((ingredient, idx) => (
                <View key={idx} style={styles.ingredient}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>

            <View style={styles.mealSection}>
              <View style={styles.sectionHeader}>
                <Feather name="book-open" size={18} color={COLORS.primary} />
                <Text style={styles.sectionTitle}>Instructions</Text>
              </View>
              <Text style={styles.instructions}>{meal.instructions}</Text>
            </View>
          </View>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView >
        <View style={styles.buttonContainer} >
        <TouchableOpacity
          style={[styles.button, styles.saveButton, isSaving && styles.disabledButton]}
          onPress={handleSaveMealPlan}
          disabled={isSaving}
        >
          <Feather name="save" size={20} color={COLORS.white} />
          <Text style={styles.buttonText}>{isSaving ? "Saving..." : "Save Plan"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.shareButton]} onPress={handleShare}>
          <Feather name="share-2" size={20} color={COLORS.white} />
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
    
</View>
  )
}

const styles = StyleSheet.create({
  backgroundLayer: {
    flex: 1,
    backgroundColor: COLORS.secondary, // Set your desired color behind the SafeAreaView
   
    
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 50,
  borderTopRightRadius: 50,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: SIZES.padding,
  },
  calorieInfo: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
  },
  calorieRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.base,
  },
  calorieLabel: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
  calorieValue: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
  calorieTarget: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.textLight,
  },
  mealCard: {
    margin: SIZES.padding,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    overflow: "hidden",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: SIZES.padding,
  },
  mealHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: SIZES.padding,
    backgroundColor: COLORS.secondary,
  },
  mealNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SIZES.base,
  },
  mealNumber: {
    ...FONTS.bold,
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
  mealTitle: {
    ...FONTS.bold,
    fontSize: SIZES.medium,
    color: COLORS.text,
    flex: 1,
  },
  mealCalories: {
    ...FONTS.bold,
    fontSize: SIZES.medium,
    color: COLORS.textLight,
  },
  mealSection: {
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.padding,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginLeft: SIZES.base,
  },
  ingredient: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.base,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginRight: SIZES.base,
  },
  ingredientText: {
    ...FONTS.regular,
    fontSize: SIZES.font,
    color: COLORS.text,
  },
  instructions: {
    ...FONTS.regular,
    fontSize: SIZES.font,
    color: COLORS.text,
    lineHeight: 22,
  },
 buttonContainer: {
  backgroundColor: COLORS.background,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 7,
    position: "absolute",
    bottom: 0,
    left: 0,
  right: 0,// Add some breathing room at the bottom
},
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginHorizontal: SIZES.base,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 1.5,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding * 1.5,
    flex: 1,
  },
  shareButton: {
    backgroundColor: COLORS.secondary,
  },
  buttonText: {
    ...FONTS.medium,
    color: COLORS.white,
    marginLeft: SIZES.base,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.padding * 2,
  },
  errorText: {
    ...FONTS.medium,
    fontSize: SIZES.large,
    color: COLORS.textLight,
    marginTop: SIZES.padding,
    marginBottom: SIZES.padding * 2,
    textAlign: "center",
  },
  errorButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    borderRadius: 30,
  },
  errorButtonText: {
    ...FONTS.medium,
    color: COLORS.white,
  },
  disabledButton: {
    backgroundColor: COLORS.gray,
  },
})
