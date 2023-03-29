FROM node:19-alpine
WORKDIR /server
COPY package*.json .
COPY tsconfig.json .
COPY . .
RUN npm ci
EXPOSE 3005
CMD [ "npm", "run", "serve" ]

