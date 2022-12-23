FROM node:alpine

WORKDIR /usr/nodeApp

COPY ./ ./

RUN npm install

EXPOSE 3000

CMD ["npm" , "start"]