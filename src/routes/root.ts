import type { FastifyPluginAsync } from "fastify";
import { apiV2_handler } from "../openapi";

// use as fastify middleware
const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.route({
    method: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    url: "/*",
    handler: apiV2_handler,
  });
};

export default root;
