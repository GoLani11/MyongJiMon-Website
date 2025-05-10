# syntax=docker/dockerfile:1
FROM node:18

WORKDIR /app
COPY . .
CMD ["npm", "start"]
