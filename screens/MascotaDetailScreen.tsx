"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from "react-native"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

const COLORS = {
  primary: "#145DA0",
  secondary: "#16A085",
  accent: "#FF9F43",
  white: "#FFFFFF",
  light: "#F5F5F5",
  dark: "#333333",
}

export default function MascotaDetailScreen({ route, navigation }) {
  const { mascota } = route.params
  const [activeTab, setActiveTab] = useState("info")

  const handleViewCollar = () => {
    navigation.navigate("Collar", { mascota })
  }

  const handleViewTratamientos = () => {
    navigation.navigate("Tratamientos", { mascota })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header con foto */}
        <View style={styles.header}>
          <Image source={{ uri: mascota.FotoUrl }} style={styles.mascotaImage} />
          <View style={styles.headerInfo}>
            <Text style={styles.mascotaNombre}>{mascota.Nombre}</Text>
            <Text style={styles.mascotaSpecie}>{mascota.IdEspecie === 1 ? "🐕 Perro" : "🐱 Gato"}</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "info" && styles.tabActive]}
            onPress={() => setActiveTab("info")}
          >
            <Text style={[styles.tabText, activeTab === "info" && styles.tabTextActive]}>Información</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "historial" && styles.tabActive]}
            onPress={() => setActiveTab("historial")}
          >
            <Text style={[styles.tabText, activeTab === "historial" && styles.tabTextActive]}>Historial</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "collar" && styles.tabActive]}
            onPress={() => setActiveTab("collar")}
          >
            <Text style={[styles.tabText, activeTab === "collar" && styles.tabTextActive]}>Collar</Text>
          </TouchableOpacity>
        </View>

        {/* Tab content */}
        {activeTab === "info" && (
          <View style={styles.tabContent}>
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Información General</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Edad:</Text>
                <Text style={styles.infoValue}>{mascota.EdadAproxMeses} meses</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Peso:</Text>
                <Text style={styles.infoValue}>{mascota.PesoKg} kg</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Sexo:</Text>
                <Text style={styles.infoValue}>{mascota.Sexo === "M" ? "Macho" : "Hembra"}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Castrado:</Text>
                <Text style={styles.infoValue}>{mascota.Castrado ? "Sí" : "No"}</Text>
              </View>
            </View>
          </View>
        )}

        {activeTab === "historial" && (
          <View style={styles.tabContent}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Historial Médico</Text>
              <View style={styles.historialCard}>
                <View style={styles.historialHeader}>
                  <MaterialCommunityIcons name="hospital-box" size={24} color={COLORS.secondary} />
                  <Text style={styles.historialTitle}>Última consulta</Text>
                </View>
                <Text style={styles.historialDate}>Hace 2 semanas</Text>
                <Text style={styles.historialDesc}>Vacunación antirrábica</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleViewTratamientos}>
              <MaterialCommunityIcons name="pill" size={20} color={COLORS.white} />
              <Text style={styles.buttonText}>Ver Tratamientos</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === "collar" && (
          <View style={styles.tabContent}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Collar Digital</Text>
              <View style={styles.collarCard}>
                <MaterialCommunityIcons name="nfc" size={48} color={COLORS.primary} />
                <Text style={styles.collarText}>Código NFC/QR</Text>
                <Text style={styles.collarCode}>PET-{mascota.IdMascota}-001</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleViewCollar}>
              <MaterialCommunityIcons name="qrcode" size={20} color={COLORS.white} />
              <Text style={styles.buttonText}>Ver Collar Digital</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  mascotaImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  headerInfo: {
    alignItems: "center",
  },
  mascotaNombre: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.white,
  },
  mascotaSpecie: {
    fontSize: 14,
    color: "#B0D4E3",
    marginTop: 4,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
  },
  tabTextActive: {
    color: COLORS.primary,
  },
  tabContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 12,
  },
  infoSection: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomColor: "#F0F0F0",
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "bold",
  },
  historialCard: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  historialHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  historialTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.dark,
    marginLeft: 8,
  },
  historialDate: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  historialDesc: {
    fontSize: 13,
    color: COLORS.dark,
  },
  collarCard: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
  },
  collarText: {
    fontSize: 14,
    color: "#666",
    marginTop: 12,
  },
  collarCode: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
    marginTop: 8,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
})
