FROM nginxinc/nginx-unprivileged:1.21-alpine

USER root

RUN rm -v /etc/nginx/nginx.conf
RUN rm -v /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/
COPY frontend.conf.template /etc/nginx/templates/
COPY /html /usr/share/nginx/html

# Enables and arbitrary user to write to nginx folder, Needed for vk8s deployments
RUN chmod -R 777 /etc/nginx

ENV SITE_ENV null
ENV SITE_ENV_MESSAGE null
ENV LOGIN_ENABLED null
ENV LOGIN_TOKEN null

# Bombardier
RUN rm -rf /usr/local/go && \
    wget https://go.dev/dl/go1.19.1.linux-amd64.tar.gz && \
    tar -C /usr/local -xzf go1.19.1.linux-amd64.tar.gz && \
    /usr/local/go/bin/go install github.com/codesenberg/bombardier@latest

EXPOSE 8080  
CMD ["nginx", "-g", "daemon off;"]