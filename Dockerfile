# STAGE 1: Build the React Application
# We use a node image to build the assets
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build

# STAGE 2: Serve the App with Nginx
# We use a lightweight Nginx image for the final artifact
FROM nginx:alpine

# Copy the custom Nginx configuration (defined in the next file block)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built assets from the 'builder' stage to Nginx's serve directory
# Note: standard Create React App builds to 'build/', Vite builds to 'dist/'
# Adjust the source path below if you use Vite (e.g., /app/dist)
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]