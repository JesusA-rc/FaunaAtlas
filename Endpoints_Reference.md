# Documentación de Endpoints — Fauna Atlas API

Esta API utiliza **OpenAPI** (Swagger) para la documentación técnica.

## Acceso a la Documentación
*   **OpenAPI Spec**: `http://localhost:5069/openapi/v1.json`

### Cómo importar en Postman:
1.  Abre Postman.
2.  Haz clic en **Import**.
3.  Pega la URL del `openapi/v1.json`.
4.  Postman generará automáticamente una colección con todos los endpoints, parámetros y esquemas de validación.

---

## Resumen de Endpoints Principales

### Públicos (No requieren Token)
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `POST` | `/api/account/login` | Inicia sesión y devuelve un Token JWT. |
| `POST` | `/api/account/register` | Registra un nuevo explorador. |
| `GET` | `/api/noticias` | Obtiene el feed de noticias destacadas. |
| `GET` | `/api/especies` | Catálogo completo de especies. |
| `GET` | `/api/habitats` | Listado de hábitats y regiones. |
| `GET` | `/api/avistamientos` | Feed público de avistamientos recientes. |

### Protegidos (Requieren cabecera `Authorization: Bearer <token>`)
| Método | Endpoint | Rol Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/animales` | **Admin** | Crea una nueva especie. |
| `PUT` | `/api/animales/{id}` | **Admin** | Actualiza datos de una especie. |
| `DELETE` | `/api/animales/{id}` | **Admin** | Elimina una especie del sistema. |
| `POST` | `/api/habitats` | **Admin** | Registra un nuevo ecosistema. |
| `POST` | `/api/avistamientos` | **Autenticado** | Registra un nuevo avistamiento. |
| `PUT/DELETE` | `/api/habitats/{id}` | **Admin** | Gestión avanzada de hábitats. |
| `PUT/DELETE` | `/api/noticias/{id}` | **Admin** | Gestión avanzada de noticias. |

---

## Seguridad y Validación
- **Autenticación**: Los endpoints protegidos validan la firma de un Token JWT.
- **Validación de Datos**: Todas las entradas son procesadas por **FluentValidation**. Si los datos son inválidos, el API responderá con un `400 Bad Request` y un objeto JSON detallando cada error de campo.
