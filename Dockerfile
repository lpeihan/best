FROM nginx:latest
MAINTAINER lipeihan

COPY dist/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/default.conf
