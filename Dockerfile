FROM nginxinc/nginx-unprivileged:1.21-alpine

RUN rm -v /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx/
#ADD frontend.conf.template /etc/nginx/templates/
COPY frontend.conf.template /usr/share/nginx/templates/
COPY /html /usr/share/nginx/html

RUN rm -rf /docker-entrypoint.d
COPY entrypoint/20-envsubst-on-templates.sh /docker-entrypoint.d

EXPOSE 8080  
CMD ["nginx", "-g", "daemon off;"]