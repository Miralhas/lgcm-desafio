FROM node:24-alpine as builder

WORKDIR /app

COPY . ./

RUN npm ci --include=dev

RUN npm run build

EXPOSE 3002

CMD ["npm", "run", "start"]