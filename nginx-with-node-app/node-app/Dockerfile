FROM node:21-alpine as builder

WORKDIR /home/app
COPY package*.json .
RUN npm install

FROM node:21-slim

WORKDIR /home/app
COPY --from=builder /home/app/node_modules/ /home/app/node_modules/
COPY ./src/ /home/app/src

EXPOSE 3000

ENTRYPOINT [ "node", "./src/index.js" ]