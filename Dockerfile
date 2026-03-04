FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN npm ci

ARG API_URL

RUN echo "API_URL=$API_URL" > .env.production

RUN npm run build


FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/spa /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]