# NodeJS - Redis - Docker - Template

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech](#tech)
- [Screenshots](#screenshots)
- [Running](#running)

## Description

## Features

## Tech

<ul>
<li>Node JS</li>
<li>Express JS</li>
<li>JsonWebToken - <i>create token to maintain user logged in</i></li>
<li>MongoDB - <i>NoSQL database to store user data</i></li>
</ul>

## Screenshots

## Running

To run this server locally using Docker Image :

- install Docker Desktop from [Docker website](https://www.docker.com/products/docker-desktop) and start to run in background
- create a folder in desktop, open this folder in VS Code
- create a .env file
- copy /server/.env.example file variables from above and paste in .env file
- start filling all environment variables
- also create a compose.yaml file inside that folder
- copy below code and paste in compose.yaml

```
version: "3"
services:
  server:
    image : <docker-image-name>
    ports:
      - 8000:8000
    env_file:
      - .env
    depends_on:
      - redis
    command: npm run dev # Command to run the server, no need for ./server prefix

  redis:
    image: redis/redis-stack:latest
    container_name: redis-stack
    ports:
      - 6379:6379
      - 8001:8001 # Optional: Web UI port for Redis Stack (if using Redis Stack)
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 30s
      timeout: 10s
      retries: 5

```

- open VS Code terminal (Ctrl + ` )

```
docker compose up
```

- both Redis and server started
- check by go to url: http://localhost:8000, you will get a response means server is working fine
