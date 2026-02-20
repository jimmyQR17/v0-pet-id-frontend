"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as GoogleSignIn from "expo-auth-session/providers/google"
import * as WebBrowser from "expo-web-browser"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

WebBrowser.maybeCompleteAuthSession()

const COLORS = {
  primary: "#145DA0",
  secondary: "#16A085",
  accent: "#FF9F43",
  white: "#FFFFFF",
  light: "#F5F5F5",
  dark: "#333333",
}

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false)
  const [request, response, promptAsync] = GoogleSignIn.useAuthRequest({
    clientId: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
    iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
    androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
  })

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      const result = await promptAsync()
      if (result?.type === "success") {
        const { authentication } = result
        const userInfo = {
          token: authentication.accessToken,
          email: "usuario@gmail.com",
          name: "Usuario",
          isNewUser: Math.random() > 0.5,
        }

        await AsyncStorage.setItem("userToken", authentication.accessToken)
        await AsyncStorage.setItem("userData", JSON.stringify(userInfo))
        setLoading(false)
        navigation.replace("MainTabs")
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo completar el inicio de sesión")
      setLoading(false)
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="paw" size={80} color={COLORS.primary} />
        <Text style={styles.title}>PetID</Text>
        <Text style={styles.subtitle}>Tu identificación digital para mascotas</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.mainText}>Conecta con tu mascota, mantente conectado con tu veterinario</Text>

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <>
              <MaterialCommunityIcons name="google" size={24} color={COLORS.white} />
              <Text style={styles.googleButtonText}>Continuar con Google</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.features}>
          <View style={styles.feature}>
            <MaterialCommunityIcons name="check-circle" size={24} color={COLORS.secondary} />
            <Text style={styles.featureText}>Collar Digital NFC/QR</Text>
          </View>
          <View style={styles.feature}>
            <MaterialCommunityIcons name="calendar-check" size={24} color={COLORS.secondary} />
            <Text style={styles.featureText}>Calendario de Citas</Text>
          </View>
          <View style={styles.feature}>
            <MaterialCommunityIcons name="hospital-box" size={24} color={COLORS.secondary} />
            <Text style={styles.featureText}>Historial Médico</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingVertical: 60,
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: COLORS.white,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 14,
    color: "#B0D4E3",
    marginTop: 8,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  mainText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.dark,
    marginBottom: 30,
    textAlign: "center",
  },
  googleButton: {
    backgroundColor: "#DB4437",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  googleButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
  },
  features: {
    marginTop: 40,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  featureText: {
    fontSize: 14,
    color: COLORS.dark,
    marginLeft: 12,
    fontWeight: "500",
  },
})
