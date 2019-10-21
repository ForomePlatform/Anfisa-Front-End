FROM nginx:1.17

ENV WORKDIR /tmp/anfisa-ui
RUN mkdir -p $WORKDIR

RUN apt-get update -q && \
    apt-get install --no-install-recommends --no-install-suggests -y npm

WORKDIR $WORKDIR
COPY package*.json $WORKDIR/

RUN npm install && npm install --save-dev --unsafe-perm node-sass

COPY . $WORKDIR
RUN npm run build --mode=production

WORKDIR $WORKDIR/dist
RUN cp -R . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
