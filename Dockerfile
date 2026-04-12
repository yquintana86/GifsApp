# 1. Base stage (dependencies)
FROM node:22-alpine AS base

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install


# 2. Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Copy dependencies from base stage
COPY --from=base /app/node_modules ./node_modules

# Copy app files
COPY . .

# Build app
RUN npx ng build --configuration production --base-href=/ --deploy-url=/

# 3. Serve stage
FROM nginx:alpine AS runtime

COPY --from=build /app/dist/gifs-app/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

