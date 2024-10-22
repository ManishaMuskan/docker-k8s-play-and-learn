FROM node:16-alpine AS app_builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=app_builder /app/build /usr/share/nginx/html