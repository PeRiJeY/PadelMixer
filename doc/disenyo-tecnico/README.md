# Diseño Técnico: Portal Base PadelMixer

**Índice de Documentación Técnica**

Este directorio contiene el diseño técnico completo del Portal Base PadelMixer, organizado en documentos modulares para facilitar su lectura y mantenimiento.

## 📚 Documentos Principales

### 1. [Resumen Ejecutivo](./01-resumen-ejecutivo.md)
Visión general del proyecto, alcance, stack tecnológico y principios arquitectónicos.

### 2. [Arquitectura y Estructura](./02-arquitectura-estructura.md)
Diagrama de arquitectura de componentes, principios de diseño y estructura de directorios completa.

### 3. [Core: Servicios e Infraestructura](./03-core-servicios.md)
Capa de servicios (Auth, API, Storage, Navigation), Interceptores HTTP, Guards y Modelos de datos.

### 4. [Rutas y Layouts](./04-rutas-layouts.md)
Configuración de rutas, Auth Layout y Main Layout con implementaciones completas.

### 5. [Componentes Clave](./05-componentes-clave.md)
Implementación detallada de Header, Sidebar, LoginForm, Login Page y Welcome Page.

### 6. [Sistema de Mocks](./06-sistema-mocks.md)
Mock data para desarrollo sin backend: Auth, Users y Navigation.

### 7. [Angular Material](./07-angular-material.md)
Integración de Angular Material, tema personalizado y paleta de colores.

### 8. [Flujos de Usuario](./08-flujos-usuario.md)
Diagramas Mermaid de flujos de autenticación, navegación y casos de uso.

### 9. [Estilos y Temas](./09-estilos-temas.md)
Variables CSS, breakpoints responsive, metodología BEM y guías de estilo.

### 10. [Testing Strategy](./10-testing-strategy.md)
Estrategia de testing: unit tests, component tests, e2e y cobertura objetivo.

### 11. [Checklist de Implementación](./11-checklist-implementacion.md)
Plan de implementación en 4 fases con tareas específicas y criterios de aceptación.

---

## 🎯 Alcance del Diseño

Este diseño técnico cubre:

✅ **Sistema de autenticación OAuth 2.0**
✅ **Layout principal con tres zonas** (header, sidebar, content)
✅ **Pantallas**: Login y Welcome (Dashboard)
✅ **Capa de servicios** para comunicación con backend
✅ **Guards de rutas** para protección de acceso
✅ **Sistema de mocks** para desarrollo sin backend
✅ **Integración completa de Angular Material**
✅ **Testing strategy** con cobertura 80%+

---

## 🛠️ Stack Tecnológico

**Frontend:**
- Angular 17+ (Standalone Components)
- TypeScript 5+
- Angular Material 17+
- RxJS 7+ & Signals API

**Backend (Integración):**
- API REST con OAuth 2.0
- Tokens Bearer
- Base URL: `http://URL_BACKEND/api`

**Desarrollo:**
- Mock Interceptor
- Angular CLI con Vite
- Hot Reload

---

## 📋 Principios Arquitectónicos

1. **Standalone Components**: Sin NgModules
2. **Atomic Design**: Atoms → Molecules → Organisms → Templates → Pages
3. **Signals API**: Sistema reactivo moderno
4. **Lazy Loading**: Carga diferida por funcionalidad
5. **Dependency Injection**: DI nativo de Angular
6. **Single Responsibility**: Una responsabilidad por clase/componente

---

## 🚀 Cómo Usar Esta Documentación

1. **Desarrolladores nuevos**: Leer en orden secuencial (1-11)
2. **Referencia rápida**: Usar índice para buscar sección específica
3. **Implementación**: Seguir el [Checklist de Implementación](./11-checklist-implementacion.md)
4. **Arquitectos**: Enfocarse en docs 1-3 y 8

---

## 📝 Convenciones

- 📁 **Ubicación**: Ruta del archivo en el proyecto
- 🎯 **Responsabilidad**: Propósito del componente/servicio
- 💻 **Implementación completa**: Código TypeScript/HTML/CSS completo
- 📊 **Diagrama**: Visualización Mermaid incluida
- ✅ **Criterios de aceptación**: Checklist de verificación

---

**Fecha de creación**: 16/01/2026  
**Versión**: 1.0  
**Arquitecto**: Frontend Angular + Web Components  
**Basado en**: `doc/funcional/portal-base.md`
