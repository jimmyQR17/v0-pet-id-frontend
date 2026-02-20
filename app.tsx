"use client"

import { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { ActivityIndicator, View } from "react-native"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import AsyncStorage from "@react-native-async-storage/async-storage"

import LoginScreen from "./screens/LoginScreen"
import MascotasScreen from "./screens/MascotasScreen"
import MascotaDetailScreen from "./screens/MascotaDetailScreen"
import CalendarioScreen from "./screens/CalendarioScreen"
import AgregarMascotaScreen from "./screens/AgregarMascotaScreen"
import PerfilScreen from "./screens/PerfilScreen"
import TratamientosScreen from "./screens/TratamientosScreen"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const COLORS = {
  primary: "#145DA0",
  secondary: "#16A085",
  accent: "#FF9F43",
  white: "#FFFFFF",
  light: "#F5F5F5",
  dark: "#333333",
}

function MascotasTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName
          if (route.name === "MascotasList") {
            iconName = focused ? "paw" : "paw-outline"
          } else if (route.name === "Calendario") {
            iconName = focused ? "calendar" : "calendar-outline"
          } else if (route.name === "AgregarMascota") {
            iconName = focused ? "plus-circle" : "plus-circle-outline"
          } else if (route.name === "Perfil") {
            iconName = focused ? "account" : "account-outline"
          }
          return <MaterialCommunityIcons name={iconName} size={24} color={color} />
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "#999999",
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: "#E0E0E0",
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen name="MascotasList" component={MascotasScreen} options={{ title: "Mis Mascotas" }} />
      <Tab.Screen name="Calendario" component={CalendarioScreen} options={{ title: "Calendario" }} />
      <Tab.Screen name="AgregarMascota" component={AgregarMascotaScreen} options={{ title: "Agregar" }} />
      <Tab.Screen name="Perfil" component={PerfilScreen} options={{ title: "Mi Perfil" }} />
    </Tab.Navigator>
  )
}

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken")
        setIsSignedIn(!!userToken)
      } catch (e) {
        console.error(e)
      }
      setIsLoading(false)
    }
    bootstrapAsync()
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.primary }}>
        <ActivityIndicator size="large" color={COLORS.white} />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isSignedIn ? (
          <>
            <Stack.Screen name="MainTabs" component={MascotasTabNavigator} />
            <Stack.Screen
              name="MascotaDetail"
              component={MascotaDetailScreen}
              options={{ headerShown: true, title: "Detalle Mascota" }}
            />
            <Stack.Screen
              name="Tratamientos"
              component={TratamientosScreen}
              options={{ headerShown: true, title: "Tratamientos" }}
            />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ animationEnabled: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export const COLORS_EXPORT = COLORS
