import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { MealPlanProvider } from "./context/MealPlanContext"
import { Feather } from "@expo/vector-icons"
import { COLORS } from "./constants/theme"
import type { RootStackParamList } from "./types/navigation"

// Import screens
import HomeScreen from "./screens/HomeScreen"
import GroceryListScreen from "./screens/GroceryListScreen"
import CalorieInputScreen from "./screens/CalorieInputScreen"
import LoadingScreen from "./screens/LoadingScreen"
import ResultsScreen from "./screens/ResultsScreen"
import SavedPlansScreen from "./screens/SavedPlansScreen"
import SettingsScreen from "./screens/SettingsScreen"

// Create stack navigator for the create flow
const CreateStack = createStackNavigator<RootStackParamList>()

function CreateStackScreen() {
  return (
    <CreateStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <CreateStack.Screen name="GroceryList" component={GroceryListScreen} options={{ title: "Your Groceries",
        headerStyle: {
      backgroundColor: COLORS.secondary, elevation: 0,// or any color you want
      },
       }} />
      <CreateStack.Screen name="CalorieInput" component={CalorieInputScreen} options={{ title: "Set Your Goals", headerStyle: {
      backgroundColor: COLORS.secondary, elevation: 0,// or any color you want
      }, }} />
      <CreateStack.Screen
        name="Loading"
        component={LoadingScreen}
        options={{ headerShown: false, title: "Creating Plan" }}
      />
      <CreateStack.Screen name="Results" component={ResultsScreen} options={{ title: "Your Meal Plan" , headerStyle: {
      backgroundColor: COLORS.secondary, elevation: 0,// or any color you want
      }, }} />
    </CreateStack.Navigator>
  )
}

// Create bottom tab navigator
const Tab = createBottomTabNavigator<RootStackParamList>()

export default function App() {
  return (
    <SafeAreaProvider>
      <MealPlanProvider>
        <NavigationContainer>
          <StatusBar style="dark" backgroundColor={COLORS.background} />
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName: keyof typeof Feather.glyphMap = "home"

                if (route.name === "Home") {
                  iconName = "home"
                } else if (route.name === "Create") {
                  iconName = "plus-circle"
                } else if (route.name === "SavedPlans") {
                  iconName = "list"
                } else if (route.name === "Settings") {
                  iconName = "settings"
                } else if (route.name === "MealPlan") {
                  iconName = "calendar"
                }

                return <Feather name={iconName} size={size} color={color} />
              },
              tabBarActiveTintColor: COLORS.primary,
              tabBarInactiveTintColor: COLORS.textLight,
              tabBarStyle: {
                backgroundColor: COLORS.background,
                borderTopWidth: 0,
                elevation: 10,
                shadowColor: COLORS.shadow,
              },
              headerStyle: {
                backgroundColor: COLORS.secondary,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              },
              headerTintColor: COLORS.text,
              headerTitleStyle: {
                fontWeight: "bold",
              },
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: "FitFood" }} />
            <Tab.Screen name="Create" component={CreateStackScreen} options={{ headerShown: false, title: "Create" }} />
            <Tab.Screen name="SavedPlans" component={SavedPlansScreen} options={{ title: "Saved Plans" }} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: "Settings" }} />
            <Tab.Screen name="MealPlan" component={ResultsScreen} options={{ title: "Your Meal Plan" }} />
          </Tab.Navigator>
        </NavigationContainer>
      </MealPlanProvider>
    </SafeAreaProvider>
  )
}
