"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Modal,
  Alert,
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

export default function CalendarioScreen() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [eventos, setEventos] = useState([
    {
      id: 1,
      date: new Date(2025, 10, 24),
      title: "Cita con Dr. García",
      time: "10:00 AM",
      mascota: "Max",
    },
  ])
  const [modalVisible, setModalVisible] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: new Date(),
    time: "10:00 AM",
    mascota: "",
  })

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const handleAddEvent = async () => {
    if (!newEvent.title.trim() || !newEvent.mascota.trim()) {
      Alert.alert("Error", "Por favor completa todos los campos")
      return
    }

    const event = {
      id: eventos.length + 1,
      date: newEvent.date,
      title: newEvent.title,
      time: newEvent.time,
      mascota: newEvent.mascota,
    }

    const updatedEventos = [...eventos, event]
    setEventos(updatedEventos)
    await AsyncStorage.setItem("eventos", JSON.stringify(updatedEventos))

    setNewEvent({ title: "", date: new Date(), time: "10:00 AM", mascota: "" })
    setModalVisible(false)
    Alert.alert("Éxito", "Cita agregada correctamente")
  }

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.emptyDay} />)
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
      const dayEventos = eventos.filter(
        (e) =>
          e.date.getDate() === i &&
          e.date.getMonth() === currentDate.getMonth() &&
          e.date.getFullYear() === currentDate.getFullYear(),
      )

      days.push(
        <View key={i} style={styles.dayContainer}>
          <Text style={styles.dayNumber}>{i}</Text>
          {dayEventos.map((evento) => (
            <Text key={evento.id} style={styles.eventTitle} numberOfLines={1}>
              {evento.title}
            </Text>
          ))}
        </View>,
      )
    }

    return days
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Calendario de Citas</Text>
        </View>

        <View style={styles.calendarHeader}>
          <TouchableOpacity
            onPress={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
          >
            <MaterialCommunityIcons name="chevron-left" size={28} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.monthYear}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Text>
          <TouchableOpacity
            onPress={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
          >
            <MaterialCommunityIcons name="chevron-right" size={28} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.weekDays}>
          {["D", "L", "M", "X", "J", "V", "S"].map((day) => (
            <Text key={day} style={styles.weekDayText}>
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.calendar}>{renderCalendar()}</View>

        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons name="plus" size={24} color={COLORS.white} />
          <Text style={styles.addButtonText}>Agregar Cita</Text>
        </TouchableOpacity>

        <View style={styles.eventsList}>
          <Text style={styles.eventsTitle}>Próximas Citas</Text>
          {eventos.slice(0, 3).map((evento) => (
            <View key={evento.id} style={styles.eventCard}>
              <MaterialCommunityIcons name="calendar-check" size={20} color={COLORS.secondary} />
              <View style={styles.eventInfo}>
                <Text style={styles.eventName}>{evento.title}</Text>
                <Text style={styles.eventDetail}>
                  {evento.mascota} - {evento.time}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agregar Cita</Text>

            <TextInput
              style={styles.input}
              placeholder="Título de la cita"
              value={newEvent.title}
              onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="Nombre de la mascota"
              value={newEvent.mascota}
              onChangeText={(text) => setNewEvent({ ...newEvent, mascota: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="Hora (ej: 10:00 AM)"
              value={newEvent.time}
              onChangeText={(text) => setNewEvent({ ...newEvent, time: text })}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonTextCancel}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonConfirm]} onPress={handleAddEvent}>
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
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  monthYear: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.dark,
  },
  weekDays: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
  },
  weekDayText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
    color: COLORS.primary,
  },
  calendar: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  dayContainer: {
    width: "14.28%",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    padding: 4,
    minHeight: 80,
  },
  emptyDay: {
    width: "14.28%",
    minHeight: 80,
  },
  dayNumber: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.dark,
    marginBottom: 2,
  },
  eventTitle: {
    fontSize: 9,
    color: COLORS.secondary,
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 2,
    borderRadius: 2,
    marginTop: 1,
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
  eventsList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  eventsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 12,
  },
  eventCard: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    marginBottom: 8,
  },
  eventInfo: {
    marginLeft: 12,
    flex: 1,
  },
  eventName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.dark,
  },
  eventDetail: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
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
    padding: 20,
    paddingBottom: 30,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 16,
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
  modalButtons: {
    flexDirection: "row",
    marginTop: 16,
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
