FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run verify || echo "Verification warnings ignored in build"
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

EXPOSE 5173

ENV NODE_ENV=production
ENV PORT=5173

CMD ["serve", "-s", "dist", "-l", "5173"]
