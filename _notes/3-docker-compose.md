# Project Overview

A Node.js application that counts the number of visits. The count is stored using Redis, an in-memory database.

## Idea

Both the Node app and Redis can run in the same container. However, if we scale up the application, both services would run instances in each container, leading to inconsistent visit counts based on which container handles the request.

To centralize the logic, the Node.js app and Redis are run in separate containers. This allows us to scale each service independently, ensuring that the Redis service centralizes the count data, regardless of how many instances of the Node app are running.

# Docker Compose

Docker Compose is a command-line tool that simplifies the management of multi-container Docker applications. Here’s what it offers:

1. **CLI tool installed with Docker**: Comes with Docker and helps manage multiple containers easily.
2. **Multi-container management**: Enables the setup and running of multiple containers with a single command.
3. **Automation**: Automates commands like building images, running containers, and managing networks.

The purpose of Docker Compose is to simplify the Docker CLI and allow issuing multiple commands much more quickly. For example, it automates the steps of building images and running containers by referencing a `docker-compose.yml` file.

## Communication Between Services

When defining multiple services (e.g., `redis` and `node_app`) in the `docker-compose.yml` file, Docker Compose will automatically create containers and place them in the same network. This allows free communication between containers without exposing ports externally.

To access the `redis-server` from the `node_app`, you can refer to the Redis service by its service name (e.g., `redis`) instead of specifying the host directly.

## Commands

- `docker-compose up`: Builds and runs the containers as defined in the `docker-compose.yml` file.
- `docker-compose up -d`: Runs the containers in the background (detached mode).
- `docker-compose down`: Stops and removes the containers, networks, and volumes created by `docker-compose`.

## Deleting Previous Docker Builds and Rebuilding Without Cache

When Docker Compose uses caching, it may generate images based on previous builds, even if the code has changed. Here’s how to rebuild without using the cache:

1. **Remove Previous Docker Images**
   To ensure no cached layers are used, run:
   ```bash
   docker-compose down --rmi all
   ```

- --rmi all: Removes all images used by services defined in your docker-compose.yml.
- docker-compose down: Stops and removes containers, networks, and volumes for the services.

2. **Build Without Cache**
   To force Docker Compose to rebuild the image without using any cache, use the --no-cache option when running the docker-compose up command:

```bash
docker-compose up --build --no-cache
```

This ensures that the image is built from scratch, ignoring any cached layers.

3. **Prune Unused Images and Containers**
   If you have unused or dangling images from previous builds, you can clean them up using:

```bash
docker system prune
```

This command removes:

- Stopped containers
- Unused networks
- Dangling images (intermediate images from builds)
- Build cache

## Container Restart Policies

In the event that a container crashes, Docker offers restart policies to ensure the container is automatically restarted based on predefined conditions. Available restart policies are:

"no": Do not automatically restart the container.
always: Always restart the container if it stops.
on-failure: Restart only if the container exits with an error.
unless-stopped: Restart the container unless it is explicitly stopped.

`docker-compose ps` - Displays the status of the running containers as defined in the docker-compose.yml file.
