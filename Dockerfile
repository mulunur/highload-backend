FROM alpine:latest 

RUN apk add nodejs npm postgresql

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]

