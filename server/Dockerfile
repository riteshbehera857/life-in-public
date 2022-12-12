FROM node:16

WORKDIR /app

COPY ./package*.json ./
COPY ./yarn.lock ./

RUN yarn

COPY . .

# RUN yarn build

EXPOSE 8000

CMD ["yarn", "dev"]

