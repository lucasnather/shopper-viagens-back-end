FROM node:alpine3.20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i 

COPY . . 

COPY .env .env

EXPOSE 8080

RUN npx prisma generate
CMD ["npm", "run", "dev"]