# 1 Build
FROM node:14-alpine as builder
WORKDIR /app

COPY package*.json yarn*.lock ./
RUN npm install
COPY . .
CMD ["yarn","start"]
