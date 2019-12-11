FROM node:10.17-buster AS builder

ENV WORKDIR /tmp/anfisa-ui
ENV BASE_URL /
ENV VUE_APP_API_URL /app

RUN mkdir -p $WORKDIR
WORKDIR $WORKDIR

COPY package*.json $WORKDIR/
RUN npm install && npm install --save-dev --unsafe-perm node-sass

COPY . $WORKDIR
RUN npm run build --mode=production

FROM nginx:1.17

COPY --from=builder /tmp/anfisa-ui/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
