# Portal PadelMixer - Descripción Funcional de Alto Nivel

## 1. Resumen Ejecutivo

### 1.1. Visión del Portal
**PadelMixer** es un portal web especializado en la gestión integral de actividades de pádel. El portal está diseñado para facilitar la organización de partidos, la gestión de jugadores, el seguimiento de rankings y la reserva de pistas, creando una comunidad activa en torno a este deporte.

### 1.2. Estado Actual de Implementación
**IMPORTANTE**: A fecha de este documento, el portal se encuentra en **fase inicial de desarrollo (scaffold)**. 

- ✅ **Implementado**: Estructura base de Angular, configuración del proyecto
- ❌ **No implementado**: Todas las funcionalidades descritas en este documento son parte de la visión futura del producto

**Evidencia técnica del estado actual**:
- `src/app/app.routes.ts`: Sin rutas definidas (`routes: Routes = []`)
- `src/app/app.html`: Plantilla placeholder de Angular
- `src/app/app.ts`: Componente raíz básico con título "PadelMixer"

---

## 2. Arquitectura de la Interfaz de Usuario

El portal PadelMixer seguirá una arquitectura de aplicación web moderna con tres zonas principales claramente diferenciadas:

### 2.1. Cabecera Superior
Zona fija en la parte superior de la pantalla que permanece visible en todas las vistas del portal.

**Elementos que contendrá**:
- **Logo del portal**: Identificación visual de PadelMixer (esquina superior izquierda)
- **Información de usuario**: 
  - Avatar/foto de perfil
  - Nombre del usuario activo
- **Acciones globales**:
  - Icono de notificaciones (con indicador de nuevas notificaciones)
  - Acceso a configuración personal
  - Opción de cerrar sesión

**Propósito**: Proporcionar contexto constante sobre el usuario activo y acceso rápido a funcionalidades globales.

### 2.2. Menú Lateral Izquierdo
Panel de navegación vertical ubicado en el lado izquierdo de la pantalla.

**Características**:
- **Navegación principal y única** del portal
- Contendrá todas las opciones de navegación organizadas por categorías
- Puede ser colapsable para maximizar el área de contenido
- Destacará visualmente la opción actualmente seleccionada

**Categorías de navegación previstas** (a implementar):
- Dashboard/Inicio
- Gestión de Partidos
- Gestión de Jugadores
- Rankings
- Reservas de Pistas
- Mi Perfil
- Administración (solo roles administrativos)

**Propósito**: Servir como punto único de acceso a todas las funcionalidades del portal.

### 2.3. Zona Central Principal
Área de contenido dinámico que ocupa el espacio restante entre el menú lateral y el borde derecho de la ventana.

**Características**:
- Área de trabajo principal donde se cargarán las diferentes pantallas/vistas
- Contenido dinámico según la opción seleccionada en el menú lateral
- Incluirá el `<router-outlet>` de Angular para la carga de componentes
- Será responsive y se adaptará a diferentes tamaños de pantalla

**Propósito**: Mostrar el contenido específico de cada funcionalidad del portal.

---

## 3. Flujo de Autenticación y Acceso

### 3.1. Control de Acceso al Portal
El portal implementará un sistema de autenticación obligatoria. Ningún usuario no autenticado podrá acceder al contenido del portal.

### 3.2. Flujo de Entrada al Portal

```
┌─────────────────────────────────────┐
│   Usuario accede al portal          │
│   (http://portal.padelmixer.com)    │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│   Sistema verifica estado           │
│   de autenticación                  │
└─────────────┬───────────────────────┘
              │
         ┌────┴────┐
         │         │
    ¿Autenticado?  
         │         │
    ┌────┘         └────┐
    │                   │
   NO                  SÍ
    │                   │
    ▼                   ▼
┌─────────────┐   ┌──────────────────┐
│ REDIRIGE A  │   │ REDIRIGE A       │
│ LOGIN       │   │ BIENVENIDA       │
└─────────────┘   └──────────────────┘
```

### 3.3. Pantalla de Login (No Autenticado)
**Funcionalidad**: Pantalla de autenticación donde el usuario introduce sus credenciales.

**Elementos esperados**:
- Formulario con campos:
  - Usuario/Email
  - Contraseña
- Botón "Iniciar Sesión"
- Enlace "¿Olvidaste tu contraseña?"
- Opción "Registrarse" (si el portal permite registro público)

**Comportamiento tras login exitoso**:
- Establecer sesión de usuario
- Redirigir a Pantalla de Bienvenida

### 3.4. Pantalla de Bienvenida (Autenticado)
**Funcionalidad**: Primera pantalla que ve un usuario autenticado al acceder al portal.

**Propósito**:
- Dar la bienvenida personalizada al usuario
- Mostrar resumen de actividad reciente
- Proporcionar accesos rápidos a funcionalidades principales
- Mostrar notificaciones o alertas importantes

**Elementos esperados**:
- Mensaje de bienvenida personalizado: "Bienvenido/a, [Nombre Usuario]"
- Dashboard con widgets informativos:
  - Próximos partidos programados
  - Estadísticas personales resumidas
  - Actividad reciente de la comunidad
  - Accesos directos a acciones frecuentes

---

## 4. Principios de Diseño

### 4.1. Usabilidad
- Navegación intuitiva y coherente
- Jerarquía visual clara
- Feedback inmediato de las acciones del usuario

### 4.2. Responsividad
- Adaptación a diferentes tamaños de pantalla (desktop, tablet, móvil)
- En dispositivos móviles, el menú lateral se convertirá en un menú hamburguesa

### 4.3. Accesibilidad
- Cumplimiento de estándares WCAG
- Navegación por teclado
- Etiquetas semánticas apropiadas

### 4.4. Rendimiento
- Carga rápida de vistas
- Lazy loading de componentes cuando sea apropiado
- Optimización de recursos estáticos

---

## 5. Tecnología Base

### 5.1. Framework Principal
- **Angular** (última versión estable)
- **TypeScript** como lenguaje principal

### 5.2. Estructura Actual del Proyecto
```
src/
├── app/
│   ├── app.ts              # Componente raíz
│   ├── app.html            # Template principal (actualmente placeholder)
│   ├── app.css             # Estilos globales
│   ├── app.config.ts       # Configuración de la aplicación
│   └── app.routes.ts       # Definición de rutas (actualmente vacío)
├── index.html              # HTML principal
├── main.ts                 # Bootstrap de la aplicación
└── styles.css              # Estilos globales
```

---

## 6. Roadmap de Implementación (Próximos Pasos)

### Fase 1: Estructura Base (Prioritario)
1. **Implementar layout principal**:
   - Componente de cabecera
   - Componente de menú lateral
   - Estructura de zona central con router-outlet

2. **Sistema de autenticación básico**:
   - Guard de autenticación
   - Servicio de autenticación
   - Componente de login
   - Gestión de sesiones

3. **Pantalla de bienvenida**:
   - Vista inicial para usuarios autenticados
   - Dashboard básico

### Fase 2: Funcionalidades Core (Medio Plazo)
- Gestión de jugadores
- Gestión de partidos
- Sistema de rankings básico

### Fase 3: Funcionalidades Avanzadas (Largo Plazo)
- Reserva de pistas
- Sistema de notificaciones
- Estadísticas avanzadas
- Integración con servicios externos

---

## 7. Notas Importantes

### 7.1. Alcance de este Documento
Este documento describe la **visión de alto nivel** del portal PadelMixer sin entrar en el detalle de cada funcionalidad específica. Los documentos detallados de cada área funcional se crearán en documentos separados dentro de `doc/funcional/`.

### 7.2. Estado de "No Implementado"
Todas las funcionalidades descritas en este documento están actualmente en estado de **"No Implementado"**. El proyecto cuenta únicamente con la estructura scaffold de Angular sin lógica de negocio específica de pádel.

### 7.3. Evolución del Documento
Este documento deberá actualizarse conforme se vayan implementando las funcionalidades, distinguiendo claramente entre:
- ✅ **Implementado y funcional**
- 🚧 **En desarrollo**
- 📋 **Planificado**
- ❌ **No implementado**

---

## 8. Referencias

### 8.1. Archivos Relevantes del Proyecto
- **Rutas**: `src/app/app.routes.ts`
- **Configuración**: `src/app/app.config.ts`
- **Componente principal**: `src/app/app.ts`
- **Template principal**: `src/app/app.html`
- **Bootstrap**: `src/main.ts`

### 8.2. Documentación Técnica
- [Angular Documentation](https://angular.dev)
- [Angular Router](https://angular.dev/guide/routing)

---

**Documento creado**: 16/01/2026  
**Versión**: 1.0  
**Estado del proyecto**: Scaffold inicial (sin funcionalidades implementadas)
