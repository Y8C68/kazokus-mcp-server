# Node is pinned to an exact release so a security fix is a reviewed change
# that triggers a fresh image, not whatever a floating tag resolved to.
# 22.23.4 fixes CVE-2026-111497 (Brotli decompression RCE). Dependabot
# proposes new 22.x releases; keep both stages on the same version.

# --- build stage: compile TypeScript -> dist/ ---
FROM node:22.23.4-alpine AS build

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm ci

COPY src/ ./src/
RUN npm run build

# --- runtime stage: prod deps + compiled output only ---
FROM node:22.23.4-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist/ ./dist/

EXPOSE 3003

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -q --spider http://localhost:3003/health || exit 1

CMD ["node", "dist/index.js", "--http"]
