### STAGE 1: Build ###
FROM node:16.18.1-alpine3.16 as build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/angular-twitter-decskill /usr/share/nginx/html
EXPOSE 8080
