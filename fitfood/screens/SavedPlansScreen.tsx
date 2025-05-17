"use client"

import { useState, useEffect, useCallback } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import { COLORS, FONTS, SIZES } from "../constants/theme"
import type { MealPlan } from "../api-service"
import type { ScreenNavigationProp } from "../types/navigation"
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import { getSavedMealPlans, deleteSavedMealPlan, type SavedPlan } from "../utils/storage"

export default function SavedPlansScreen() {
  const navigation = useNavigation<ScreenNavigationProp>()
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)

  const loadSavedPlans = useCallback(async () => {
    try {
      setLoading(true)
      console.log("Loading saved plans...")

      const plans = await getSavedMealPlans()
      console.log("Retrieved saved plans:", plans.length)
      setSavedPlans(plans)
    } catch (error) {
      console.error("Error loading saved plans:", error)
      Alert.alert("Error", "Failed to load saved plans")
      setSavedPlans([])
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  // Load plans when the screen is focused
  useFocusEffect(
    useCallback(() => {
      loadSavedPlans()
    }, [loadSavedPlans]),
  )

  // Initial load
  useEffect(() => {
    loadSavedPlans()
  }, [loadSavedPlans])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    loadSavedPlans()
  }, [loadSavedPlans])

  const handleDeletePlan = async (id: string) => {
    try {
      console.log("Deleting plan with id:", id)
      const success = await deleteSavedMealPlan(id)

      if (success) {
        // Update the local state
        setSavedPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id))
        Alert.alert("Success", "Plan deleted successfully")
      } else {
        Alert.alert("Error", "Failed to delete plan")
      }
    } catch (error) {
      console.error("Error deleting plan:", error)
      Alert.alert("Error", "Failed to delete plan")
    }
  }

  const confirmDelete = (id: string) => {
    Alert.alert("Delete Plan", "Are you sure you want to delete this meal plan?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => handleDeletePlan(id),
        style: "destructive",
      },
    ])
  }

  const viewPlan = (plan: MealPlan) => {
    navigation.navigate("MealPlan", { mealPlan: plan })
  }

  const renderPlanItem = ({ item }: { item: SavedPlan }) => (
    <View style={styles.planCard}>
      <View style={styles.planCardHeader}>
        <Text style={styles.planDate}>{item.date}</Text>
        <TouchableOpacity onPress={() => confirmDelete(item.id)}>
          <Feather name="trash-2" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.planDetails}>
        <Text style={styles.planCalories}>{item.plan.totalCalories} Calories</Text>
        <Text style={styles.planMeals}>{item.plan.meals.length} Meals</Text>
      </View>

      <TouchableOpacity style={styles.viewButton} onPress={() => viewPlan(item.plan)}>
        <Text style={styles.viewButtonText}>View Plan</Text>
        <Feather name="arrow-right" size={18} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.backgroundLayer}>
    <SafeAreaView style={styles.container}>
      {loading && savedPlans.length === 0 ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading saved plans...</Text>
        </View>
      ) : savedPlans.length > 0 ? (
        <FlatList
          data={savedPlans}
          renderItem={renderPlanItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Feather name="calendar" size={60} color={COLORS.gray} />
          <Text style={styles.emptyText}>No saved meal plans yet</Text>
          <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate("Create")}>
            <Text style={styles.createButtonText}>Create Your First Plan</Text>
          </TouchableOpacity>
        </View>
      )}
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
  listContainer: {
    padding: SIZES.padding,
  },
  planCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  loadingText: {
    fontSize: SIZES.large,
    color: COLORS.gray
  },
  planCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.base,
  },
  planDate: {
    ...FONTS.medium,
    color: COLORS.textLight,
  },
  planDetails: {
    flexDirection: "row",
    marginBottom: SIZES.padding,
  },
  planCalories: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.text,
    marginRight: SIZES.padding,
  },
  planMeals: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    alignSelf: "center",
  },
  viewButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius,
  },
  viewButtonText: {
    ...FONTS.medium,
    color: COLORS.white,
    marginRight: SIZES.base,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.padding * 2,
  },
  emptyText: {
    ...FONTS.medium,
    fontSize: SIZES.large,
    color: COLORS.textLight,
    marginTop: SIZES.padding,
    marginBottom: SIZES.padding * 2,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    borderRadius: 30,
  },
  createButtonText: {
    ...FONTS.medium,
    color: COLORS.white,
  },
})
