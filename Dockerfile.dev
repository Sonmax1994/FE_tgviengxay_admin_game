# --- STAGE 1: Build Stage ---
FROM node:20 AS builder

# Set the working directory
WORKDIR /app

# Install the Angular CLI globally (or install locally if preferred)
# RUN npm install -g @angular/cli

# Copy package.json and package-lock.json/yarn.lock to leverage Docker layer caching
COPY package*.json ./

# Install dependencies (using --force just in case, though generally avoid)
RUN npm install

# Copy all source code
COPY . .
ENV END_POINT_URL="https://admin-dev.tgviengxay.bet"
# Build the Angular application for production.
# Assumes the project name is 'app'. Adjust the path if your Angular version/config differs.
# Common output paths are 'dist/browser' or 'dist/<project-name>/browser' (modern Angular CLI).
# We'll build everything into a directory called 'dist'.
RUN npm run build

# Find the exact output directory name created by Angular CLI, typically 'dist/<project-name>'
# We assume the build output lands in a folder inside 'dist'
# Example: If your project is named 'my-app', the output is in 'dist/my-app/browser'
# The standard output folder is usually named 'browser' inside the dist folder.
# We will copy from the first detected subdirectory under 'dist' to handle project name ambiguity.


# --- STAGE 2: Serve Stage (Nginx) ---
#FROM nginx:stable-alpine

# Copy custom Nginx configuration for Angular/SPA routing
#COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove the default Nginx HTML content
##RUN rm -rf /usr/share/nginx/html/*

# Copy the build artifacts from the 'builder' stage
# The 'builder' stage is defined above.
# We use /app/dist/<project-name>/browser or similar path
# NOTE: You may need to manually verify the exact path of the build output (e.g., 'dist/my-app/browser') and adjust the 'browser' part below.
#COPY --from=builder /app/dist/browser /usr/share/nginx/html

FROM nginxinc/nginx-unprivileged:1.28-alpine3.21  AS runner
#RUN rm -rf /usr/share/nginx/html/*
# Use a built-in non-root user for security best practices
USER nginx

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the static build output from the build stage to Nginx's default HTML serving directory
COPY --chown=nginx:nginx --from=builder /app/dist/*/browser /usr/share/nginx/html

ENV END_POINT_URL="https://admin-dev.tgviengxay.bet"

# Expose port 8080 to allow HTTP traffic
# Note: The default NGINX container now listens on port 8080 instead of 80
EXPOSE 80

# Start Nginx directly with custom config
ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]
