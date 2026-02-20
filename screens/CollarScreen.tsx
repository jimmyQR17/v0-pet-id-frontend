import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Share } from "react-native"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

const COLORS = {
  primary: "#145DA0",
  secondary: "#16A085",
  accent: "#FF9F43",
  white: "#FFFFFF",
  light: "#F5F5F5",
  dark: "#333333",
}

export default function CollarScreen({ route }) {
  const { mascota } = route.params

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Mi mascota ${mascota.Nombre} se ha perdido. Si la ves, por favor escanea el código QR en su collar: PET-${mascota.IdMascota}-001`,
        url: `https://petid.app/mascota/${mascota.IdMascota}`,
        title: `Mascota perdida: ${mascota.Nombre}`,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Collar Digital de {mascota.Nombre}</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.collarCard}>
            <View style={styles.nfcSection}>
              <MaterialCommunityIcons name="nfc" size={80} color={COLORS.primary} />
              <Text style={styles.nfcLabel}>Código NFC</Text>
            </View>

            <View style={styles.codeSection}>
              <Text style={styles.codeLabel}>Código Único</Text>
              <Text style={styles.code}>PET-{mascota.IdMascota}-001</Text>
            </View>

            <View style={styles.qrSection}>
              <View style={styles.qrBox}>
                <MaterialCommunityIcons name="qrcode" size={120} color={COLORS.primary} />
              </View>
              <Text style={styles.qrLabel}>Código QR</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Información del Collar</Text>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="information" size={20} color={COLORS.secondary} />
              <Text style={styles.infoText}>
                Este collar digital contiene toda la información de tu mascota y de contacto.
              </Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="shield-check" size={20} color={COLORS.secondary} />
              <Text style={styles.infoText}>
                Cuando alguien escanee el código, verá información de tu mascota y podrá contactarte.
              </Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="alert" size={20} color={COLORS.accent} />
              <Text style={styles.infoText}>Puedes marcar tu mascota como perdida para alertar a otros usuarios.</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.button}>
            <MaterialCommunityIcons name="printer" size={20} color={COLORS.white} />
            <Text style={styles.buttonText}>Imprimir Collar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.buttonSecondary]}>
            <MaterialCommunityIcons name="alert-circle" size={20} color={COLORS.white} />
            <Text style={styles.buttonText}>Marcar como Perdida</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.buttonTertiary]} onPress={handleShare}>
            <MaterialCommunityIcons name="share-variant" size={20} color={COLORS.white} />
            <Text style={styles.buttonText}>Compartir</Text>
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
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  collarCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nfcSection: {
    alignItems: "center",
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomColor: "#F0F0F0",
    borderBottomWidth: 1,
    width: "100%",
  },
  nfcLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.dark,
    marginTop: 12,
  },
  codeSection: {
    alignItems: "center",
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomColor: "#F0F0F0",
    borderBottomWidth: 1,
    width: "100%",
  },
  codeLabel: {
    fontSize: 12,
    color: "#999",
    fontWeight: "600",
    marginBottom: 8,
  },
  code: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    letterSpacing: 2,
  },
  qrSection: {
    alignItems: "center",
  },
  qrBox: {
    backgroundColor: COLORS.light,
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
  },
  qrLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.dark,
  },
  infoSection: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 13,
    color: "#666",
    flex: 1,
    lineHeight: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  buttonSecondary: {
    backgroundColor: COLORS.accent,
  },
  buttonTertiary: {
    backgroundColor: COLORS.secondary,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
})
