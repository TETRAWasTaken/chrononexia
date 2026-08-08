# ==========================================
# Stage 1: Build Vite frontend assets
# ==========================================
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build production bundle
COPY . .
RUN npm run build

# ==========================================
# Stage 2: Production Runtime
# ==========================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled SPA dist bundle, Express server, and asset images
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/assets ./src/assets
COPY server.js ./

# Expose port (default 8080 for Azure Container Apps / App Service)
EXPOSE 8080

# Start Express backend server
CMD ["node", "server.js"]
