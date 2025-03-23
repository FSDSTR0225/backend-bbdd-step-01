# API de Usuarios en Memoria - Step 1

Este proyecto implementa una API RESTful para gestionar usuarios utilizando un array en memoria como almacenamiento temporal. Sirve como punto de partida para aprender conceptos básicos de desarrollo backend antes de migrar a una base de datos.

## Tecnologías utilizadas

- Node.js
- Express
- Nodemon (para desarrollo)

## Estructura del proyecto

```
proyecto/
├── index.js       # Archivo principal con toda la lógica
├── package.json   # Configuración del proyecto
└── README.md      # Documentación
```

## Configuración e instalación

1. Clonar el repositorio
2. Instalar dependencias:
   ```
   npm install
   ```
3. Iniciar el servidor en modo desarrollo:
   ```
   npx nodemon index.js
   ```
   > Este comando reiniciará automáticamente el servidor cuando detecte cambios en los archivos.

4. El servidor estará disponible en http://localhost:3000

## Almacenamiento en memoria

Este proyecto utiliza un array en JavaScript para almacenar los datos temporalmente:

```javascript
// Base de datos en memoria para usuarios
const usuarios = [
    { id: 1, nombre: 'Juan', password: '1234' },
    { id: 2, nombre: 'Ana', password: '5678' },
    { id: 3, nombre: 'Pedro', password: 'abcd' },
    { id: 4, nombre: 'María', password: 'efgh' }
];
```

> ⚠️ **Importante**: Al reiniciar el servidor, todos los cambios realizados en los datos se perderán y se volverá al estado inicial.

## Endpoints disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/usuarios` | Obtener todos los usuarios |
| GET | `/usuarios/:id` | Obtener un usuario específico |
| POST | `/usuarios` | Crear un nuevo usuario |
| PUT | `/usuarios/:id` | Actualizar un usuario completamente |
| PATCH | `/usuarios/:id` | Actualizar parcialmente un usuario (solo el nombre) |
| DELETE | `/usuarios/:id` | Eliminar un usuario |
| POST | `/login` | Iniciar sesión |

### Ejemplos de peticiones

#### Obtener todos los usuarios
```
GET /usuarios
```

**Respuesta:**
```json
[
  { "id": 1, "nombre": "Juan", "password": "1234" },
  { "id": 2, "nombre": "Ana", "password": "5678" },
  { "id": 3, "nombre": "Pedro", "password": "abcd" },
  { "id": 4, "nombre": "María", "password": "efgh" }
]
```

#### Obtener un usuario específico
```
GET /usuarios/2
```

**Respuesta:**
```json
{ "id": 2, "nombre": "Ana", "password": "5678" }
```

#### Crear un nuevo usuario
```
POST /usuarios
Content-Type: application/json

{
  "nombre": "Carlos",
  "password": "1q2w3e"
}
```

**Respuesta:**
```json
{ "msg": "Usuario creado", "id": 5 }
```

#### Actualizar un usuario
```
PUT /usuarios/3
Content-Type: application/json

{
  "nombre": "Roberto",
  "password": "newpass"
}
```

**Respuesta:**
```json
{ "msg": "Usuario actualizado" }
```

#### Actualizar parcialmente un usuario
```
PATCH /usuarios/3
Content-Type: application/json

{
  "nombre": "Roberto"
}
```

**Respuesta:**
```json
{
  "id": 3,
  "nombre": "Roberto",
  "password": "abcd"
}
```

#### Eliminar un usuario
```
DELETE /usuarios/4
```

**Respuesta:**
```json
{ "msg": "Usuario eliminado" }
```

#### Iniciar sesión
```
POST /login
Content-Type: application/json

{
  "nombre": "Juan",
  "password": "1234"
}
```

**Respuesta (exitosa):**
```json
{ "msg": "Login exitoso", "usuario": "Juan" }
```

**Respuesta (fallida):**
```json
{ "msg": "Credenciales incorrectas" }
```

## Manejo de errores

La API incluye validaciones básicas:

- Verifica que existan los campos requeridos
- Comprueba si el usuario existe antes de actualizarlo o eliminarlo
- Valida credenciales durante el login

Los errores devuelven códigos HTTP apropiados:
- `400`: Error de validación (faltan campos requeridos)
- `403`: Credenciales incorrectas
- `404`: Recurso no encontrado

## Limitaciones

Este proyecto tiene algunas limitaciones por diseño:

1. **Persistencia**: Los datos se almacenan en memoria, por lo que se pierden al reiniciar el servidor
2. **Seguridad**: Las contraseñas se almacenan en texto plano (no se recomienda para producción)
3. **Escalabilidad**: No es adecuado para aplicaciones con muchos usuarios o datos

## Próximos pasos

En la siguiente fase del proyecto (Step 2), migraremos este almacenamiento en memoria a una base de datos MongoDB para lograr:

- Persistencia de datos
- Mejor estructura del código (MVC)
- Validaciones más robustas
- Consultas más avanzadas

