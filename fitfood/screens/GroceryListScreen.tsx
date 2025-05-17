import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import { useMealPlan } from "../context/MealPlanContext"
import { COLORS, SIZES, FONTS } from "../constants/theme"
import type { ScreenNavigationProp } from "../types/navigation"

export default function GroceryListScreen() {
  const navigation = useNavigation<ScreenNavigationProp>()
  const { groceryList, setGroceryList } = useMealPlan()

  return (
    <View style={styles.backgroundLayer}>
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.description}>
            List the ingredients you have available. This helps us create a meal plan using what you already have.
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              multiline
              numberOfLines={8}
              placeholder="Enter ingredients separated by commas (e.g., chicken, rice, broccoli, olive oil, garlic)"
              value={groceryList}
              onChangeText={setGroceryList}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.exampleContainer}>
            <View style={styles.exampleHeader}>
              <Feather name="info" size={18} color={COLORS.primary} />
              <Text style={styles.exampleTitle}>Example ingredients:</Text>
            </View>
            <Text style={styles.exampleText}>
              chicken breast, brown rice, broccoli, spinach, eggs, olive oil, garlic, onions, bell peppers, tomatoes,
              avocado, quinoa, salmon, sweet potatoes
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={20} color={COLORS.textLight} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.nextButton, !groceryList.trim() && styles.disabledButton]}
          onPress={() => navigation.navigate("CalorieInput")}
          disabled={!groceryList.trim()}
        >
          <Text style={styles.nextButtonText}>Next</Text>
          <Feather name="arrow-right" size={20} color={COLORS.white} />
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
  inputContainer: {
    marginBottom: SIZES.padding,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    fontSize: SIZES.medium,
    backgroundColor: COLORS.white,
    minHeight: 150,
    color: COLORS.text,
  },
  exampleContainer: {
    backgroundColor: COLORS.secondary,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding,
    opacity: 0.8,
  },
  exampleHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.base,
  },
  exampleTitle: {
    ...FONTS.bold,
    marginLeft: SIZES.base,
    color: COLORS.text,
  },
  exampleText: {
    ...FONTS.regular,
    color: COLORS.text,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: SIZES.padding,
    position: "absolute",
    bottom: 1,
    elevation: 0,
    
     left: 0,
  right: 0,
  },
  button: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 1.5,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  backButton: {
    backgroundColor: COLORS.lightGray,
  },
  backButtonText: {
    ...FONTS.medium,
    color: COLORS.textLight,
    marginLeft: SIZES.base,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    minWidth: 100,
  },
  nextButtonText: {
    ...FONTS.medium,
    color: COLORS.white,
    marginRight: SIZES.base,
  },
  disabledButton: {
    opacity: 0.5,
  },
})
