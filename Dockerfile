# ─── Stage 1: build ─────────────────────────
FROM node:20.2.0-bullseye-slim AS build

# Install build tools if needed (optional)
RUN apt-get update && \
    apt-get install -y --no-install-recommends dumb-init && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy only package info first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies (production mode)
RUN npm ci --omit=dev

COPY . .

RUN npm run build  # if you have a build step like TS or webpack

# ─── Stage 2: runtime ───────────────────────
FROM node:20.2.0-bullseye-slim

# Create non-root user
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

WORKDIR /app

# Copy runtime deps and built code
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app ./

USER appuser

ENV NODE_ENV=production
EXPOSE 3000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]  # or your start file
