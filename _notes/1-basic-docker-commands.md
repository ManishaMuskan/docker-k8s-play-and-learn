# Docker Notes

## Commands

- **`docker system prune`**: Cleans up unused containers, images, and networks.
- **`docker build`**: Creates an image based on the Dockerfile configuration.
- **`docker run`**: Creates a new container from an image and starts it.
- **`docker start`**: Starts an already created (but stopped) container using its container ID.
- **`docker ps`**: Lists the running containers.
- **`docker ps -a`** (or **`docker ps --all`**): Lists all containers, including both running and stopped ones.

## Running a Container from an Image ID

To run a container from an image using its ID (`sha256:be31686afb3080e0b8841e45b590b9a86b23c86e2`), use:

```bash
docker run -d sha256:be31686afb3080e0b8841e45b590b9a86b23c86e2
```

This command starts a container in detached mode (`-d`) and returns the container ID as output.

## Starting an Existing Container

To restart an already existing (but stopped) container, first, list all containers:

```bash
docker ps -a
```

Then, start the container using its **container ID** (not the image ID):

```bash
docker start <container_id>
```

## Options

- **`--progress=plain`**: Used to see the output in a plain format, especially useful in WSL mode.
- **`-t`**: Tags an image during the build process. The tag format is `<docker_username/tag_name:version>`, though it's not a strict rule. For example, you can tag an image as `test`:

  ```bash
  docker build -t test --progress=plain .
  ```

  - This tag can be used in place of the image ID in subsequent commands:

    ```bash
    docker run test
    ```

  - However, it cannot be used in place of a **container ID**. For example:

    ```bash
    docker exec -it test sh  # Wrong - `test` should be the container ID, not the image tag
    ```

## Manually Creating a Docker Image Without a Dockerfile

### Steps to Create an Image Running Redis Server:

1. **Run the base image with a shell**:

   ```bash
   docker run -it alpine sh
   ```

2. **Install Redis inside the container**:

   ```bash
   apk add --update redis
   ```

3. **Get the running container ID**:
   In a new terminal window, run:

   ```bash
   docker ps
   ```

   Copy the container ID.

4. **Create a new image with Redis as the startup command**:

   ```bash
   docker commit -c 'CMD ["redis-server"]' <running-container-id>
   ```

5. **Run the newly built image**:
   After the new image is created, copy its image ID and run:
   ```bash
   docker run <newly-built-image-id>
   ```

---
