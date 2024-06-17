# Chatapp

Es handelt sich bei diesem Projekt um eine Echtzeit Chatapp inkl. Registrierung / Login via Credentials und Speicherung / Abrufen der Daten von einer postgres Datenbank.

## Genutzte Technologien / Libraries

- Frontend & Backend - NextJS
- Styling - TailwindCSS
- Login & Register - Next-Auth
- Database - Postgres
- ORM - PrismaIO
- Validation - ZOD
- Forms - React-hook-forms
- Full-duplex connection - SocketIO
- Password encryption - bcryptjs

## Setup

To run the local server:

```sh
yarn dev
```

To run the database:

```sh
docker compose up
```

-- Now the local server should be accessible under: localhost:3000 --

Additionally, a local web-interface for the database can be started via prisma:

```sh
yarn prisma studio
```

-- This can be accessed via localhost:5555
