# Tahap 1: Build
# Gunakan base image Node.js resmi
FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Tahap 2: Produksi
# FROM node:18-alpine AS production

WORKDIR /app

COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/node_modules node_modules

EXPOSE 3000

CMD ["yarn", "dev"]
