"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Image, Alert } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

const COLORS = {
  primary: "#145DA0",
  secondary: "#16A085",
  accent: "#FF9F43",
  white: "#FFFFFF",
  light: "#F5F5F5",
  dark: "#333333",
}

export default function MascotasScreen({ navigation }) {
  const [mascotas, setMascotas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMascotas()
  }, [])

  const loadMascotas = async () => {
    try {
      const storedMascotas = await AsyncStorage.getItem("mascotas")
      if (storedMascotas) {
        setMascotas(JSON.parse(storedMascotas))
      } else {
        // Datos de ejemplo
        const defaultMascotas = [
          {
            IdMascota: 1,
            Nombre: "Max",
            IdEspecie: 1,
            Sexo: "M",
            EdadAproxMeses: 36,
            PesoKg: 25,
            FotoUrl: "https://via.placeholder.com/150?text=Max",
            Castrado: true,
            IdRaza: 1,
          },
          {
            IdMascota: 2,
            Nombre: "Luna",
            IdEspecie: 2,
            Sexo: "H",
            EdadAproxMeses: 24,
            PesoKg: 4,
            FotoUrl: "https://via.placeholder.com/150?text=Luna",
            Castrado: false,
            IdRaza: 2,
          },
        ]
        setMascotas(defaultMascotas)
        await AsyncStorage.setItem("mascotas", JSON.stringify(defaultMascotas))
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las mascotas")
    } finally {
      setLoading(false)
    }
  }

  const renderMascota = ({ item }) => (
    <TouchableOpacity
      style={styles.mascotaCard}
      onPress={() => navigation.navigate("MascotaDetail", { mascota: item })}
    >
      <Image source={{ uri: item.FotoUrl }} style={styles.mascotaImage} />
      <View style={styles.mascotaInfo}>
        <Text style={styles.mascotaNombre}>{item.Nombre}</Text>
        <Text style={styles.mascotaSpecie}>
          {item.IdEspecie === 1 ? "Perro" : "Gato"} - {item.Sexo === "M" ? "Macho" : "Hembra"}
        </Text>
        <View style={styles.mascotaDetalles}>
          <Text style={styles.mascotaDetalle}>{item.EdadAproxMeses} meses</Text>
          <Text style={styles.mascotaDetalle}>{item.PesoKg} kg</Text>
        </View>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.primary} />
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Mascotas</Text>
        <Text style={styles.headerSubtitle}>{mascotas.length} mascotas registradas</Text>
      </View>
      <FlatList
        data={mascotas}
        renderItem={renderMascota}
        keyExtractor={(item) => item.IdMascota.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="paw" size={48} color={COLORS.light} />
            <Text style={styles.emptyText}>No tienes mascotas registradas</Text>
          </View>
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#B0D4E3",
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  mascotaCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mascotaImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  mascotaInfo: {
    flex: 1,
  },
  mascotaNombre: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.dark,
  },
  mascotaSpecie: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  mascotaDetalles: {
    flexDirection: "row",
    marginTop: 8,
  },
  mascotaDetalle: {
    fontSize: 12,
    color: COLORS.primary,
    marginRight: 12,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 12,
  },
})
