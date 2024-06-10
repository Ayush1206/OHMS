# Use an official Node.js runtime as a parent image
FROM node:20-alpine:3.18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container at /app
COPY package*.json ./

# Install any dependencies
RUN npm install

# Bundle your app's source code inside the Docker image
COPY . .

# Build your Next.js app
RUN npm run build

# Define the command to run your app using CMD which defines your runtime
CMD ["npm", "start"]