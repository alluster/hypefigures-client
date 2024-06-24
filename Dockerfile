# Use the official Node.js image with the alpine variant for a smaller image size
FROM node:18-alpine

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Remove existing node_modules and install app dependencies
RUN rm -rf node_modules && npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose port 9500 to the outside world
EXPOSE 9500

# Define the command to run the application
CMD ["npm", "run", "dev"]
