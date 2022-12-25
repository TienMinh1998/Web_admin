# 1 Build
FROM node:14-alpine as builder
WORKDIR /app
COPY package*.json yarn*.lock ./
RUN npm install
COPY . .
RUN npm run build
# 2 Serve 
From nginx:1.21.6-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]