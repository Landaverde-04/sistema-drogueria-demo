# Sistema Drogueria - Demo

Sistema demo de gestion para droguerias desarrollado por Binary Duo.
Sirve como carta de presentacion ante clientes potenciales.

## Stack tecnologico

- Python 3.12
- Django 6.x
- SQLite
- Templates nativos de Django + JavaScript vanilla

## Modulos

- `core` — base tecnica compartida (plantillas, modelos abstractos)
- `seguridad` — usuarios, roles, permisos, login
- `inventario` — productos, categorias

## Setup local

### 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd sistema-drogueria-demo
```

### 2. Crear y activar el entorno virtual

```bash
python3 -m venv venv

# Linux / Mac
source venv/bin/activate

# Windows
venv\Scripts\activate
```

### 3. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 4. Configurar variables de entorno

```bash
cp .env.example .env
```

Editar `.env` y completar los valores:

```
DEBUG=True
SECRET_KEY=<generar con: python3 -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())">
ALLOWED_HOSTS=localhost,127.0.0.1
```

### 5. Aplicar migraciones

```bash
python3 manage.py migrate
```

### 6. Correr el servidor

```bash
python3 manage.py runserver
```

Abrir en el navegador: http://127.0.0.1:8000

## Equipo

Binary Duo — Kevin y Samuel
