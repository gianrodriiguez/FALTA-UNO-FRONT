# Use the official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
