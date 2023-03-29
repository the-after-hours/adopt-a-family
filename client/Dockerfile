FROM node:19-alpine
WORKDIR /client
COPY package*.json .
COPY ./tsconfig.json .
COPY . .
RUN npm ci
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "serve", "--", "--host" ]
