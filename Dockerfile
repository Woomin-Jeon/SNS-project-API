FROM node:12

WORKDIR /facebook-api

COPY package.json .
COPY package-lock.json .

COPY . .

RUN npm install --production

EXPOSE 7000
CMD [ "npm", "start" ]
