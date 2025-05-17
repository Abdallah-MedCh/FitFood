"use client"

import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import Slider from "@react-native-community/slider"
import { Feather } from "@expo/vector-icons"
import { useMealPlan } from "../context/MealPlanContext"
import { COLORS, SIZES, FONTS } from "../constants/theme"
import type { ScreenNavigationProp } from "../types/navigation"

export default function CalorieInputScreen() {
  const navigation = useNavigation<ScreenNavigationProp>()
  const { calorieTarget, setCalorieTarget, mealCount, setMealCount, generatePlan } = useMealPlan()

  const handleGeneratePlan = async () => {
    navigation.navigate("Loading")
    await generatePlan()
    navigation.navigate("Results")
  }

  return (
    <View style={styles.backgroundLayer}>
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.description}>Set your daily calorie target and how many meals you'd like to have.</Text>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Feather name="target" size={20} color={COLORS.primary} />
              <Text style={styles.cardTitle}>Daily Calorie Target</Text>
            </View>
            <Text style={styles.calorieValue}>{calorieTarget} calories</Text>

            <Slider
              style={styles.slider}
              minimumValue={1200}
              maximumValue={3500}
              step={50}
              value={calorieTarget}
              onValueChange={setCalorieTarget}
              minimumTrackTintColor={COLORS.primary}
              maximumTrackTintColor={COLORS.lightGray}
              thumbTintColor={COLORS.primary}
            />

            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>1200</Text>
              <Text style={styles.sliderLabel}>3500</Text>
            </View>

            <Text style={styles.helperText}>
              Recommended daily calorie intake varies based on age, gender, and activity level.
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Feather name="clock" size={20} color={COLORS.primary} />
              <Text style={styles.cardTitle}>Number of Meals Per Day</Text>
            </View>
            <Text style={styles.mealValue}>{mealCount} meals</Text>

            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={6}
              step={1}
              value={mealCount}
              onValueChange={setMealCount}
              minimumTrackTintColor={COLORS.primary}
              maximumTrackTintColor={COLORS.lightGray}
              thumbTintColor={COLORS.primary}
            />

            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>1</Text>
              <Text style={styles.sliderLabel}>6</Text>
            </View>

            <Text style={styles.helperText}>We'll divide your daily calories across these meals.</Text>
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoHeader}>
              <Feather name="info" size={18} color={COLORS.primary} />
              <Text style={styles.infoTitle}>Calories per meal (approximate):</Text>
            </View>
            <Text style={styles.infoText}>{Math.round(calorieTarget / mealCount)} calories per meal</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={20} color={COLORS.textLight} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.generateButton]} onPress={handleGeneratePlan}>
          <Text style={styles.generateButtonText}>Generate Plan</Text>
          <Feather name="check-circle" size={20} color={COLORS.white} style={styles.buttonIcon} />
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
  content: {
    padding: SIZES.padding,
  },
  description: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.base,
  },
  cardTitle: {
    ...FONTS.bold,
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginLeft: SIZES.base,
  },
  calorieValue: {
    ...FONTS.bold,
    fontSize: SIZES.extraLarge,
    color: COLORS.primary,
    textAlign: "center",
    marginVertical: SIZES.padding,
  },
  mealValue: {
    ...FONTS.bold,
    fontSize: SIZES.extraLarge,
    color: COLORS.primary,
    textAlign: "center",
    marginVertical: SIZES.padding,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -SIZES.base,
  },
  sliderLabel: {
    ...FONTS.regular,
    color: COLORS.textLight,
    fontSize: SIZES.font,
  },
  helperText: {
    ...FONTS.regular,
    color: COLORS.textLight,
    fontSize: SIZES.font,
    marginTop: SIZES.base,
    textAlign: "center",
  },
  infoBox: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.base,
  },
  infoTitle: {
    ...FONTS.bold,
    color: COLORS.text,
    marginLeft: SIZES.base,
  },
  infoText: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.text,
  },
  buttonContainer: {
    backgroundColor: COLORS.background,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 7,
    position: "absolute",
    bottom: 0,
    
  },
  button: {
    paddingVertical: SIZES.padding,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  backButton: {
    
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: SIZES.padding,
  },
  backButtonText: {
    ...FONTS.medium,
    color: COLORS.textLight,
    marginLeft: SIZES.base,
  },
  generateButton: {
    
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding * 1.5,
    flex: 1,
    marginLeft: SIZES.padding,
  },
  generateButtonText: {
    ...FONTS.medium,
    color: COLORS.white,
    marginRight: SIZES.base,
  },
  buttonIcon: {
    marginLeft: SIZES.base,
  },
})
