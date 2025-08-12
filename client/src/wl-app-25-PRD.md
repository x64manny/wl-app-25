
# Epic: wl-app-25 (mobile-first, PWA, Atomic Design + tus tokens)

## Reglas globales (aplican a todos los issues)
- **Atomic Design:** crea siempre en la carpeta correcta (`atoms/`, `molecules/`, `organisms/`, `templates/`, `pages/`).
- **Tokens:** usa mis tokens existentes (colores, tipografía, spacing, radios). No declares colores/medidas ad hoc; solo utilidades Tailwind que refieran a mis tokens.
- **JS, no TS.**
- **Mobile-first:** 1 columna; en ≥840px, 2 columnas donde aplique.
- **Accesibilidad:** hit area ≥44px; labels en inputs; estados de error claros.
- **Estado:** localStorage (sin backend).
    - Claves de storage:
        - `wp.users` (array perfiles)
        - `wp.activeUserId` (string)
        - `wp.logs.<userId>` (array de {date, kg})
        - `wp.prefs` (opcional)
- **Cálculo:** usa las funciones ya definidas (TMB/TDEE/target/macros/floor/tendencia/ETA).
- **PWA:** vite-plugin-pwa con `registerType: 'autoUpdate'`.
- **Rutas:** `/welcome`, `/dashboard`, `/log`, `/projection`, `/user`.
- **Naming:** prefijo `Wp` en átomos y moléculas.

---

## Issue 1 — Infraestructura UI + Routing + Layout
- Configurar router con rutas: `/welcome`, `/dashboard`, `/log`, `/projection`, `/user`.
- Template base con AppBar (izq: título; der: UserSwitcher), y BottomNav (Dashboard, Historial, Proyección).
- Mobile-first: 1 columna; crear util container que respete max-width y paddings vía tokens.
- Asegurar que el AppBar y BottomNav usan tokens (altura, color, sombras) existentes.

**Criterios:** navegación funcional entre rutas; estilos solo con tokens.

---

## Issue 2 — Átomos (usar tokens siempre)
Crea átomos reutilizables en `components/atoms/`:
- `WpButton` (variants: primary/ghost/danger).
- `WpInput`, `WpNumber`, `WpSelect`, `WpLabel`, `WpHelperText`.
- `WpCard` (padding, radius, borde por tokens).
- `WpKpi` (título + valor; tamaños vía tokens).
- `WpBadge` (ok/warn/bad; colores por tokens).
- `WpTabBar`, `WpFab`.

**Criterios:** sin estilos inline; solo utilidades Tailwind mapeadas a tokens.

---

## Issue 3 — Moléculas
En `components/molecules/`:
- `UserMiniItem` (avatar iniciales + nombre + mini ETA).
- `WeightEntryRow` (fecha, kg, acciones editar/borrar).
- `KpiGroup` (TMB, TDEE, Target, Macros).

**Criterios:** sin lógica de storage; solo props/events.

---

## Issue 4 — Organismos
En `components/organisms/`:
- `OnboardingWizard` (3 pasos: Perfil, Medidas, Actividad/Objetivo).
- `UserSwitcherSheet` (lista perfiles + acciones: activar/editar/duplicar/eliminar).
- `DailyWeightForm` (input peso + WpFab Guardar).
- `HistoryTable` (lista de WeightEntryRow + borrar todo con confirm).
- `ProjectionPanel` (ETA, control objetivo).
- `UserPanelForm` (perfil, medidas, objetivo, cálculo, guardas).

**Criterios:** emiten eventos (save, delete, activate, etc.); estilado con tokens.

---

## Issue 5 — Plantillas (Templates)
En `components/templates/`:
- `WelcomeTemplate` (contiene OnboardingWizard).
- `DashboardTemplate` (contiene KpiGroup + DailyWeightForm + mini-tendencia 7d).
- `LogTemplate` (contiene HistoryTable).
- `ProjectionTemplate` (contiene ProjectionPanel).
- `UserTemplate` (contiene UserPanelForm).

**Criterios:** sin lógica de negocio; composición y layout responsive.

---

## Issue 6 — Páginas
En `components/pages/`:
- `WelcomePage` → si no hay usuarios: mostrar; al crear, set activo y redirigir `/dashboard`.
- `DashboardPage` → calcula KPIs y muestra guardas (piso aplicado / target < TMB).
- `LogPage` → CRUD de pesos + filtros 7/30/90.
- `ProjectionPage` → muestra ETA por tendencia o déficit.
- `UserPage` → edición completa del perfil activo.

**Criterios:** cada página orquesta organismos; sin estilos extra.

---

## Issue 7 — Store local (servicios de datos)
Crear en `src/services/`:
- `users.js`: CRUD de usuarios (list/create/update/delete/activate/getActive).
- `logs.js`: operaciones por userId (list/add/update/delete/clear).
- `calc.js`: funciones puras (TMB, TDEE, floor, macros, tendencia, ETA).

Garantizar claves: `wp.users`, `wp.activeUserId`, `wp.logs.<id>`, `wp.prefs`.

**Criterios:** funciones puras, sin dependencias externas.

---

## Issue 8 — Lógica de cálculo (integración)
- Conectar `DashboardPage` a `calc.js`.
- Recalcular al cambiar peso, usuario, o config del usuario.
- Aplicar floor minIntakeRatio por usuario.
- `ProjectionPage`: usar ETA por tendencia 7d si hay ≥3 puntos; si no, por déficit actual.
- `UserPage`: recalcular preview al modificar parámetros.

**Criterios:** números consistentes sesión a sesión.

---

## Issue 9 — Multi-usuario
- `UserSwitcherSheet`: lista, activar, editar, duplicar, eliminar.
- Cambiar de usuario refresca Dashboard, Log, Projection, UserPage sin reload.
- Eliminar usuario activo: activar otro si existe; si no, redirigir a `/welcome`.

**Criterios:** switch en ≤2 taps desde AppBar.

---

## Issue 10 — PWA
- Configurar vite-plugin-pwa (`registerType:'autoUpdate'`).
- Manifest: nombre corto “WeightPoint”, íconos en public/.
- Badging “Offline” si no hay red (UI discreta).

**Criterios:** instalable; funciona offline (después del primer load).

---

## Issue 11 — Validaciones & UX
- Validar rangos (altura, peso, bf%, déficit, actividad, objetivo).
- Estados vacíos muestran “—”.
- Mensajes de error con tokens (colores y tipografía).

**Criterios:** no se puede guardar onboarding sin datos mínimos.

---

## Issue 12 — QA de aceptación
- Onboarding → crea usuario, redirige a Dashboard.
- Guardar peso → actualiza KPIs y mini-tendencia.
- Cambiar usuario → todo el estado cambia sin refrescar.
- ETA muestra “(tendencia real)” con ≥3 registros en 7d; si no, “(déficit actual)”.
- Responsive correcto: 1 columna móvil; 2 columnas ≥840px.
- PWA instalable y usable offline.
