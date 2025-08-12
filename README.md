# 📌 Proyecto Lista de Tareas — NestJS + Vue 3 + TypeORM (SQLite)

## Link para ver desplegado en Render:

## 👉👉 https://metnet-test-4.onrender.com/ 👈👈

## 🚀 Instrucciones para correr el proyecto

### 1. Clonar repositorio

git clone https://github.com/AndresGarcia96/metnet_test.git
cd metnet_test

## Backend — NestJS + TypeORM + SQLite

Ir a la carpeta api:
cd /api

### 2. Preparar backend

Instalar dependencias con el comando:
-> npm install

Crear archivo .env con las siguientes variables:
-> TYPEORM_DATABASE=./db.sqlite
-> API_PORT=3001

Levantar en modo desarrollo con el comando:
-> npm run dev

Backend estará disponible en:
-> http://localhost:3001

## Frontend — Vue 3 + Vite + Tailwind

Ir a la carpeta client:
cd /client

### 3. Preparar backend

Instalar dependencias:
-> npm install

Crear archivo .env.local con las siguientes variables:
-> VITE_API_URL=http://localhost:3001

Levantar en modo desarrollo con el comando:
-> npm run dev

Frontend estará disponible en:
-> http://localhost:4001

!Listo ya podrás interactuar con la aplicación!


