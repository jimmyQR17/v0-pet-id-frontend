# PetID - Aplicación Móvil

Aplicación React Native con Expo para gestionar la información de tus mascotas, citas veterinarias, tratamientos médicos y collar digital NFC/QR.

## Instalación

### Requisitos previos
- Node.js (v16 o superior)
- npm o yarn
- Expo CLI instalado globalmente: `npm install -g expo-cli`

### Pasos de instalación

1. Clona o descarga el proyecto
2. Instala las dependencias:
\`\`\`bash
npm install
# o
yarn install
\`\`\`

## Ejecución

### En Expo Go (más rápido)
\`\`\`bash
npm start
# o
yarn start
\`\`\`
Escanea el código QR con Expo Go (disponible en App Store y Google Play)

### En Android
\`\`\`bash
npm run android
\`\`\`

### En iOS
\`\`\`bash
npm run ios
\`\`\`

### En Web
\`\`\`bash
npm run web
\`\`\`

## Características

- Autenticación con Google
- Gestión de mascotas (CRUD completo)
- Calendario de citas veterinarias
- Registro de tratamientos médicos
- Collar digital NFC/QR
- Historial médico de mascotas
- Perfil del dueño
- Datos persistentes con AsyncStorage

## Estructura de carpetas

\`\`\`
├── App.tsx                 # Archivo principal
├── screens/                # Pantallas de la app
│   ├── LoginScreen.tsx
│   ├── MascotasScreen.tsx
│   ├── MascotaDetailScreen.tsx
│   ├── CalendarioScreen.tsx
│   ├── AgregarMascotaScreen.tsx
│   ├── TratamientosScreen.tsx
│   ├── CollarScreen.tsx
│   └── PerfilScreen.tsx
├── constants/              # Constantes globales
│   └── colors.ts
├── types/                  # Tipos TypeScript
│   └── index.ts
├── assets/                 # Imágenes y recursos
├── app.json                # Configuración de Expo
├── app.tsx                 # Configuración de navegación
└── package.json
\`\`\`

## Conexión con API .NET

Para conectar la app con tu API .NET, actualiza la URL base en las pantallas:

\`\`\`typescript
const API_BASE_URL = 'https://tu-api.com/api';
\`\`\`

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

\`\`\`
EXPO_PUBLIC_API_URL=https://tu-api.com/api
EXPO_PUBLIC_GOOGLE_CLIENT_ID=tu-client-id
\`\`\`

## Autenticación con Google

Para configurar autenticación con Google:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto
3. Habilita Google Sign-In API
4. Crea credenciales OAuth 2.0
5. Reemplaza los IDs en `LoginScreen.tsx`

## Licencia

MIT
