# STAGE 1
FROM node:20.11.0-alpine AS build
WORKDIR usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# STAGE 2
FROM nginx:1.25-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/todo/browser /usr/share/nginx/html