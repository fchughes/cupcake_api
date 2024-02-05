import type { FastifyPluginAsync } from "fastify";
import { openapi_handler } from "../app";

// use as fastify middleware
const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.route({
    method: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    url: "/*",
    handler: openapi_handler,
  });
};

export default root;
