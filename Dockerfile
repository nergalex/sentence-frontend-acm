FROM nginx

#RUN rm -v /etc/nginx/nginx.conf

#ADD nginx.conf /etc/nginx/
ADD default.conf.template /etc/nginx/templates/
ADD /html /usr/share/nginx/html

EXPOSE 80  
CMD ["nginx", "-g", "daemon off;"]