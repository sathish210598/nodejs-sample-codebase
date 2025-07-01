# ─── Stage 1: Build ───────────────────────────────
FROM node:20.2.0-bullseye-slim AS build

# Silence interactive prompts and reduce logs
ENV DEBIAN_FRONTEND=noninteractive

# Install dumb-init silently
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends dumb-init > /dev/null 2>&1 && \
    rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Install full dependencies for build
COPY package*.json ./
RUN npm ci

# Copy rest of the app and build
COPY . .
RUN npm run build

# ─── Stage 2: Runtime ─────────────────────────────
FROM node:20.2.0-bullseye-slim

ENV DEBIAN_FRONTEND=noninteractive

# Install dumb-init silently
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends dumb-init > /dev/null 2>&1 && \
    rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

WORKDIR /app

# Install only production deps
COPY --from=build /app/package*.json ./
RUN npm ci --omit=dev

# Copy built output
COPY --from=build /app/dist ./dist
COPY --from=build /app/assets ./assets  # Optional: only if you use /assets
COPY --from=build /app/_moduleAliases ./_moduleAliases  # Optional

USER appuser

ENV NODE_ENV=production
EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server.js"]
