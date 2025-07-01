# ─── Stage 1: Build ───────────────────────────────
FROM node:20.2.0-bullseye-slim AS build

# Install dumb-init to handle process signals
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy only the lock/package files for better caching
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm ci

# Copy the rest of the codebase
COPY . .

# Run the full build (includes clean, lint, tsc, copy-assets)
RUN npm run build

# ─── Stage 2: Runtime ─────────────────────────────
FROM node:20.2.0-bullseye-slim

# Install dumb-init again for PID 1 signal handling
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

WORKDIR /app

# Copy production dependencies only
COPY --from=build /app/package*.json ./
RUN npm ci --omit=dev

# Copy built files
COPY --from=build /app/dist ./dist
COPY --from=build /app/assets ./assets  # If you use an assets folder
COPY --from=build /app/_moduleAliases ./_moduleAliases  # optional

USER appuser

ENV NODE_ENV=production
EXPOSE 3000

# Use dumb-init as entrypoint
ENTRYPOINT ["dumb-init", "--"]

# Use JSON-form CMD format
CMD ["node", "dist/server.js"]
