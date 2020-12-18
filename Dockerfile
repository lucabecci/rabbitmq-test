FROM node:12.9.0



WORKDIR /.

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]