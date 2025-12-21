# Use a lightweight nginx base image for serving static files
FROM nginx:alpine

# Remove the default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration for static site
COPY nginx.conf /etc/nginx/conf.d/

# Copy all static files to nginx web root
COPY . /usr/share/nginx/html/

# Expose port 80 for Render
EXPOSE 80

# Start nginx when container starts
CMD ["nginx", "-g", "daemon off;"]
