FROM node:22.3.0-alpine AS builder

ENV PORT=8080

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

COPY . .

RUN npm run db:generate

RUN npm install

RUN npm run build

FROM builder AS production

COPY --from=builder /app/dist /app/dist

EXPOSE ${PORT}

CMD ["node", "dist/main.js"]
