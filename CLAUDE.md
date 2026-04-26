# Sistema Drogueria

> Sistema demo de gestión para droguerías desarrollado por Binary Duo. Sirve como carta de presentación ante clientes potenciales.

## 🎯 Objetivo del proyecto

Demo funcional de un sistema de gestión para droguerías. **No es un proyecto en producción ni para un cliente real específico** — es una demostración técnica que el equipo Binary Duo usará para mostrar capacidades a futuras droguerías clientes.

Alcance:
- Módulo de **seguridad**: usuarios, roles, permisos, login
- Módulo de **inventario**: productos, categorías, listados
- App `core`: base técnica compartida

Fuera de alcance: scanner de código de barras, reportes complejos, alertas automáticas, multi-sucursal, integraciones externas.

## 🛠️ Stack tecnológico

| Componente | Elección |
|------------|----------|
| Lenguaje | Python 3.12 |
| Framework | Django (última versión estable) |
| Frontend | Templates nativos de Django + JavaScript vanilla |
| Base de datos | SQLite |
| Entorno virtual | venv |
| Dependencias | pip + requirements.txt |
| Variables de entorno | django-environ + archivo `.env` |
| Estructura de settings | Un solo `settings.py` |
| Control de versiones | Git + GitHub |

## 📁 Estructura de apps

El proyecto se divide en **tres apps** con responsabilidades claras:

```
sistema_drogueria/        ← proyecto Django (configuración)
├── core/                 ← base técnica compartida
├── seguridad/            ← usuarios, roles, permisos, login
└── inventario/           ← productos, categorías
```

### App `core`
Base técnica del sistema. Contiene:
- Plantilla `base.html` que todas las páginas heredan
- Modelos abstractos (`ModeloBase` con campos comunes: `fecha_creacion`, `fecha_modificacion`, `activo`)
- Vistas y URLs comunes (home, dashboard, 404)
- Templates compartidos (`_navbar.html`, `_footer.html`)
- Archivos estáticos base (CSS principal, JS común)
- Utilidades y helpers usados por varias apps

### App `seguridad`
Gestión de acceso al sistema:
- Login y logout
- CRUD de usuarios
- Sistema de roles y permisos
- Cambio y recuperación de contraseña

### App `inventario`
Gestión del catálogo de productos:
- CRUD de productos y categorías
- Listados con filtros básicos
- Vista detalle de producto

## 👥 División de responsabilidades

Equipo Binary Duo:
- **Kevin** — Windows + WSL (Ubuntu)
- **Samuel** — Mac
- **Posible tercer integrante** — Windows (por confirmar)

División de trabajo: por features dentro de las apps, usando ramas Git separadas. No por apps completas (un miembro puede trabajar en varias apps).

## 📐 Convenciones del equipo

### Idioma del código

**Español sin tildes** para todo lo que controlamos:
- Apps: `core`, `seguridad`, `inventario`
- Modelos: `Producto`, `Categoria`, `Usuario`, `Rol`
- Campos: `nombre`, `precio`, `fecha_vencimiento`, `stock_minimo`
- Variables propias: `productos`, `usuario_actual`
- URLs: `/inventario/productos/`, `/seguridad/usuarios/`
- Templates: `lista_productos.html`, `detalle_categoria.html`

**Inglés** para lo de Django (no se cambia):
- ORM: `.objects.filter()`, `.save()`, `.delete()`
- Decoradores: `@login_required`, `@property`
- Tipos de campos: `CharField`, `IntegerField`, `ForeignKey`

**Interfaz de usuario**: español completo con tildes y signos correctos ("Categoría", "¿Estás seguro?").

### Naming en Python (PEP 8)

| Tipo | Convención |
|------|------------|
| Variables y funciones | `snake_case` |
| Clases | `PascalCase` |
| Constantes | `UPPER_SNAKE_CASE` |
| Archivos y módulos | `snake_case.py` |

### Estructura interna de cada app

```
nombre_app/
├── migrations/
├── templates/
│   └── nombre_app/        ← namespace para evitar colisiones
│       └── archivo.html
├── static/
│   └── nombre_app/        ← mismo namespace
│       ├── css/
│       └── js/
├── __init__.py
├── admin.py
├── apps.py
├── models.py
├── urls.py                ← creado por nosotros
├── views.py
└── forms.py               ← cuando lo necesitemos
```

El namespace dentro de `templates/` y `static/` es **obligatorio** para evitar colisiones entre apps.

### Templates

- Archivos: `snake_case.html`
- Parciales (fragmentos) llevan guion bajo al inicio: `_navbar.html`, `_footer.html`
- Indentación: 4 espacios
- Bloques con nombre claro: `{% block contenido %}` no `{% block c %}`

### URLs

- Todas en minúsculas
- Separadas por guiones medios: `/lista-productos/`
- Plurales para listados: `/productos/`
- Singulares con ID para detalle: `/producto/<id>/`
- Acciones explícitas: `/producto/<id>/editar/`, `/producto/<id>/eliminar/`

### Mensajes de commit

Formato: `tipo: descripción corta en español`, modo imperativo.

Prefijos: `feat`, `fix`, `docs`, `refactor`, `style`, `test`, `chore`.

Ejemplos:
- `feat: agrega modelo Producto en inventario`
- `fix: corrige validación de stock negativo`
- `docs: actualiza CLAUDE.md con decisión sobre Bootstrap`

## ✅ Estado del proyecto

**Fase actual**: setup inicial del proyecto.

Completado:
- [x] Decisiones técnicas tomadas (stack, idioma, arquitectura)
- [x] Documentación en Notion creada
- [x] `CLAUDE.md` redactado

Pendiente inmediato:
- [ ] Crear estructura del proyecto Django
- [ ] Configurar variables de entorno
- [ ] Primer commit y push a GitHub
- [ ] Crear las 3 apps (`core`, `seguridad`, `inventario`)

Pendiente de mediano plazo:
- [ ] Definir librería de UI/CSS (Bootstrap, Tailwind o custom)
- [ ] Definir sistema de formularios
- [ ] Implementar `base.html` en `core`
- [ ] Implementar `ModeloBase` en `core`
- [ ] Implementar autenticación en `seguridad`
- [ ] Implementar CRUD en `inventario`

## ⚠️ Decisiones técnicas importantes

Esta sección documenta decisiones ya tomadas con su justificación. **No las contradigas ni "mejores" sin discutirlo con el equipo primero.**

### Django con templates nativos, NO Django REST Framework + React

**Decisión**: usar Django con templates server-side y JavaScript vanilla.

**Por qué**:
- El equipo prioriza dominar fundamentos de Django antes de meterle complejidad de SPAs
- El alcance de inventario y seguridad no justifica una arquitectura SPA
- Menos tecnologías = menos puntos de falla = más velocidad
- Migración a React posible después sin perder los modelos ni la lógica

**No proponer migración a DRF + React durante la fase de demo.**

### SQLite, NO PostgreSQL

**Decisión**: usar la base de datos por defecto de Django.

**Por qué**:
- Cero configuración entre máquinas distintas (WSL, Mac, posible tercera PC)
- Portabilidad del archivo `.sqlite3`
- El cliente final no nota la diferencia en una demo
- Migración a PostgreSQL toma ~10 minutos cuando se necesite

**No proponer cambio a PostgreSQL durante la fase de demo.** Si el cliente lo pide en producción real, se evalúa entonces.

### venv + requirements.txt, NO Poetry ni uv

**Decisión**: usar el manejador estándar de Python.

**Por qué**:
- venv viene con Python (cero instalaciones extra)
- Documentación universal de Django asume venv
- Aprender fundamentos antes de herramientas modernas

**No proponer migración a Poetry o uv** sin discutirlo con el equipo.

### Un solo `settings.py`, NO separación por entornos

**Decisión**: un único archivo de configuración.

**Por qué**:
- El alcance del demo no justifica la complejidad de `base.py / development.py / production.py`
- Las diferencias entre entornos se resuelven con variables de entorno
- Si el proyecto crece, separarlo después es directo

**No proponer reestructurar settings** sin que el equipo lo pida explícitamente.

### Idioma del código: español sin tildes

**Decisión**: modelos, campos, variables y URLs en español sin tildes.

**Por qué**:
- Consistencia con la lógica de negocio (droguerías hispanohablantes)
- Evita problemas de encoding que pueden dar las tildes
- Decisión tomada conscientemente, no por error

**No traducir código existente al inglés** "para mejorar".

### Modelos abstractos en `core`

**Decisión**: `core` define un `ModeloBase` con campos comunes (`fecha_creacion`, `fecha_modificacion`, `activo`) que todos los modelos del sistema heredan.

**Por qué**:
- Evita repetir esos tres campos en cada modelo
- Cambios centralizados (agregar `creado_por` después es trivial)
- Buena práctica profesional

**Cualquier modelo nuevo debe heredar de `ModeloBase`.**

### Herencia de templates desde `core/base.html`

**Decisión**: existe un `base.html` en la app `core` que define la estructura HTML común. Todas las páginas heredan de él con `{% extends "core/base.html" %}`.

**Por qué**:
- Cambios en menú/footer/head se aplican una sola vez
- Consistencia visual garantizada
- Cada página solo se preocupa por su contenido

**No crear páginas HTML completas sin extender de `base.html`.**

## 🚫 Lo que Claude NO debe hacer

- **No proponer migraciones de stack** (a DRF, a React, a PostgreSQL, a Poetry, etc.) sin que el equipo lo pida
- **No traducir código** entre español e inglés sin que se solicite
- **No crear apps adicionales** sin discutirlo (las apps son `core`, `seguridad`, `inventario`)
- **No usar características avanzadas** (señales complejas, middleware custom, etc.) sin justificación clara
- **No instalar librerías** sin que el equipo lo apruebe primero — todo nuevo paquete cambia `requirements.txt` y afecta a todos
- **No hacer commit del `.env`** ni proponer guardar credenciales en código
- **No proponer separar `settings.py`** por entornos
- **No reescribir código existente** "para que esté mejor" sin que se pida
- **No asumir que algo está instalado** — siempre verificar con el usuario primero
- **No saltarse pasos en explicaciones**: el equipo aprende, así que cada cambio importante debe explicarse

## 📚 Documentación adicional

Documentación extendida del proyecto en Notion: **Centro de Documentos Binary Duo → Proyecto Demo - Sistema Drogueria**.

Contiene 8 sub-páginas con explicaciones detalladas de:
1. Contexto y objetivo
2. Stack tecnológico y decisiones
3. Arquitectura: las 3 apps
4. Conceptos clave de Django (herencia de templates, modelos abstractos)
5. Convenciones del equipo
6. Seguridad y variables de entorno
7. Flujo de trabajo Git
8. Plan paso a paso de setup

## 🔄 Mantenimiento de este archivo

**Regla**: cada vez que se complete algo o se tome una decisión técnica nueva, actualizar este archivo en el mismo commit que el cambio. La documentación es un deliverable vivo.
