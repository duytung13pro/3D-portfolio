# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install deps first (better cache usage)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of your app
COPY . .

# Build app (optional for Next.js or React)
RUN npm run build

# Expose a port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
