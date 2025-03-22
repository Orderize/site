FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

COPY .env .env
COPY .env.production .env.production

ENV NODE_ENV=production

RUN npm run build

