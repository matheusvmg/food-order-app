FROM node
WORKDIR /usr/src/app
COPY package*.json .
RUN yarn cache clean
RUN yarn install
COPY . .
