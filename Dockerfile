FROM node:16.13.2-alpine

RUN apk update && apk add bash
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
CMD bash

RUN mkdir /TS-test
WORKDIR /TS-test

COPY . .

RUN rm -rf node_modules
RUN rm -rf package-lock.json
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install --force
RUN tsc --build --clean
