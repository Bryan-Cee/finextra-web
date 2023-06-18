FROM node:alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

COPY pnpm-lock.yaml ./

COPY ./patches /app/patches

RUN npm install --global pnpm

ADD . ./

RUN pnpm install

RUN npx prisma generate

RUN chmod +x ./bin/startup.sh
