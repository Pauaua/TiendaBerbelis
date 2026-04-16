# Berbelis – Tienda de Productos Naturales

Aplicación web de e-commerce para la venta de productos orgánicos de salud y estética. Construida con Next.js, Prisma y PostgreSQL, lista para desplegar en Vercel.

## Stack tecnológico

- **Next.js 15** – App Router, Server & Client Components
- **TypeScript**
- **Tailwind CSS v4**
- **Prisma 5** – ORM
- **PostgreSQL** – Base de datos (recomendado: [Neon](https://neon.tech))
- **Vercel** – Plataforma de despliegue

## Funcionalidades

- Landing page con productos destacados, sección "¿Quiénes somos?" y testimonios
- Catálogo de productos con paginación, favoritos y filtro por categoría
- Carrito de compras persistente (localStorage)
- Checkout con formulario de datos de entrega
- Página de contacto
- Panel de administración para gestionar productos, pedidos y mensajes

## Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx               # Landing page
│   ├── productos/             # Catálogo y detalle de producto
│   ├── carrito/               # Carrito y checkout
│   ├── contacto/              # Formulario de contacto
│   ├── admin/                 # Panel de administración
│   └── api/                   # API Routes (products, orders, contact, admin)
├── components/
│   ├── Navbar.tsx
│   └── Footer.tsx
└── lib/
    ├── prisma.ts              # Singleton del cliente Prisma
    └── cart.tsx               # Contexto del carrito
```

## Instalación y configuración local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copia el archivo de ejemplo y completa los valores:

```bash
cp .env.example .env.local
```

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/berbelis?schema=public"
ADMIN_PASSWORD="tu_password_seguro"
```

### 3. Crear las tablas en la base de datos

```bash
npx prisma migrate dev --name init
```

### 4. Generar el cliente Prisma

```bash
npx prisma generate
```

### 5. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Panel de administración

Accede en `/admin` con la contraseña definida en `ADMIN_PASSWORD`.

Desde el panel puedes:
- Crear, editar y eliminar productos
- Consultar pedidos recibidos
- Leer mensajes de contacto
- Ejecutar el seed de datos iniciales

## Despliegue en Vercel

### 1. Crear base de datos en Neon

Regístrate en [neon.tech](https://neon.tech), crea un proyecto y copia la connection string.

### 2. Conectar el repositorio en Vercel

Importa el repositorio desde el [dashboard de Vercel](https://vercel.com/new).

### 3. Agregar variables de entorno

En **Settings → Environment Variables** de tu proyecto en Vercel:

| Variable | Valor |
|---|---|
| `DATABASE_URL` | Connection string de Neon |
| `ADMIN_PASSWORD` | Contraseña del panel admin |

### 4. Ejecutar migraciones post-deploy

Desde tu máquina local apuntando a la DB de producción:

```bash
DATABASE_URL="tu_url_de_neon" npx prisma migrate deploy
```

### 5. Cargar datos iniciales en producción

```bash
curl -X POST https://tu-dominio.vercel.app/api/admin/seed \
  -H "x-admin-password: tu_password_seguro"
```

## Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Inicia el servidor de producción
npm run lint     # Linter
npx prisma studio          # Explorador visual de la base de datos
npx prisma migrate dev     # Crear y aplicar migraciones
npx prisma generate        # Regenerar el cliente Prisma
```
