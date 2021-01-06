FROM node:15.5.1 as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM nginx:1.19.6-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /var/www
CMD ["nginx", "-g", "daemon off;"]
