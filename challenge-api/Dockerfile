FROM node:18.9.1-alpine

WORKDIR /app

# package local
RUN mkdir -p /app/node_modules && chown -R node:node /app

# package global
ENV NODE_DATA_DIR /usr/local/lib/node_modules
RUN mkdir -p "$NODE_DATA_DIR" && chown -R node:node "$NODE_DATA_DIR" && chmod 750 "$NODE_DATA_DIR"


COPY ./package.json .

#USER node
RUN npm install -g signalr-client
RUN npm install
COPY --chown=node:node . .

EXPOSE 3500
