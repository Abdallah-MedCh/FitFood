import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import { COLORS, SIZES, FONTS } from "../constants/theme"
import type { ScreenNavigationProp } from "../types/navigation"
export default function HomeScreen() {
  const navigation = useNavigation<ScreenNavigationProp>()

  return (
     <View style={styles.backgroundLayer}>
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.welcomeTitle}>
            <Text style={styles.highlightText}>Say Hi to</Text>
            {"\n"}Your personal meal planning assistant
          </Text>

          <View style={styles.heroContainer}>
            <ImageBackground
              source={require('../public/bgimg.jpg')}
              style={styles.heroImage}
              imageStyle={styles.heroImageStyle}
            >
              <View style={styles.heroOverlay}>
                <Text style={styles.heroTitle}>Create Your Meal Plan</Text>
                <Text style={styles.heroSubtitle}>Get personalized meal suggestions based on your preferences</Text>
                <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate("Create")}>
                  <Feather name="plus" size={20} color={COLORS.white} />
                  <Text style={styles.createButtonText}>Create New Plan</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>

          <View style={styles.divider} />

          <View style={styles.stepsContainer}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>Enter your available groceries</Text>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>Set your calorie target and meal count</Text>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>Get an AI-powered meal plan instantly</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
  welcomeTitle: {
    ...FONTS.bold,
    fontSize: SIZES.extraLarge,
    color: COLORS.text,
    marginBottom: SIZES.padding * 1.5,
    lineHeight: 32,
  },
  highlightText: {
    color: COLORS.primary,
  },
  heroContainer: {
    borderRadius: SIZES.radius,
    overflow: "hidden",
    marginBottom: SIZES.padding * 1.5,
  },
  heroImage: {
    height: 180,
    width: "100%",
  },
  heroImageStyle: {
    borderRadius: SIZES.radius,
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: SIZES.padding,
    justifyContent: "flex-end",
  },
  heroTitle: {
    ...FONTS.bold,
    fontSize: SIZES.extraLarge,
    color: COLORS.white,
    marginBottom: SIZES.base,
  },
  heroSubtitle: {
    ...FONTS.regular,
    fontSize: SIZES.font,
    color: COLORS.white,
    marginBottom: SIZES.padding,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 1.5,
    borderRadius: 30,
    alignSelf: "flex-start",
  },
  createButtonText: {
    ...FONTS.bold,
    color: COLORS.white,
    marginLeft: SIZES.base,
    fontSize: SIZES.medium,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray,
    opacity: 0.3,
    marginVertical: SIZES.padding,
  },
  stepsContainer: {
    marginTop: SIZES.padding,
  },
  step: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.padding,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SIZES.padding,
  },
  stepNumberText: {
    ...FONTS.bold,
    color: COLORS.text,
  },
  stepText: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.text,
    flex: 1,
  },
})
