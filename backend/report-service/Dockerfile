FROM node:20.10.0-alpine

RUN apk add --no-cache curl

WORKDIR /app

COPY report-service/package*.json ./
COPY report-service/tsconfig.json ./
RUN npm install

COPY report-service/src ./src
COPY shared ./shared

RUN npm run build

EXPOSE 23004

CMD ["node", "dist/src/main.js"]