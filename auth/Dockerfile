FROM node
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
CMD npm start
EXPOSE 8080
