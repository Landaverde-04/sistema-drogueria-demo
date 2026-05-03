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
| Framework | Django 6.x (última versión estable) |
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
- `base.html` que todas las páginas heredan con `{% extends "core/base.html" %}`
- `ModeloBase` — modelo abstracto con `fecha_creacion`, `fecha_modificacion`, `activo`
- Vista y URL del home
- Parcial `sidebar.html` (el footer fue eliminado)
- Archivos estáticos base: `estilos.css` y `main.js`
- Modal de mensajes del sistema (`#modalMensaje`) — se activa automáticamente cuando Django envía un mensaje
- Modal de confirmación de eliminación (`#modalEliminar`) — compartido por todas las páginas, controlado desde `main.js`

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
- Parciales (fragmentos incluidos con `{% include %}`) **sin guion bajo** al inicio: `navbar.html`, `footer.html`
- Indentación: 4 espacios
- Bloques con nombre claro: `{% block contenido %}` no `{% block c %}`

### URLs

- Todas en minúsculas
- Separadas por guiones medios: `/lista-productos/`
- Plurales para listados: `/productos/`
- Singulares con ID para detalle: `/producto/<id>/`
- Acciones explícitas: `/producto/<id>/editar/`, `/producto/<id>/eliminar/`
- Cada app define su propio `urls.py` con `app_name` para namespace

### Mensajes de commit

Formato: `tipo: descripción corta en español`, modo imperativo.

Prefijos: `feat`, `fix`, `docs`, `refactor`, `style`, `test`, `chore`.

Ejemplos:
- `feat: agrega modelo Producto en inventario`
- `fix: corrige validación de stock negativo`
- `docs: actualiza CLAUDE.md con decisión sobre Bootstrap`

## ✅ Estado del proyecto

**Fase actual**: módulo `seguridad` en progreso.

Completado:
- [x] Decisiones técnicas tomadas (stack, idioma, arquitectura)
- [x] Documentación en Notion creada
- [x] `CLAUDE.md` redactado
- [x] Estructura del proyecto Django creada (`startproject`)
- [x] Variables de entorno configuradas (`.env`, `.env.example`, `.gitignore`)
- [x] `settings.py` configurado con django-environ, idioma español, zona horaria El Salvador
- [x] `README.md` creado
- [x] Primer commit y push a GitHub
- [x] App `core` creada con `ModeloBase`, `base.html`, `sidebar.html`, home
- [x] Definir librería de UI/CSS → **Bootstrap 5 + Bootstrap Icons vía CDN**
- [x] Layout de dashboard con sidebar lateral (reemplaza navbar top)
- [x] Footer eliminado (sistema de control interno)
- [x] App `seguridad` creada y registrada
- [x] Modelo `Usuario` con `AbstractUser` + `AUTH_USER_MODEL` configurado
- [x] Login y logout implementados
- [x] CRUD de usuarios completo (lista, crear, editar, eliminar, detalle)
- [x] CRUD de roles completo (lista, crear, editar, eliminar, gestión de usuarios por rol)
- [x] Protección de vistas con `@login_required` + `@permission_required`
- [x] Control de permisos en templates con `{% if perms.app.codename %}`
- [x] Sistema de modales: confirmación de eliminación y mensajes del sistema
- [x] CSS y JS separados en archivos estáticos por app (no inline en HTML)
- [x] Buscador y ordenamiento por columnas en lista de usuarios (JS vanilla)

Pendiente inmediato:
- [ ] Agregar campo `debe_cambiar_password` al modelo Usuario (migración)
- [ ] Pantalla "Mi Perfil"
- [ ] Cambio de contraseña propia
- [ ] Reseteo de contraseña por admin
- [ ] Middleware para forzar cambio de contraseña
- [ ] Extraer plantilla `plantilla_django` antes de empezar inventario
- [ ] Crear app `inventario`

Pendiente de mediano plazo:
- [ ] Implementar CRUD en `inventario` (productos y categorías)

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

```python
# Ejemplo de uso en otra app:
from core.models import ModeloBase

class Producto(ModeloBase):
    nombre = models.CharField(max_length=200)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
```

### Herencia de templates desde `core/base.html`

**Decisión**: existe un `base.html` en la app `core` que define la estructura HTML común. Todas las páginas heredan de él con `{% extends "core/base.html" %}`.

**Por qué**:
- Cambios en menú/footer/head se aplican una sola vez
- Consistencia visual garantizada
- Cada página solo se preocupa por su contenido

**No crear páginas HTML completas sin extender de `base.html`.**

### Parciales sin guion bajo

**Decisión**: los archivos parciales (fragmentos incluidos con `{% include %}`) no llevan guion bajo al inicio.

**Por qué**: preferencia del equipo por nombres limpios. `navbar.html` en lugar de `_navbar.html`.

### Namespace en URLs con `app_name`

**Decisión**: cada `urls.py` de app define `app_name` para usar namespaces en los `{% url %}`.

**Por qué**: evita colisiones de nombres entre apps. Se referencia como `{% url 'core:home' %}`, `{% url 'inventario:lista_productos' %}`, etc.

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
- **No usar guion bajo** en nombres de archivos HTML/CSS/JS parciales

### Bootstrap 5 + Bootstrap Icons vía CDN, NO instalación de paquete

**Decisión**: usar Bootstrap 5 y Bootstrap Icons cargados desde CDN en `base.html`.

**Por qué**:
- Cero dependencias extra en `requirements.txt`
- Sin paso de compilación ni configuración adicional
- Suficiente para una demo funcional
- Para producción en red interna sin internet: descargar los archivos y servirlos como estáticos

**No instalar `django-bootstrap5` ni ningún paquete de UI** sin que el equipo lo decida.

### Layout de dashboard con sidebar lateral

**Decisión**: la navegación principal va en un sidebar lateral izquierdo (`core/templates/core/sidebar.html`), no en una barra superior. No hay footer.

**Por qué**:
- Patrón estándar de sistemas de gestión internos
- El footer no aplica para un sistema de control interno
- El sidebar tiene secciones por módulo (Seguridad, Inventario) con íconos de Bootstrap Icons

**No agregar navbar superior ni footer** — el sidebar es el único elemento de navegación.

### Modelo Usuario extiende AbstractUser, NO ModeloBase

**Decisión**: `seguridad.Usuario` hereda de `django.contrib.auth.models.AbstractUser` únicamente.

**Por qué**:
- `AbstractUser` ya provee `is_active`, `date_joined` y `last_login` — equivalentes a los campos de `ModeloBase`
- Mezclar ambas clases genera conflictos en la herencia de Django
- Es la única excepción a la regla de heredar `ModeloBase`

**Todos los demás modelos** (Producto, Categoria, etc.) **sí deben heredar `ModeloBase`**.

### Roles = Groups de Django

**Decisión**: usar el modelo `django.contrib.auth.models.Group` como sistema de roles. No se crea un modelo `Rol` propio.

**Por qué**:
- Django ya tiene un sistema de grupos y permisos integrado y probado
- Evita duplicar funcionalidad
- Se muestra como "Roles" en la interfaz, pero en el código es `Group`

### Protección de vistas: doble decorador obligatorio

**Decisión**: toda vista protegida usa `@login_required` seguido de `@permission_required(raise_exception=True)`, siempre en ese orden.

**Por qué**:
- `@login_required` va primero (decorador externo): si el usuario no está autenticado, redirige al login
- `@permission_required` va segundo (decorador interno): si no tiene el permiso, lanza 403
- Si se invierte el orden, un usuario no autenticado recibe 403 en lugar de ser redirigido al login

```python
@login_required
@permission_required('seguridad.view_usuario', raise_exception=True)
def lista_usuarios(request):
    ...
```

**Nunca usar `@permission_required` sin `@login_required` encima.**

### Permisos filtrados por apps del negocio

**Decisión**: al asignar permisos a roles, solo se muestran los permisos de las apps `seguridad` e `inventario`. Los permisos de Django interno (auth, admin, contenttypes, etc.) se excluyen.

**Por qué**: los permisos de Django internos no son relevantes para el negocio y confundirían al usuario.

```python
APPS_NEGOCIO = ['seguridad', 'inventario']
Permission.objects.filter(content_type__app_label__in=APPS_NEGOCIO)
```

### Modales controlados con JS vanilla, sin depender de Bootstrap JS

**Decisión**: los modales de `base.html` se controlan manipulando clases y estilos directamente desde `main.js`, sin llamar a `bootstrap.Modal` ni a ninguna función de Bootstrap JS.

**Por qué**:
- jsDelivr puede devolver un archivo cuyo hash difiere del atributo `integrity` del `<script>` — el browser bloquea el script por SRI y `bootstrap` queda como `undefined`
- El CSS de Bootstrap sí carga correctamente, así que el estilo visual del modal funciona
- Controlar el modal con JS vanilla (`el.classList.add('show')`, backdrop manual) es suficiente y elimina la dependencia

**Cómo funciona**:
- Los botones de eliminar tienen `data-accion="eliminar"` con los datos necesarios
- `main.js` escucha clicks con `event.target.closest('[data-accion="eliminar"]')` y llama a `mostrarModal(el)`
- `mostrarModal` agrega `display: block`, clase `show`, `modal-open` al body, y crea el backdrop
- `ocultarModal` revierte todo y elimina el backdrop del DOM
- Los botones con `data-bs-dismiss="modal"` son interceptados por el mismo `main.js`

**No agregar lógica de modales que dependa de `bootstrap.Modal`.**

### SRI en CDN de Bootstrap

**Decisión**: el atributo `integrity` en los tags de Bootstrap CDN debe mantenerse actualizado con el hash real del archivo servido.

**Por qué**: jsDelivr puede actualizar el contenido de un archivo sin cambiar su versión (raro pero ocurrió con `bootstrap@5.3.3`). Si el hash no coincide, el browser bloquea el script silenciosamente — aparece como `Failed to find a valid digest in the 'integrity' attribute` en la consola.

**Si Bootstrap JS deja de funcionar**, verificar en DevTools → Network si el script tiene error de integridad y actualizar el hash en `base.html`.

### Modelo Usuario tiene flag `debe_cambiar_password`

**Decisión**: el modelo `Usuario` incluye un campo `debe_cambiar_password` (BooleanField, default False) que se pone en True cuando un admin resetea la contraseña o cuando se crea un usuario nuevo.

**Por qué**:
- Forzar al usuario a establecer su propia contraseña después del reseteo
- Evitar que el admin conozca la contraseña final del usuario
- Buena práctica de seguridad estándar

### Middleware ForzarCambioPasswordMiddleware

**Decisión**: existe un middleware en `seguridad/middleware.py` que intercepta cada request. Si el usuario está logueado y tiene `debe_cambiar_password=True`, lo redirige a la vista de cambio de contraseña.

**Excepciones permitidas** (no redirige):
- URL de cambio de contraseña (sino loop)
- URL de logout (para que pueda salir si quiere)
- Archivos estáticos
- Admin de Django

**Posición en MIDDLEWARE**: debe ir después de `AuthenticationMiddleware` porque necesita `request.user` ya cargado.

### Pantalla "Mi Perfil" como hub del usuario

**Decisión**: existe una pantalla `/seguridad/mi-perfil/` que sirve como punto central para que el usuario vea sus datos y acceda a acciones relacionadas con su cuenta (cambio de contraseña por ahora; foto de perfil, preferencias, sesiones activas en el futuro).

**No agregar opciones de cuenta directamente al sidebar** — todo lo relacionado a la cuenta del usuario va dentro de "Mi Perfil".

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
