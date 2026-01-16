# Funcionalidad: Gestión de Jugadores (PadelMixer)

## 1. Resumen Ejecutivo

### 1.1. Propósito de la Funcionalidad
La pantalla de **Gestión de Jugadores** permite visualizar, registrar y mantener actualizada la información de todos los jugadores que participan en las actividades organizadas a través del portal PadelMixer. Es una funcionalidad central del sistema, ya que los jugadores son la entidad fundamental para la organización de partidos, torneos y rankings.

### 1.2. Estado Actual de Implementación
**❌ NO IMPLEMENTADO**: Esta funcionalidad está actualmente en fase de diseño funcional. No existe implementación en el repositorio actual del portal.

**Evidencia**:
- No existe carpeta `src/app/features/jugadores/` o similar
- No hay rutas relacionadas con jugadores en `src/app/app.routes.ts`
- No existen servicios o modelos relacionados con jugadores en el repositorio

---

## 2. Descripción General

### 2.1. Usuarios Objetivo
- **Administradores**: Tienen acceso completo para crear, editar y eliminar jugadores
- **Usuarios registrados**: Pueden visualizar el listado de jugadores y ver detalles, pero no modificar información

### 2.2. Punto de Acceso
- **Ruta**: `/jugadores`
- **Navegación**: Desde el menú lateral izquierdo, opción "Jugadores"
- **Icono sugerido**: `people` (Material Icons)

---

## 3. F-JUG-01: Listado de Jugadores

### 3.1. Descripción Funcional
Pantalla principal que muestra el listado completo de jugadores registrados en el sistema en formato de tabla paginada, permitiendo su consulta y acceso a acciones de gestión.

### 3.2. Tipo
UI / Consulta de datos / Gestión CRUD

### 3.3. Elementos de la Interfaz

#### 3.3.1. Cabecera de la Pantalla
- **Título**: "Gestión de Jugadores"
- **Botón de acción primaria** (solo para administradores):
  - Texto: "+ Añadir Jugador"
  - Ubicación: Esquina superior derecha
  - Acción: Abre el formulario de alta de nuevo jugador

#### 3.3.2. Barra de Herramientas (Toolbar)
**Elementos**:
- **Campo de búsqueda/filtro**:
  - Placeholder: "Buscar por nombre..."
  - Filtrado en tiempo real sobre la columna "Nombre"
  - Icono: lupa (`search`)
  
- **Filtro por nivel** (dropdown):
  - Opciones: "Todos los niveles", "Iniciación", "Medio", "Avanzado", "Profesional"
  - Valor por defecto: "Todos los niveles"

- **Botón de actualizar**:
  - Icono: `refresh`
  - Tooltip: "Actualizar listado"
  - Acción: Recarga los datos del servidor

#### 3.3.3. Tabla de Jugadores

**Columnas de la tabla**:

| Columna | Descripción | Tipo de dato | Ordenable | Ancho sugerido |
|---------|-------------|--------------|-----------|----------------|
| **Nombre** | Nombre completo del jugador | Texto | Sí | 30% |
| **Fecha de Alta** | Fecha de registro en el sistema | Fecha (dd/mm/yyyy) | Sí | 20% |
| **Nivel** | Nivel de juego del jugador | Badge/Chip | Sí | 20% |
| **Acciones** | Botones de acción | Iconos | No | 30% |

**Detalles de columnas**:

1. **Nombre**:
   - Formato: "Apellido(s), Nombre"
   - Click en el nombre: Navega a la vista de detalle del jugador
   - Estilo: Enlace (texto azul subrayado al hacer hover)

2. **Fecha de Alta**:
   - Formato: dd/mm/yyyy (ejemplo: 15/01/2026)
   - Orden por defecto: Descendente (los más recientes primero)

3. **Nivel**:
   - Representación visual mediante chip/badge de color:
     - 🟢 **Iniciación**: Verde claro
     - 🔵 **Medio**: Azul
     - 🟡 **Avanzado**: Naranja
     - 🔴 **Profesional**: Rojo
   - Texto centrado en la celda

4. **Acciones**:
   - Conjunto de botones de icono alineados horizontalmente
   - **Ver detalle** (todos los usuarios):
     - Icono: `visibility` o `info`
     - Tooltip: "Ver detalles"
     - Acción: Navega a `/jugadores/{id}`
   
   - **Editar** (solo administradores):
     - Icono: `edit`
     - Tooltip: "Editar jugador"
     - Acción: Abre formulario de edición
     - **Condición**: Visible solo si `user.role === 'ADMIN'`
   
   - **Eliminar** (solo administradores):
     - Icono: `delete`
     - Tooltip: "Eliminar jugador"
     - Acción: Muestra diálogo de confirmación
     - Color: Rojo de advertencia
     - **Condición**: Visible solo si `user.role === 'ADMIN'`

#### 3.3.4. Paginación

**Características**:
- **Tamaño de página fijo**: 15 jugadores por página
- **Ubicación**: Parte inferior de la tabla (centrada)
- **Elementos del paginador**:
  - Botón "Primera página" (`first_page`)
  - Botón "Página anterior" (`navigate_before`)
  - Indicador de página actual: "Página X de Y"
  - Botón "Página siguiente" (`navigate_next`)
  - Botón "Última página" (`last_page`)
  - Resumen: "Mostrando 1-15 de 47 jugadores"

**Reglas de negocio**:
- Los botones de navegación se deshabilitan cuando no hay más páginas en esa dirección
- Al aplicar filtros, la paginación se reinicia a la página 1
- Se mantiene la página actual al editar/eliminar jugadores (si es posible)

#### 3.3.5. Estado Vacío
**Condición**: No hay jugadores registrados o el filtro no devuelve resultados

**Elementos**:
- Icono ilustrativo: `people_outline` (grande, centrado)
- Mensaje primario: "No hay jugadores registrados"
- Mensaje secundario: "Añade el primer jugador para comenzar"
- Botón "+ Añadir Jugador" (solo administradores)

---

## 4. F-JUG-02: Alta de Jugador

### 4.1. Descripción Funcional
Formulario que permite a los administradores registrar un nuevo jugador en el sistema.

### 4.2. Permisos
**Solo administradores** (`user.role === 'ADMIN'`)

### 4.3. Punto de Acceso
- Botón "+ Añadir Jugador" en la cabecera del listado
- Puede implementarse como:
  - **Opción A**: Modal/diálogo superpuesto
  - **Opción B**: Navegación a ruta `/jugadores/nuevo`

### 4.4. Campos del Formulario

| Campo | Tipo | Obligatorio | Validaciones | Descripción |
|-------|------|-------------|--------------|-------------|
| **Nombre** | Text input | ✅ Sí | Mín. 2 caracteres, máx. 50 | Nombre del jugador |
| **Apellidos** | Text input | ✅ Sí | Mín. 2 caracteres, máx. 100 | Apellidos del jugador |
| **Email** | Email input | ✅ Sí | Formato email válido, único en sistema | Correo electrónico |
| **Teléfono** | Tel input | ❌ No | Formato teléfono español | Número de contacto |
| **Fecha de Nacimiento** | Date picker | ✅ Sí | Edad mínima 12 años | Para cálculo de categoría |
| **Nivel de Juego** | Select/dropdown | ✅ Sí | Uno de los valores permitidos | Nivel actual del jugador |
| **Observaciones** | Textarea | ❌ No | Máx. 500 caracteres | Notas adicionales |

**Valores permitidos para "Nivel de Juego"**:
- Iniciación
- Medio
- Avanzado
- Profesional

### 4.5. Comportamiento del Formulario

**Validaciones en tiempo real**:
- Los campos obligatorios muestran error si están vacíos al perder foco
- El email muestra error si no es formato válido o ya existe en sistema
- La fecha de nacimiento valida que el jugador tenga al menos 12 años

**Botones de acción**:
- **Guardar**: 
  - Valida todos los campos
  - Si hay errores, los muestra y no permite guardar
  - Si es válido, envía petición POST al backend
  - Muestra mensaje de éxito: "Jugador añadido correctamente"
  - Cierra el formulario y recarga el listado
  - Deshabilitado hasta que todos los campos obligatorios sean válidos

- **Cancelar**:
  - Cierra el formulario sin guardar
  - Si hay cambios pendientes, muestra confirmación: "¿Descartar cambios?"

### 4.6. Reglas de Negocio

1. **Email único**: No pueden existir dos jugadores con el mismo email
2. **Fecha de alta automática**: Se establece automáticamente con la fecha/hora actual del sistema
3. **Edad mínima**: El jugador debe tener al menos 12 años cumplidos
4. **Nivel inicial**: Si no se especifica, se asigna por defecto "Iniciación"

---

## 5. F-JUG-03: Edición de Jugador

### 5.1. Descripción Funcional
Permite a los administradores modificar la información de un jugador existente.

### 5.2. Permisos
**Solo administradores** (`user.role === 'ADMIN'`)

### 5.3. Punto de Acceso
- Botón "Editar" (icono `edit`) en la columna de acciones del listado
- También desde la vista de detalle del jugador

### 5.4. Formulario
**Mismos campos que F-JUG-02** con las siguientes diferencias:

- Los campos vienen pre-rellenados con los datos actuales del jugador
- **Campo "Email"**: 
  - Se puede modificar
  - Validación de unicidad excepto para el email actual del propio jugador
- **Campo "Fecha de Alta"**: 
  - **No editable** (solo lectura, mostrado en gris)
  - Tooltip: "La fecha de alta no se puede modificar"

### 5.5. Comportamiento

**Botones de acción**:
- **Guardar cambios**:
  - Valida el formulario
  - Envía petición PUT al backend con solo los campos modificados
  - Mensaje de éxito: "Jugador actualizado correctamente"
  - Vuelve al listado o a la vista de detalle

- **Cancelar**:
  - Descarta cambios no guardados
  - Confirmación si hay modificaciones pendientes

### 5.6. Reglas de Negocio

1. **Auditoría de cambios**: El sistema registra quién y cuándo modificó el jugador (backend)
2. **Validación de email único**: Igual que en alta, pero permitiendo el email actual
3. **Fecha de alta inmutable**: No se puede modificar después del registro inicial

---

## 6. F-JUG-04: Eliminación de Jugador

### 6.1. Descripción Funcional
Permite a los administradores eliminar un jugador del sistema.

### 6.2. Permisos
**Solo administradores** (`user.role === 'ADMIN'`)

### 6.3. Punto de Acceso
- Botón "Eliminar" (icono `delete`) en la columna de acciones del listado
- También desde la vista de detalle del jugador

### 6.4. Flujo de Eliminación

```
Usuario hace clic en "Eliminar"
    ↓
Sistema muestra diálogo de confirmación
    ↓
Usuario confirma o cancela
    ↓
Si CONFIRMA:
    ↓
Sistema verifica restricciones (ver reglas de negocio)
    ↓
Si NO HAY RESTRICCIONES:
    ↓
    Envía petición DELETE al backend
    ↓
    Mensaje: "Jugador eliminado correctamente"
    ↓
    Actualiza el listado (elimina la fila)
    
Si HAY RESTRICCIONES:
    ↓
    Mensaje de error explicando el motivo
    ↓
    El jugador NO se elimina
```

### 6.5. Diálogo de Confirmación

**Elementos**:
- **Título**: "¿Eliminar jugador?"
- **Mensaje**: 
  ```
  Vas a eliminar al jugador:
  [Nombre completo del jugador]
  
  Esta acción no se puede deshacer.
  ```
- **Botones**:
  - "Cancelar" (secundario, gris)
  - "Eliminar" (primario, rojo)

### 6.6. Reglas de Negocio (Restricciones de Eliminación)

Un jugador **NO puede ser eliminado** si:

1. **Tiene partidos programados**: 
   - Error: "No se puede eliminar. El jugador tiene partidos programados."
   - Sugerencia: "Cancela o reasigna los partidos primero."

2. **Participa en un torneo activo**:
   - Error: "No se puede eliminar. El jugador participa en torneos activos."
   - Sugerencia: "Finaliza el torneo o elimina al jugador del mismo."

3. **Tiene reservas de pista activas**:
   - Error: "No se puede eliminar. El jugador tiene reservas de pista pendientes."
   - Sugerencia: "Cancela las reservas primero."

**Alternativa - Eliminación lógica**:
Si existen restricciones, el sistema puede ofrecer **desactivar** el jugador en lugar de eliminarlo permanentemente. Los jugadores desactivados:
- No aparecen en el listado principal (excepto con filtro "Mostrar inactivos")
- No pueden ser seleccionados para nuevos partidos
- Mantienen su historial completo

---

## 7. F-JUG-05: Detalle de Jugador

### 7.1. Descripción Funcional
Vista de solo lectura que muestra toda la información detallada de un jugador específico.

### 7.2. Permisos
**Todos los usuarios registrados** pueden acceder

### 7.3. Punto de Acceso
- Click en el nombre del jugador desde el listado
- Click en el botón "Ver
