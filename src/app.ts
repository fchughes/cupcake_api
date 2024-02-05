import type {
  FastifyPluginAsync,
  FastifyServerOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import type { Context, UnknownParams } from "openapi-backend";
import { join } from "path";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import OpenAPIBackend from "openapi-backend";

import { MongoClient } from "mongodb";

const mongo_client: MongoClient = new MongoClient(
  process.env.DATABASE_CONNECTIONSTRING as string
);


export interface AppOptions
  extends FastifyServerOptions,
    Partial<AutoloadPluginOptions> {}

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
  });
};

const api = new OpenAPIBackend({
  definition: "cupcake_storev1_openapi3.0.yml",
  apiRoot: "/v2",
});

api.init();

type Query = string | { [key: string]: string | string[] };
type FastReq = FastifyRequest<{
  Querystring: Query;
  Headers: UnknownParams;
  Params: UnknownParams;
}>;

async function openapi_handler(
  request: FastReq,
  reply: FastifyReply
): Promise<void> {
  return api.handleRequest(
    {
      method: request.method,
      path: request.url,
      body: request.body,
      query: request.query,
      headers: request.headers,
    },
    request,
    reply
  );
}

api.register({
  validationFail: async (
    c: Context,
    request: FastifyRequest,
    reply: FastifyReply
  ) => reply.code(400).send({ status: 400, err: c.validation.errors }),
  notFound: async (c: Context, request: FastifyRequest, reply: FastifyReply) =>
    reply.code(404).send({ status: 404, err: "not found" }),
  notImplemented: async (
    c: Context,
    request: FastifyRequest,
    reply: FastifyReply
  ) =>
    reply
      .code(404)
      .send({ status: 501, err: "No handler registered for operation" }),
  methodNotAllowed: async (
    c: Context,
    request: FastifyRequest,
    reply: FastifyReply
  ) => reply.code(405).send({ status: 405, err: "Method not allowed" }),
  unauthorizedHandler: async (
    c: Context,
    request: FastifyRequest,
    reply: FastifyReply
  ) => reply.code(401).send({ status: 401, err: "Please authenticate first" }),
  postResponseHandler: async (
    c: Context,
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const valid = c.api.validateResponse(c.response, c.operation);
    if (valid.errors) {
      return reply.code(502).send({ status: 502, err: valid.errors });
    }
    return reply.code(200).send(c.response);
  },
});

export default app;
export { app, options, api, openapi_handler, mongo_client };
export type { FastReq };
