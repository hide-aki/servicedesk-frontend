##############
###  BUILD ###
##############

FROM node:10-alpine as build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Build NodeJS app
RUN npm run build

##############
###   RUN  ###
##############

FROM nginx:alpine

COPY nginx/servicedesk-frontend.template /etc/nginx/conf.d/servicedesk-frontend.template

# Copy application files from build stage.
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Inject environment variables in Nginx configuration and start Nginx.
CMD /bin/sh -c "envsubst '\$API_URL' < /etc/nginx/conf.d/servicedesk-frontend.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;' || cat /etc/nginx/conf.d/default.conf"
