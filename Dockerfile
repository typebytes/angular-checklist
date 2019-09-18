#######################################################################################
# first stage
FROM node:10 AS builder
COPY . /root
RUN cd /root && npm install -g yarn
RUN cd /root && yarn install
RUN cd /root && npm run-script ci
#######################################################################################
# second stage - Build Targets
FROM nginx:alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY deploy/proxy.conf /etc/nginx/proxy.conf
COPY --from=builder /root/dist/ /usr/share/nginx/html/
CMD export DOLLAR='$' && envsubst < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'
EXPOSE 80


# COPY --from=builder /app/dist /usr/share/nginx/html/
# RUN chmod 755 /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/deploy/nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/deploy/proxy.conf /etc/nginx/proxy.conf

# CMD export DOLLAR='$' && envsubst < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'

# # BTW
# EXPOSE 80
