FROM node:22-alpine

WORKDIR /app

# Install system dependencies if needed (e.g. for native modules)
# RUN apk add --no-cache ...

COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Astro runs on (default 4321)
EXPOSE 4321

# Default command (can be overridden in docker-compose)
CMD ["npm", "run", "dev", "--", "--host"]
