# API SWAP - Node.js + TypeScript

API REST desarrollada con Node.js, Express y TypeScript para la gestión de artículos publicados en una plataforma tipo marketplace universitario SWAP.

# Descripción

Este proyecto corresponde al Taller 3 de la asignatura, donde se implementa una API REST utilizando Node.js y TypeScript.

La información se almacena temporalmente en un archivo `db.json`, simulando una base de datos sencilla sin utilizar motores como MySQL o MongoDB.

# Público objetivo

Estudiantes universitarios que desean publicar, vender o intercambiar artículos académicos y tecnológicos.

Ejemplos:

- Libros
- Cuadernos
- Audífonos
- Accesorios tecnológicos
- Material académico

# Objetivo del proyecto

Permitir la gestión de productos mediante endpoints REST para:

- Consultar productos
- Crear publicaciones
- Actualizar artículos
- Eliminar productos

# Tecnologías utilizadas

- Node.js
- Express
- TypeScript
- Nodemon
- body-parser
- JSON como almacenamiento local

# Estructura del proyecto

```bash
MY-API-SWAP/
│
├── db.json
├── index.ts
├── package.json
├── tsconfig.json
├── package-lock.json
└── README.md


Servidor:

http://localhost:3000
Scripts npm
Script	Descripción
npm run dev	Ejecuta el servidor en desarrollo
npm run build	Compila TypeScript a JavaScript
npm start	Ejecuta la versión compilada
Modelo de datos
Producto
interface Product {
  id: number;
  name: string;
  description?: string;
  price?: number;
  status?: string;
  contact?: string;
}
Endpoints implementados
1. Ruta principal
GET /

Retorna mensaje de bienvenida.

Response
"Bienvenido a mi API SWAP con Node TS"
2. Obtener todos los productos
GET /products
Response 200
[
  {
    "id": 1,
    "name": "Libro Cálculo",
    "description": "Libro usado",
    "price": 40000,
    "status": "disponible",
    "contact": "usuario@uan.edu.co"
  }
]
3. Obtener producto por ID
GET /products/:id
Parámetros
Nombre	Tipo
id	number
Ejemplo
GET /products/1
Response 200
{
  "id": 1,
  "name": "Libro Cálculo",
  "description": "Libro usado",
  "price": 40000,
  "status": "disponible",
  "contact": "usuario@uan.edu.co"
}
Response 404
{
  "error": "Producto no encontrado"
}
4. Crear producto
POST /products
Body
{
  "name": "Mouse Logitech",
  "description": "Mouse inalámbrico",
  "price": 30000,
  "status": "disponible",
  "contact": "usuario@uan.edu.co"
}
Response 201
{
  "id": 10,
  "name": "Mouse Logitech",
  "description": "Mouse inalámbrico",
  "price": 30000,
  "status": "disponible",
  "contact": "usuario@uan.edu.co"
}
5. Actualizar producto
PUT /products/:id
Body
{
  "price": 50000,
  "status": "vendido"
}
Response 200
{
  "message": "Articulo actualizado correctamente"
}
6. Eliminar producto
DELETE /products/:id
Response 200
{
  "message": "Producto eliminado correctamente"
}
Response 404
{
  "error": "Producto no encontrado"
}
Inventario de endpoints
Método	Ruta	Descripción	Autenticación
GET	/	Mensaje de bienvenida	No
GET	/products	Obtener todos los productos	No
GET	/products/:id	Obtener producto por ID	No
POST	/products	Crear producto	No
PUT	/products/:id	Actualizar producto	No
DELETE	/products/:id	Eliminar producto	No
Seguridad

Actualmente ningún endpoint requiere autenticación.

Endpoint	Requiere Token
Todos	No
Validaciones implementadas
Verificación de existencia del producto.
Manejo básico de errores.
Validación de nombre obligatorio en POST.
Respuestas HTTP:
200 OK
201 Created
400 Bad Request
404 Not Found
Ejemplos con CURL
Obtener todos los productos
curl http://localhost:3000/products
Obtener producto por ID
curl http://localhost:3000/products/1
Crear producto
curl -X POST http://localhost:3000/products \
-H "Content-Type: application/json" \
-d '{
"name":"Teclado Redragon",
"description":"Teclado mecánico",
"price":120000,
"status":"disponible",
"contact":"usuario@uan.edu.co"
}'
Actualizar producto
curl -X PUT http://localhost:3000/products/1 \
-H "Content-Type: application/json" \
-d '{
"price":50000
}'
Eliminar producto
curl -X DELETE http://localhost:3000/products/1
Colección de Postman

La colección de Postman incluye:

GET /products
GET /products/:id
POST /products
PUT /products/:id
DELETE /products/:id
Endpoints implementados vs documentados
Implementados
GET /
GET /products
GET /products/:id
POST /products
PUT /products/:id
DELETE /products/:id
Solo documentados

Actualmente todos los endpoints documentados fueron implementados.

Autor

Proyecto académico desarrollado para el Taller 3.

Tecnología en Construcción de Software
Universidad Antonio Nariño
