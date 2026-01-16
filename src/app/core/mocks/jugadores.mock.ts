import { Jugador } from '../models/jugador.model';

/**
 * Datos mock de jugadores para desarrollo
 */
export const JUGADORES_MOCK: Jugador[] = [
  {
    id: 1,
    nombre: 'Carlos',
    apellidos: 'García López',
    email: 'carlos.garcia@email.com',
    telefono: '+34 600 111 222',
    fechaNacimiento: '1985-03-15',
    nivelJuego: 'AVANZADO',
    fechaAlta: '2024-01-10T10:00:00',
    observaciones: 'Juega principalmente los fines de semana',
    activo: true
  },
  {
    id: 2,
    nombre: 'María',
    apellidos: 'Rodríguez Sánchez',
    email: 'maria.rodriguez@email.com',
    telefono: '+34 611 222 333',
    fechaNacimiento: '1990-07-22',
    nivelJuego: 'MEDIO',
    fechaAlta: '2024-01-15T11:30:00',
    observaciones: 'Interesada en torneos',
    activo: true
  },
  {
    id: 3,
    nombre: 'Juan',
    apellidos: 'Martínez Fernández',
    email: 'juan.martinez@email.com',
    telefono: '+34 622 333 444',
    fechaNacimiento: '1988-11-05',
    nivelJuego: 'PROFESIONAL',
    fechaAlta: '2024-01-20T09:15:00',
    observaciones: 'Ex jugador profesional',
    activo: true
  },
  {
    id: 4,
    nombre: 'Ana',
    apellidos: 'López Martín',
    email: 'ana.lopez@email.com',
    telefono: '+34 633 444 555',
    fechaNacimiento: '1995-02-14',
    nivelJuego: 'INICIACION',
    fechaAlta: '2024-02-01T14:00:00',
    observaciones: 'Primera experiencia en pádel',
    activo: true
  },
  {
    id: 5,
    nombre: 'Pedro',
    apellidos: 'González Ruiz',
    email: 'pedro.gonzalez@email.com',
    telefono: '+34 644 555 666',
    fechaNacimiento: '1982-09-30',
    nivelJuego: 'AVANZADO',
    fechaAlta: '2024-02-05T16:30:00',
    observaciones: 'Juega todos los días',
    activo: true
  },
  {
    id: 6,
    nombre: 'Laura',
    apellidos: 'Hernández Torres',
    email: 'laura.hernandez@email.com',
    telefono: '+34 655 666 777',
    fechaNacimiento: '1992-12-18',
    nivelJuego: 'MEDIO',
    fechaAlta: '2024-02-10T10:45:00',
    observaciones: undefined,
    activo: true
  },
  {
    id: 7,
    nombre: 'David',
    apellidos: 'Jiménez Castro',
    email: 'david.jimenez@email.com',
    telefono: '+34 666 777 888',
    fechaNacimiento: '1987-06-25',
    nivelJuego: 'PROFESIONAL',
    fechaAlta: '2024-02-15T12:00:00',
    observaciones: 'Entrena a otros jugadores',
    activo: true
  },
  {
    id: 8,
    nombre: 'Carmen',
    apellidos: 'Moreno Díaz',
    email: 'carmen.moreno@email.com',
    telefono: '+34 677 888 999',
    fechaNacimiento: '1994-04-08',
    nivelJuego: 'INICIACION',
    fechaAlta: '2024-02-20T15:20:00',
    observaciones: 'Busca pareja de juego',
    activo: true
  },
  {
    id: 9,
    nombre: 'Javier',
    apellidos: 'Álvarez Romero',
    email: 'javier.alvarez@email.com',
    telefono: '+34 688 999 000',
    fechaNacimiento: '1991-08-12',
    nivelJuego: 'MEDIO',
    fechaAlta: '2024-03-01T09:00:00',
    observaciones: 'Disponible tardes',
    activo: true
  },
  {
    id: 10,
    nombre: 'Isabel',
    apellidos: 'Navarro Gil',
    email: 'isabel.navarro@email.com',
    telefono: '+34 699 000 111',
    fechaNacimiento: '1989-01-27',
    nivelJuego: 'AVANZADO',
    fechaAlta: '2024-03-05T11:15:00',
    observaciones: 'Participa en competiciones',
    activo: true
  },
  {
    id: 11,
    nombre: 'Miguel',
    apellidos: 'Serrano Vega',
    email: 'miguel.serrano@email.com',
    telefono: '+34 600 222 333',
    fechaNacimiento: '1986-10-19',
    nivelJuego: 'MEDIO',
    fechaAlta: '2024-03-10T13:30:00',
    observaciones: undefined,
    activo: false
  },
  {
    id: 12,
    nombre: 'Rosa',
    apellidos: 'Blanco Suárez',
    email: 'rosa.blanco@email.com',
    telefono: '+34 611 333 444',
    fechaNacimiento: '1993-05-03',
    nivelJuego: 'INICIACION',
    fechaAlta: '2024-03-15T10:00:00',
    observaciones: 'Clases los martes',
    activo: true
  },
  {
    id: 13,
    nombre: 'Francisco',
    apellidos: 'Ramos Ortega',
    email: 'francisco.ramos@email.com',
    telefono: '+34 622 444 555',
    fechaNacimiento: '1984-07-16',
    nivelJuego: 'PROFESIONAL',
    fechaAlta: '2024-03-20T14:45:00',
    observaciones: 'Monitor certificado',
    activo: true
  },
  {
    id: 14,
    nombre: 'Elena',
    apellidos: 'Iglesias Vargas',
    email: 'elena.iglesias@email.com',
    telefono: '+34 633 555 666',
    fechaNacimiento: '1996-11-29',
    nivelJuego: 'MEDIO',
    fechaAlta: '2024-04-01T09:30:00',
    observaciones: 'Juega en pareja fija',
    activo: true
  },
  {
    id: 15,
    nombre: 'Antonio',
    apellidos: 'Castro Medina',
    email: 'antonio.castro@email.com',
    telefono: '+34 644 666 777',
    fechaNacimiento: '1983-02-11',
    nivelJuego: 'AVANZADO',
    fechaAlta: '2024-04-05T16:00:00',
    observaciones: 'Organizador de eventos',
    activo: true
  }
];

/**
 * Genera un nuevo ID único para jugadores
 */
export function generateJugadorId(): number {
  const maxId = Math.max(...JUGADORES_MOCK.map(j => j.id), 0);
  return maxId + 1;
}

/**
 * Simula delay de red para operaciones mock
 */
export function simulateNetworkDelay<T>(data: T, delayMs: number = 500): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => resolve(data), delayMs);
  });
}
