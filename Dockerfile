# We use node 12 because knex could be not compatible with node v13 and higher. 
FROM node:12.22.1-alpine3.11

RUN apk update
RUN apk add nano
RUN apk add redis
RUN apk add bridge-utils
RUN apk add autoconf 
RUN apk add g++ make libressl-dev
RUN apk add net-tools
RUN apk add xz
RUN apk add tcpdump
RUN apk add unzip
RUN apk add git
RUN apk add alien libaio unixodbc
RUN node -v
RUN apk add curl
RUN apk add python2 python3 
#RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN npm install -g typescript
RUN npm install pm2 -g
RUN npm install knex -g

RUN apk add sqlite
RUN apk add openrc

RUN mkdir /db

WORKDIR /root

RUN git clone https://github.com/avionic-iot-aviot/DBApp 

WORKDIR /root/DBApp/backend

RUN npm install && npm run be:build && npm run be:migrate:staging

WORKDIR /root

ADD deploy.sh /root/


CMD ["sh", "./deploy.sh"]

