FROM node:20.10.0-alpine

RUN apk add --no-cache curl

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 23003

CMD ["node", "dist/main.js"]