export interface Mascota {
  IdMascota: number
  IdEstado: number
  IdDueno: number
  IdEspecie: number
  IdRaza: number
  CodigoInterno: string
  CodigoMicrochip: string
  Nombre: string
  Sexo: "M" | "H"
  FechaNacimiento: Date
  EdadAproxMeses: number
  IdColor: number
  IdTalla: number
  PesoKg: number
  FotoUrl: string
  Castrado: boolean
  Alergias?: string
  CondicionesCronicas?: string
  FechaDefuncion?: Date
  CausaDefuncion?: string
  Notas?: string
  FC: Date
  FM: Date
  FA: Date
  UC: string
  UM: string
  UA: string
  RowVersion: number
}

export interface Dueno {
  IdDueno: number
  IdEstado: number
  Nombres: string
  Apellidos: string
  TipoDocumento: string
  Documento: string
  Genero: "M" | "H"
  FechaNacimiento: Date
  Email: string
  AceptaComunicaciones: boolean
  AceptaTerminos: boolean
  FechaAceptaTerminos: Date
  FC: Date
  FM: Date
  FA: Date
  UC: string
  UM: string
  UA: string
  RowVersion: number
}

export interface Evento {
  id: number
  date: Date
  title: string
  time: string
  mascota: string
}

export interface Tratamiento {
  id: number
  nombre: string
  dosis: string
  frecuencia: string
  duracion: string
  razon: string
  activo: boolean
  fecha: string
}
