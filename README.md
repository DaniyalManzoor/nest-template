# Relayer Backend

A robust NestJS backend application with Redis integration, containerized with Docker for easy deployment and development.

## Features

- 🚀 **NestJS Framework** - Modern Node.js framework for scalable applications
- 🔄 **Redis Integration** - In-memory data store for caching and session management
- 🐳 **Docker Support** - Fully containerized application with Docker Compose
- 🏥 **Health Checks** - Built-in health monitoring for application and Redis
- 🔧 **Environment Configuration** - Flexible configuration management
- 📦 **pnpm Package Manager** - Fast, disk space efficient package management

## Architecture

The application is structured with the following modules:

- **App Module** - Main application module with routing
- **Redis Module** - Redis connection and service management
- **Health Module** - Application health monitoring
- **Config Module** - Environment-based configuration

## Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (for local development)
- **Docker & Docker Compose** (for containerized deployment)

## Quick Start with Docker (Recommended)

### 1. Clone and Setup

```bash
git clone <repository-url>
cd relayer-backend
```

### 2. Environment Configuration

```bash
# Copy the example environment file (optimized for Docker)
cp env.example .env

# The default env.example is configured for Docker Compose
# It uses 'redis' as the Redis host (Docker service name)

# For production, you may want to customize:
# - APP_URL=https://your-domain.com
# - HEALTH_CHECK_URL=https://your-domain.com/health
# - REDIS_URL=redis://your-redis-host:6379
# - REDIS_PASSWORD=your-secure-password
```

### 3. Run with Docker Compose

#### Production Mode

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Development Mode (with hot reload)

```bash
# Run development environment
docker-compose -f docker-compose.dev.yml up --build

# Run in background
docker-compose -f docker-compose.dev.yml up -d --build

# Stop development environment
docker-compose -f docker-compose.dev.yml down
```

## Local Development Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start Redis (Required)

```bash
# Using Docker
docker run -d --name redis -p 6379:6379 redis:7-alpine

# Or using local Redis installation
redis-server
```

### 3. Environment Setup

```bash
# For local development, use the local environment template
cp env.local.example .env

# This sets REDIS_HOST=localhost for local Redis connection
# If you prefer to use the Docker template:
# cp env.example .env
# Then change REDIS_HOST from 'redis' to 'localhost'
```

### 4. Run the Application

```bash
# Development mode with hot reload
pnpm run start:dev

# Production mode
pnpm run start:prod

# Debug mode
pnpm run start:debug
```

## Available Scripts

```bash
# Development
pnpm run start:dev          # Start with hot reload
pnpm run start:debug        # Start in debug mode

# Production
pnpm run build              # Build the application
pnpm run start:prod         # Start production server

# Testing
pnpm run test               # Run unit tests
pnpm run test:watch         # Run tests in watch mode
pnpm run test:e2e           # Run end-to-end tests
pnpm run test:cov           # Run tests with coverage

# Code Quality
pnpm run lint               # Lint and fix code
pnpm run format             # Format code with Prettier
```

## API Endpoints

### Health Check

```bash
GET /health
```

Returns the health status of the application and Redis connection.

### Application Endpoints

```bash
GET /          # Welcome message (default NestJS endpoint)
```

## Environment Variables

| Variable           | Description               | Docker Default                 | Local Default                  | Required |
| ------------------ | ------------------------- | ------------------------------ | ------------------------------ | -------- |
| `NODE_ENV`         | Application environment   | `development`                  | `development`                  | No       |
| `PORT`             | Application port          | `3000`                         | `3000`                         | No       |
| `APP_URL`          | Application base URL      | `http://localhost:3000`        | `http://localhost:3000`        | No       |
| `REDIS_HOST`       | Redis server host         | `redis` (service name)         | `localhost`                    | Yes      |
| `REDIS_PORT`       | Redis server port         | `6379`                         | `6379`                         | No       |
| `REDIS_PASSWORD`   | Redis password            | -                              | -                              | No       |
| `REDIS_URL`        | Redis connection URL      | `redis://redis:6379`           | `redis://localhost:6379`       | No       |
| `HEALTH_CHECK_URL` | Health check endpoint URL | `http://localhost:3000/health` | `http://localhost:3000/health` | No       |
| `LOG_LEVEL`        | Application logging level | `info`                         | `info`                         | No       |

### Environment File Templates

- **`env.example`** - Optimized for Docker Compose (uses `redis` as host)
- **`env.local.example`** - Optimized for local development (uses `localhost` as host)

## Docker Services

### Application Service

- **Port:** 3000
- **Health Check:** `/health` endpoint
- **Dependencies:** Redis service

### Redis Service

- **Port:** 6379
- **Data Persistence:** Volume mounted
- **Health Check:** Redis ping command

## Troubleshooting

### Common Issues

1. **Port already in use**

   ```bash
   # Check what's using port 3000
   lsof -i :3000

   # Kill the process or change the port in .env
   PORT=3001
   ```

2. **Redis connection failed**

   ```bash
   # Check if Redis is running
   docker ps | grep redis

   # Restart Redis service
   docker-compose restart redis
   ```

3. **Permission denied (Docker on Linux)**
   ```bash
   # Add user to docker group
   sudo usermod -aG docker $USER
   newgrp docker
   ```

### Logs and Debugging

```bash
# View application logs
docker-compose logs app

# View Redis logs
docker-compose logs redis

# Follow logs in real-time
docker-compose logs -f

# View specific service logs
docker-compose logs -f app
```

## Development Tips

1. **Hot Reload**: Use development Docker compose for hot reload functionality
2. **Environment**: Always copy `env.example` to `.env` before starting
3. **Redis GUI**: Use Redis Commander or RedisInsight for Redis management
4. **Health Monitoring**: Check `/health` endpoint for service status

## Production Deployment

For production deployment, consider:

1. **Security**: Use strong Redis passwords and secure networks
2. **Monitoring**: Implement logging and monitoring solutions
3. **Scaling**: Use Redis Cluster for high availability
4. **SSL/TLS**: Implement HTTPS and secure Redis connections
5. **Backup**: Regular Redis data backups

## License

This project is licensed under the UNLICENSED license.
