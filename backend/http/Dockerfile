FROM node:18.12.1

WORKDIR /usr/app

COPY . .

RUN yarn
RUN yarn prisma generate
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]