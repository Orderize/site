FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env
COPY .env.production .env.production

ENV NODE_ENV=production

RUN npm run build

FROM nginx:alpine

COPY nginx.config /etc/nginx/conf.d/default.conf 

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]