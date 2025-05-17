"use client"

import { useEffect, useState } from "react"
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import { useMealPlan } from "../context/MealPlanContext"
import { COLORS, SIZES, FONTS } from "../constants/theme"

export default function LoadingScreen() {
  const { isLoading } = useMealPlan()
  const [loadingMessage, setLoadingMessage] = useState("Analyzing your ingredients...")

  // Simulate different loading messages
  useEffect(() => {
    const messages = [
      "Analyzing your ingredients...",
      "Calculating nutritional values...",
      "Creating balanced meals...",
      "Optimizing for your calorie target...",
      "Finalizing your meal plan...",
    ]

    let currentIndex = 0

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % messages.length
      setLoadingMessage(messages[currentIndex])
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} style={styles.spinner} />
        </View>

        <Text style={styles.title}>Creating your personalized meal plan</Text>

        <Text style={styles.loadingMessage}>{loadingMessage}</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>We're using AI to create a meal plan that:</Text>
          <View style={styles.bulletPoints}>
            <View style={styles.bulletPoint}>
              <Feather name="check" size={16} color={COLORS.primary} />
              <Text style={styles.bulletPointText}>Uses your available ingredients</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Feather name="check" size={16} color={COLORS.primary} />
              <Text style={styles.bulletPointText}>Meets your calorie target</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Feather name="check" size={16} color={COLORS.primary} />
              <Text style={styles.bulletPointText}>Divides into your preferred number of meals</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SIZES.padding * 2,
    alignItems: "center",
    justifyContent: "center",
  },
  loaderContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SIZES.padding * 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  spinner: {
    transform: [{ scale: 1.5 }],
  },
  title: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.text,
    textAlign: "center",
    marginBottom: SIZES.padding,
  },
  loadingMessage: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: SIZES.padding * 2,
  },
  infoContainer: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
  },
  infoText: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  bulletPoints: {
    marginLeft: SIZES.base,
  },
  bulletPoint: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.padding,
  },
  bulletPointText: {
    ...FONTS.regular,
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginLeft: SIZES.base,
  },
})
