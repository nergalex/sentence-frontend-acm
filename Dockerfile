FROM nginxinc/nginx-unprivileged:1.21-alpine

USER root

RUN rm -v /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx/
#ADD frontend.conf.template /etc/nginx/templates/
COPY frontend.conf.template /usr/share/nginx/templates/
COPY /html /usr/share/nginx/html

#RUN rm -v /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
#RUN rm -v /docker-entrypoint.d/20-envsubst-on-templates.sh
#RUN rm -v /docker-entrypoint.d/30-tune-worker-processes.sh

#COPY entrypoint/20-envsubst-on-templates.sh /docker-entrypoint.d/

RUN && chown -R $UID:0 /usr/share/nginx \
    && chmod -R g+w /usr/share/nginx

USER 101

EXPOSE 8080  
CMD ["nginx", "-g", "daemon off;"]