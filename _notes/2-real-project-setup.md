# Dockerizing a Real Project

In this guide, we will demonstrate how to dockerize a Node.js project with basic steps and additional features like tagging and port mapping.

## Step-by-Step Guide

### 1. Select a Base Image

To build a container, you need to select an appropriate base image. Visit [Docker Hub](https://hub.docker.com/) and choose an image with a specific version to avoid build issues in the future.

### 2. Create a Dockerfile

Create a `Dockerfile` in the root directory of your Node.js project. Here's a simple example:

```bash
FROM node:22-alpine3.19

COPY ./package.json ./
RUN npm install
COPY . .

CMD ["npm", "start"]
```

### 3. Build the Docker Image

Run the following command from your terminal to build the Docker image:

```bash
docker build .
```

This command will generate an image ID, which you'll use to run the container.

### 4. Run the Node.js Application in a Container

Start the container using the generated image ID:

```bash
docker run <generated-image-id>
```

This will run the Node.js application inside the container.

---

## Tagging an Image and Port Mapping

### Tagging an Image

Tagging allows you to reference the image by a meaningful name instead of its ID. This cannot be done within the Dockerfile; it's a build-time option.

To tag an image, use the `-t` flag when building:

```bash
docker build -t <docker_username>/<repo-or-project-name>:<version> .
```

For example:

```bash
docker build -t manisha_sinha/node_app .
```

Now, you can refer to the image using `manisha_sinha/node_app` instead of the image ID.

### Port Mapping

Containers are isolated, and you cannot directly access services running inside the container from your local or remote machine. To map container ports to your machine, use the `-p` flag.

```bash
docker run -p <local-port>:<container-port> <image-id or tag>
```

For example, to map local port 2000 to container port 8080:

```bash
docker run -p 2000:8080 manisha_sinha/node_app
```

---

## Using `WORKDIR` in Dockerfile

The `WORKDIR` directive sets the working directory inside the container. Any subsequent commands will be executed in this directory context.

Here's how you add it to your Dockerfile:

```bash
FROM node:22-alpine3.19

WORKDIR /usr/app

COPY ./package.json ./
RUN npm install
COPY . .

CMD ["npm", "start"]
```

When you run this container and execute:

```bash
docker exec -it <running-container-id> sh
```

You will be redirected directly to the `/usr/app` directory inside the container.

---

Note -
**Instruction Order in Dockerfile Matters**

The order of instructions in a Dockerfile is crucial. When you make a change to any step, Docker re-executes the build process starting from that step. This forces Docker to skip cached versions of previous steps and redo the installation process. Therefore, to optimize the build process and avoid unnecessary reinstallation, it's important to carefully structure the instructions.

**No Hot-Reload in Docker**

Docker doesn't support hot-reloading. Any changes to the source code require rebuilding the image to reflect the updates. To apply changes, you'll need to rebuild and restart the container each time you modify the code.

This guide provides a basic understanding of how to dockerize a Node.js project with port mapping, image tagging, and setting up a working directory inside the container.
