FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY dist/ ./dist/

EXPOSE 3003

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -q --spider http://localhost:3003/health || exit 1

CMD ["node", "dist/index.js", "--http"]
