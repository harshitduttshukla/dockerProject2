FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start Vite dev server (with host 0.0.0.0 to allow external access)
CMD ["npm", "run", "dev"]
