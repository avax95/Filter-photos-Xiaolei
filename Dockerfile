FROM node:latest

RUN mkdir -p /app/service
WORKDIR /app/service

COPY . /app/service
RUN npm install

EXPOSE 3004
CMD [ "npm", "start" ]