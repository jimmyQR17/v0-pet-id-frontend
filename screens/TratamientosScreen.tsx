"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
  Alert,
  Switch,
} from "react-native"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import AsyncStorage from "@react-native-async-storage/async-storage"

const COLORS = {
  primary: "#145DA0",
  secondary: "#16A085",
  accent: "#FF9F43",
  white: "#FFFFFF",
  light: "#F5F5F5",
  dark: "#333333",
}

export default function TratamientosScreen({ route }) {
  const { mascota } = route.params
  const [tratamientos, setTratamientos] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [newTratamiento, setNewTratamiento] = useState({
    nombre: "",
    dosis: "",
    frecuencia: "",
    duracion: "",
    razon: "",
    activo: true,
  })

  useEffect(() => {
    loadTratamientos()
  }, [])

  const loadTratamientos = async () => {
    try {
      const stored = await AsyncStorage.getItem(`tratamientos-${mascota.IdMascota}`)
      if (stored) {
        setTratamientos(JSON.parse(stored))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddTratamiento = async () => {
    if (!newTratamiento.nombre.trim() || !newTratamiento.dosis.trim()) {
      Alert.alert("Error", "Por favor completa los campos obligatorios")
      return
    }

    const tratamiento = {
      id: tratamientos.length + 1,
      ...newTratamiento,
      fecha: new Date().toLocaleDateString(),
    }

    const updated = [...tratamientos, tratamiento]
    setTratamientos(updated)
    await AsyncStorage.setItem(`tratamientos-${mascota.IdMascota}`, JSON.stringify(updated))

    setNewTratamiento({
      nombre: "",
      dosis: "",
      frecuencia: "",
      duracion: "",
      razon: "",
      activo: true,
    })
    setModalVisible(false)
    Alert.alert("Éxito", "Tratamiento registrado correctamente")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tratamientos de {mascota.Nombre}</Text>
          <Text style={styles.headerSubtitle}>Medicamentos y atenciones médicas</Text>
        </View>

        <View style={styles.content}>
          {tratamientos.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons name="pill" size={48} color={COLORS.light} />
              <Text style={styles.emptyText}>No hay tratamientos registrados</Text>
            </View>
          ) : (
            tratamientos.map((tratamiento) => (
              <View key={tratamiento.id} style={styles.tratamientoCard}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.tratamientoNombre}>{tratamiento.nombre}</Text>
                    <Text style={styles.tratamientoFecha}>{tratamiento.fecha}</Text>
                  </View>
                  <View style={[styles.estadoBadge, tratamiento.activo ? styles.estadoActivo : styles.estadoInactivo]}>
                    <Text style={styles.estadoText}>{tratamiento.activo ? "Activo" : "Finalizado"}</Text>
                  </View>
                </View>

                <View style={styles.cardContent}>
                  <View style={styles.detalle}>
                    <Text style={styles.detalleLabel}>Dosis:</Text>
                    <Text style={styles.detalleValue}>{tratamiento.dosis}</Text>
                  </View>
                  <View style={styles.detalle}>
                    <Text style={styles.detalleLabel}>Frecuencia:</Text>
                    <Text style={styles.detalleValue}>{tratamiento.frecuencia}</Text>
                  </View>
                  <View style={styles.detalle}>
                    <Text style={styles.detalleLabel}>Duración:</Text>
                    <Text style={styles.detalleValue}>{tratamiento.duracion}</Text>
                  </View>
                  {tratamiento.razon && (
                    <View style={styles.detalle}>
                      <Text style={styles.detalleLabel}>Razón:</Text>
                      <Text style={styles.detalleValue}>{tratamiento.razon}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))
          )}
        </View>

        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons name="plus" size={24} color={COLORS.white} />
          <Text style={styles.addButtonText}>Agregar Tratamiento</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nuevo Tratamiento</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialCommunityIcons name="close" size={24} color={COLORS.dark} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalForm}>
              <Text style={styles.label}>Nombre del Medicamento *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: Amoxicilina"
                value={newTratamiento.nombre}
                onChangeText={(text) => setNewTratamiento({ ...newTratamiento, nombre: text })}
              />

              <Text style={styles.label}>Dosis *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: 500mg"
                value={newTratamiento.dosis}
                onChangeText={(text) => setNewTratamiento({ ...newTratamiento, dosis: text })}
              />

              <Text style={styles.label}>Frecuencia</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: 2 veces al día"
                value={newTratamiento.frecuencia}
                onChangeText={(text) => setNewTratamiento({ ...newTratamiento, frecuencia: text })}
              />

              <Text style={styles.label}>Duración</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: 10 días"
                value={newTratamiento.duracion}
                onChangeText={(text) => setNewTratamiento({ ...newTratamiento, duracion: text })}
              />

              <Text style={styles.label}>Razón/Diagnóstico</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe el motivo del tratamiento"
                multiline
                numberOfLines={3}
                value={newTratamiento.razon}
                onChangeText={(text) => setNewTratamiento({ ...newTratamiento, razon: text })}
              />

              <View style={styles.switchRow}>
                <Text style={styles.label}>Tratamiento activo</Text>
                <Switch
                  value={newTratamiento.activo}
                  onValueChange={(value) => setNewTratamiento({ ...newTratamiento, activo: value })}
                  trackColor={{ false: "#E0E0E0", true: COLORS.secondary }}
                />
              </View>
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonTextCancel}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonConfirm]} onPress={handleAddTratamiento}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#B0D4E3",
    marginTop: 4,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
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
  tratamientoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftColor: COLORS.secondary,
    borderLeftWidth: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  tratamientoNombre: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.dark,
  },
  tratamientoFecha: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  estadoBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  estadoActivo: {
    backgroundColor: "#E8F5E9",
  },
  estadoInactivo: {
    backgroundColor: "#FFEBEE",
  },
  estadoText: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.secondary,
  },
  cardContent: {
    marginTop: 8,
  },
  detalle: {
    flexDirection: "row",
    marginBottom: 6,
  },
  detalleLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
    width: 80,
  },
  detalleValue: {
    fontSize: 12,
    color: COLORS.dark,
    flex: 1,
  },
  addButton: {
    backgroundColor: COLORS.secondary,
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 16,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.dark,
  },
  modalForm: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.dark,
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopColor: "#E0E0E0",
    borderTopWidth: 1,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  buttonCancel: {
    backgroundColor: "#E0E0E0",
  },
  buttonConfirm: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "600",
    textAlign: "center",
  },
  buttonTextCancel: {
    color: COLORS.dark,
    fontWeight: "600",
    textAlign: "center",
  },
})
