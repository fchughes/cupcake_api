# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)
This project was bootstrapped with Fastify-CLI.

To learn Fastify, check out the [Fastify documentation](https://fastify.dev/docs/latest/).

## Info
I've used MongoDB for the data-store; all docker-compose scripts instantiate a Mongo server container with port 27017 exposed to the host. I'm using an incrementing counter collection which uses [MongoDB auto-increment](https://www.mongodb.com/basics/mongodb-auto-increment) in order to generate unique int64 cupcake ids.

This codebase uses [openapi-backend](https://openapistack.co/docs/openapi-backend/intro/) in order to use the supplied OpenAPI YAML as a single source of truth along with some degree of built-in type-safety. Types are generated from an OpenAPI 3.0 spec using `pnpm run openapi`. The 3.0 spec was generated from the provided 2.0 spec using `npx -p swagger2openapi swagger2openapi --yaml --outfile cupcacke_storev1_openapi3.0.yaml cupcake_storev1.yml`.

No real tests have been written -- the test files are stubs.


## Available Scripts

Make sure you have Docker installed. When running the below `docker-compose` commands, images in the Docker hub which you have not yet pulled should get pulled automatically. If you encounter a permission error, you may need to modify your `~/.docker/config.json`. On MacOS, you may need to change the "credsStore" value from "desktop" to "osxkeychain".

Scripts should be run from within the "./docker" sub-directory.


### Run Development Server

`sudo docker-compose -f docker-compose.dev.yml up --build`

If you're using VS Code you can download the Thunder Client extension to easily make requests from within your editor.

### Run Tests

`sudo docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit --exit-code-from test`

In order to cleanly remove any data created and stored in Mongo during testing, you should run the following command:
`sudo docker-compose -f docker-compose.test.yml down -v`

