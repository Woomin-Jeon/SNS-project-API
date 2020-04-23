FROM node:12

WORKDIR /facebook-api

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 7000
CMD [ "nodemon", "index.js" ]
