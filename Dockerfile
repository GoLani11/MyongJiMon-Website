# syntax=docker/dockerfile:1
FROM node:18

ENV HOST=0.0.0.0
WORKDIR /app/frontend

COPY /frontend/ .
#RUN npm install react-scripts --save
#RUN npm install web-vitals --save
#RUN npm install react-router-dom --save
RUN npm install

RUN npm run build

CMD ["npm", "start"]
