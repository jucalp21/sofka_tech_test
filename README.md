# Kanban Fullstack

## Requisitos

- Docker
- Docker Compose

## Levantar el proyecto

```bash
docker compose down -v
docker compose build --no-cache
docker compose up -d
```

Ver logs del backend:

```bash
docker compose logs -f backend
```

## Accesos

| Servicio      | URL                        | Descripción                          |
| ------------- | -------------------------- | ------------------------------------ |
| Frontend      | http://localhost:5173      | Tablero Kanban (UI)                  |
| Backend (API) | http://localhost:3000/api  | Endpoints REST                       |
| Swagger Docs  | http://localhost:3000/docs | Documentación interactiva            |
| PostgreSQL    | localhost:5432             | Base de datos accesible externamente |
