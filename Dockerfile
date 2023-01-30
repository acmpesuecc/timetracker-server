FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
EXPOSE 4000
COPY . .
ENV NODE_ENV=production
CMD [ "npm", "start" ]
