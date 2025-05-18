# Gunakan base image Node.js dengan Yarn terinstal
FROM node:18-alpine

# Set direktori kerja di dalam container
WORKDIR /app

# Salin file dependency
COPY package.json yarn.lock ./

# Install dependensi
RUN yarn install

# Salin semua file proyek
COPY . .

# Jalankan perintah build Next.js
RUN yarn build

# Expose port Next.js
EXPOSE 3000

# Perintah untuk start Next.js app
CMD ["yarn", "start"]
