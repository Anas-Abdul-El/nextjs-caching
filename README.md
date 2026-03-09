# Next.js & Redis Caching Tutorial 📚

This repository contains a small [Next.js 13](https://nextjs.org/) application that serves as a hands‑on tutorial for caching strategies in the App Router and integrating Redis as a backend cache/store.

> **Goal:** demonstrate both **edge/renderer caching** with `next/cache` tags and **Redis data caching** using the official `redis` client.

---

## 📁 Project Structure

- `src/app/caching/[id]/page.tsx` – dynamic route showing `cacheTag` & `revalidateTag` examples.
- `src/app/redis` – pages for persisting and reading book entries from Redis.
  - `ArrOfBooks.tsx` – helper that fetches from a sorted set + hashes.
- `src/app/create` – a form that calls a server action to add books to Redis.
- `src/lib/db.js` – Redis client configuration using environment variables.
- `server/create.js` – server‑side action to write to Redis (sorted set & hash).

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A running **Redis** instance (locally or in the cloud)
- Environment variables:
  - `REDIS_HOST` – host or IP of your Redis server
  - `REDIS_PORT` – port (typically `6379`)
  - `REDIS_PASSWORD` – password if your instance requires authentication

Example `.env.local`:

```env
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=
```

### Install & start

```bash
pnpm install      # install dependencies
pnpm dev          # start Next.js development server
```

Visit http://localhost:3000 in your browser.

---

## 🧠 What You Will Learn

### 1. App‑Router Caching (no external store)

Navigate to `/caching/any‑value` to experiment with the example:

- `GetRandomData` component uses **`use cache`** and calls `cacheTag('refresh')` to pin its response in the Next.js cache. The random number is generated once per tag unless the tag is revalidated.
- Clicking the **Refresh** button triggers a server action that calls `revalidateTag('refresh', '')`, demonstrating manual revalidation from the client.
- `ParamsFitch` (sic) shows how Suspense and async params work together with a dynamic route.

This setup mimics a simple in‑memory cache you can control at runtime without hitting an external store.

### 2. Redis Data Caching

The `/redis` section of the app stores and reads books from a Redis database:

- Books are indexed in a **sorted set** named `books` where the score is a generated ID.
- Individual book metadata lives in a Redis **hash** (`books:<id>`) with fields such as `title`, `author`, `rating`, and `blurb`.
- `ArrOfBooks.tsx` fetches all entries (`zRangeWithScores`) and then retrieves each hash (`hGetAll`).
- `/create` is a client component with a form; submitting it invokes the server action `createBook` in `server/create.js`.

Because Redis is extremely fast, this pattern works as a cache layer in front of a database or as the primary store in lightweight tutorials.

### Walking Through the Code

1. **`src/lib/db.js`** – creates and exports a single Redis client instance using connection config from `process.env`.
2. **`server/create.js`** – demonstrates a server action (`'use server'`) for writing to Redis and redirecting.
3. **`src/app/redis/ArrOfBooks.tsx`** – an asynchronous component that reads from Redis; uses `await` at the top level for SSR.
4. **`src/app/caching/[id]/page.tsx`** – shows how to apply `cacheTag`/`revalidateTag` and mix in Suspense with dynamic params.

### Extending the Tutorial

- Add TTLs to Redis keys for automatic expiration.
- Layer a database and use Redis as a read‑through/write‑back cache.
- Explore Next.js `fetch` caching with `revalidate` options or edge middleware.

---

## 📦 Dependencies

- `next` – framework
- `react` / `react-dom` – UI
- `redis` – official Redis client (v5)

Dependencies are managed via **pnpm**.

---

## 🛠 Deployment

Follow normal Next.js deployment steps. Ensure your production environment has access to a Redis instance and the environment variables are set.

> Vercel, Fly.io, or your own server will all work. Use a Redis provider like Upstash, Redis Cloud, or a self‑hosted server.

---

## 📚 Additional Resources

- [Next.js Caching](https://nextjs.org/docs/app/building-your-application/caching)
- [Redis Documentation](https://redis.io/docs/)
- [Redis Node.js Client](https://github.com/redis/node-redis)

---

Happy caching! 🎯

