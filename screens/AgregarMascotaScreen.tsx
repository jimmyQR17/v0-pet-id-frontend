"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
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

export default function AgregarMascotaScreen() {
  const [formData, setFormData] = useState({
    Nombre: "",
    IdEspecie: 1,
    Sexo: "M",
    EdadAproxMeses: "",
    PesoKg: "",
    Castrado: false,
    Alergias: "",
    CondicionesCronicas: "",
  })

  const handleAddMascota = async () => {
    if (!formData.Nombre.trim() || !formData.EdadAproxMeses || !formData.PesoKg) {
      Alert.alert("Error", "Por favor completa todos los campos obligatorios")
      return
    }

    try {
      const mascotas = await AsyncStorage.getItem("mascotas")
      const existingMascotas = mascotas ? JSON.parse(mascotas) : []

      const newMascota = {
        IdMascota: existingMascotas.length + 1,
        IdEstado: 1,
        IdDueno: 1,
        IdColor: 1,
        IdTalla: 1,
        IdRaza: 1,
        CodigoInterno: `PET-${Date.now()}`,
        CodigoMicrochip: "",
        FotoUrl: "https://via.placeholder.com/150?text=" + formData.Nombre,
        FechaNacimiento: new Date(),
        RowVersion: 1,
        ...formData,
      }

      existingMascotas.push(newMascota)
      await AsyncStorage.setItem("mascotas", JSON.stringify(existingMascotas))

      Alert.alert("Éxito", "Mascota agregada correctamente")
      setFormData({
        Nombre: "",
        IdEspecie: 1,
        Sexo: "M",
        EdadAproxMeses: "",
        PesoKg: "",
        Castrado: false,
        Alergias: "",
        CondicionesCronicas: "",
      })
    } catch (error) {
      Alert.alert("Error", "No se pudo agregar la mascota")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Agregar Mascota</Text>
          <Text style={styles.headerSubtitle}>Registra a tu nueva mascota</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Información Básica</Text>

            <Text style={styles.label}>Nombre *</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre de la mascota"
              value={formData.Nombre}
              onChangeText={(text) => setFormData({ ...formData, Nombre: text })}
            />

            <Text style={styles.label}>Especie</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.optionButton, formData.IdEspecie === 1 && styles.optionButtonActive]}
                onPress={() => setFormData({ ...formData, IdEspecie: 1 })}
              >
                <Text style={[styles.optionButtonText, formData.IdEspecie === 1 && styles.optionButtonTextActive]}>
                  🐕 Perro
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionButton, formData.IdEspecie === 2 && styles.optionButtonActive]}
                onPress={() => setFormData({ ...formData, IdEspecie: 2 })}
              >
                <Text style={[styles.optionButtonText, formData.IdEspecie === 2 && styles.optionButtonTextActive]}>
                  🐱 Gato
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Sexo</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.optionButton, formData.Sexo === "M" && styles.optionButtonActive]}
                onPress={() => setFormData({ ...formData, Sexo: "M" })}
              >
                <Text style={[styles.optionButtonText, formData.Sexo === "M" && styles.optionButtonTextActive]}>
                  Macho
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionButton, formData.Sexo === "H" && styles.optionButtonActive]}
                onPress={() => setFormData({ ...formData, Sexo: "H" })}
              >
                <Text style={[styles.optionButtonText, formData.Sexo === "H" && styles.optionButtonTextActive]}>
                  Hembra
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Medidas</Text>

            <Text style={styles.label}>Edad Aproximada (meses) *</Text>
            <TextInput
              style={styles.input}
              placeholder="Edad en meses"
              keyboardType="numeric"
              value={formData.EdadAproxMeses}
              onChangeText={(text) => setFormData({ ...formData, EdadAproxMeses: text })}
            />

            <Text style={styles.label}>Peso (kg) *</Text>
            <TextInput
              style={styles.input}
              placeholder="Peso en kg"
              keyboardType="decimal-pad"
              value={formData.PesoKg}
              onChangeText={(text) => setFormData({ ...formData, PesoKg: text })}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Salud</Text>

            <View style={styles.switchRow}>
              <Text style={styles.label}>Castrado/Esterilizado</Text>
              <Switch
                value={formData.Castrado}
                onValueChange={(value) => setFormData({ ...formData, Castrado: value })}
                trackColor={{ false: "#E0E0E0", true: COLORS.secondary }}
              />
            </View>

            <Text style={styles.label}>Alergias</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe las alergias conocidas"
              multiline
              numberOfLines={3}
              value={formData.Alergias}
              onChangeText={(text) => setFormData({ ...formData, Alergias: text })}
            />

            <Text style={styles.label}>Condiciones Crónicas</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe las condiciones crónicas"
              multiline
              numberOfLines={3}
              value={formData.CondicionesCronicas}
              onChangeText={(text) => setFormData({ ...formData, CondicionesCronicas: text })}
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleAddMascota}>
            <MaterialCommunityIcons name="check" size={20} color={COLORS.white} />
            <Text style={styles.submitButtonText}>Guardar Mascota</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 16,
    paddingVertical: 20,
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
  form: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.dark,
    marginBottom: 8,
  },
  input: {
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  buttonGroup: {
    flexDirection: "row",
    marginBottom: 12,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    marginRight: 8,
    alignItems: "center",
  },
  optionButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
  },
  optionButtonTextActive: {
    color: COLORS.white,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 14,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
})
