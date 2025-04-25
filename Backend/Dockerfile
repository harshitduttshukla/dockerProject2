FROM node:18

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npx tsc -b

# Expose backend port
EXPOSE 5000

# Start backend
CMD ["node", "dist/index.js"]
