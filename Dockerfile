
FROM node:14

RUN mkdir /ptolemaios

WORKDIR /ptolemaios

COPY ./package.json /ptolemaios

COPY . /ptolemaios

RUN yarn --pure-lockfile

RUN yarn install

RUN npm rebuild node-sass

RUN yarn build
