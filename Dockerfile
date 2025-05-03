FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

# Stage 2: Serve

WORKDIR /app

COPY --from=builder /app ./

RUN yarn global add serve
EXPOSE 3000

CMD ["yarn", "dev"]
