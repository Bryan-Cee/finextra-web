FROM node:alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

COPY pnpm-lock.yaml ./

COPY ./patches /app/patches

ENV PORT=8080

EXPOSE 8080

RUN groupadd -r app && useradd -r -g app app

USER app

RUN npm install -g pnpm

RUN npm install argon2

RUN pnpm install

COPY . ./

CMD [ "pnpm", "dev" ]
