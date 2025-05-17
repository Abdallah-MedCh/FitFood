import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import { COLORS, SIZES, FONTS } from "../constants/theme"

export default function SettingsScreen() {
  return (
    <View style={styles.backgroundLayer}>
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.settingItem}>
            <Feather name="user" size={20} color={COLORS.green} />
            <Text style={styles.settingText}>Profile</Text>
            <Feather name="chevron-right" size={20} color={COLORS.green} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Feather name="bell" size={20} color={COLORS.green} />
            <Text style={styles.settingText}>Notifications</Text>
            <Feather name="chevron-right" size={20} color={COLORS.green} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <TouchableOpacity style={styles.settingItem}>
            <Feather name="sliders" size={20} color={COLORS.green} />
            <Text style={styles.settingText}>Dietary Preferences</Text>
            <Feather name="chevron-right" size={20} color={COLORS.green} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Feather name="activity" size={20} color={COLORS.green} />
            <Text style={styles.settingText}>Calorie Goals</Text>
            <Feather name="chevron-right" size={20} color={COLORS.green} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App</Text>
          <TouchableOpacity style={styles.settingItem}>
            <Feather name="info" size={20} color={COLORS.green} />
            <Text style={styles.settingText}>About</Text>
            <Feather name="chevron-right" size={20} color={COLORS.green} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Feather name="help-circle" size={20} color={COLORS.green} />
            <Text style={styles.settingText}>Help & Support</Text>
            <Feather name="chevron-right" size={20} color={COLORS.green} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Feather name="log-out" size={20} color={COLORS.error} />
            <Text style={[styles.settingText, { color: COLORS.error }]}>Log Out</Text>
          </TouchableOpacity>
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
  section: {
    marginBottom: SIZES.padding,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginHorizontal: SIZES.padding,
    marginTop: SIZES.padding,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: SIZES.medium,
    color: COLORS.green,
    marginBottom: SIZES.padding,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  settingText: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.green,
    flex: 1,
    marginLeft: SIZES.padding,
  },
})
