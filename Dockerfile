# Lightweight web server image
FROM nginx:alpine

# Copy the website into Nginx's default web folder
COPY index.html style.css script.js /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets

EXPOSE 80
