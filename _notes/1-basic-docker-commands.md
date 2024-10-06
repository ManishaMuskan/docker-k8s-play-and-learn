# Docker Notes

## Common Commands

- **`docker system prune`**: Cleans up unused containers, images, and networks to free up space.
- **`docker build`**: Creates an image based on the configuration in the Dockerfile.
- **`docker run`**: Creates and starts a new container from an image.
- **`docker start`**: Starts an already created (but stopped) container using its container ID.
- **`docker ps`**: Lists the running containers.
- **`docker ps -a`** (or **`docker ps --all`**): Lists all containers, including both running and stopped ones.

## Running a Container from an Image ID

To run a container from an image using its **image ID** (`sha256:be31686afb3080e0b8841e45b590b9a86b23c86e2`), use the following command:

```bash
docker run -d sha256:be31686afb3080e0b8841e45b590b9a86b23c86e2
```

This will create and start a container in **detached mode** (`-d`), allowing it to run in the background. The command returns the **container ID** upon success.

## Starting an Existing Container

If you want to restart a previously stopped container, list all containers, including stopped ones, with:

```bash
docker ps -a
```

Then, start the container using the **container ID** (not the image ID):

```bash
docker start <container_id>
```

## Common Docker Build and Run Options

- **`--progress=plain`**: Displays build progress in a plain-text format, often used in environments like WSL.
- **`-t`**: Tags an image with a human-readable name during the build process. The format for tagging is:

  ```bash
  docker build -t <docker_username>/<tag_name>:<version> .
  ```

  While this format is common, it’s not required to follow strictly. For example, you could simply use:

  ```bash
  docker build -t test --progress=plain .
  ```

  - This tag can be used in place of the **image ID** when running the container:

    ```bash
    docker run test
    ```

  - **Important**: Tags cannot be used in place of **container IDs**. For example:

    ```bash
    docker exec -it test sh  # Incorrect - `test` is a tag; `docker exec` requires a container ID.
    ```

## Manually Creating a Docker Image Without a Dockerfile

Here’s how to manually create an image that runs the Redis server at startup:

### Steps:

1. **Run the base image with a shell**:

   ```bash
   docker run -it alpine sh
   ```

2. **Install Redis inside the container**:
   Once inside the container, install Redis using the `apk` package manager:

   ```bash
   apk add --update redis
   ```

3. **Get the running container ID**:
   In a new terminal window, use:

   ```bash
   docker ps
   ```

   Copy the **container ID** of the running container.

4. **Create a new image with Redis as the startup command**:
   Use `docker commit` to create an image and specify the startup command for Redis:

   ```bash
   docker commit -c 'CMD ["redis-server"]' <running-container-id>
   ```

5. **Run the newly created image**:
   After committing the changes, use the generated **image ID** to run the new image:
   ```bash
   docker run <newly-created-image-id>
   ```

With these steps, you can create a custom Docker image that automatically runs the Redis server upon startup.

---
TIP -
Always try to run command with -it flag attached with it for the sake of convinience