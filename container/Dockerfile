FROM node:14-alpine

WORKDIR /container

COPY package*.json .
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080
CMD ["npm", "start"]