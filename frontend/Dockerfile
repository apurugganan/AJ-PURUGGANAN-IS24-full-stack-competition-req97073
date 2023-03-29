# Use an official Node.js runtime as a parent image
FROM node

# Set the working directory to /app
WORKDIR /frontend

# Copy package.json and package-lock.json to the container
COPY package.json /frontend

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . /frontend

# Expose port 3000 for the container to listen on
EXPOSE 8000

# Set the default command to serve the built React app
CMD ["npm", "run", "dev"]