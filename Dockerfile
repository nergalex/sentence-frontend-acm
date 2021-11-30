FROM nginxinc/nginx-unprivileged:1.21-alpine

#RUN rm -v /etc/nginx/nginx.conf

RUN rm -v /etc/nginx/conf.d/default.conf

#ADD nginx.conf /etc/nginx/
ADD frontend.conf.template /etc/nginx/templates/
ADD /html /usr/share/nginx/html

EXPOSE 8080  
CMD ["nginx", "-g", "daemon off;"]