import type { FastifyReply, FastifyRequest } from "fastify";
import type { Context, UnknownParams } from "openapi-backend";
import OpenAPIBackend from "openapi-backend";

type Query = string | { [key: string]: string | string[] };
type FastReq = FastifyRequest<{
  Querystring: Query;
  Headers: UnknownParams;
  Params: UnknownParams;
}>;

const default_registry = {
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
};

type OpenAPIHandler = (request: FastReq, reply: FastifyReply) => Promise<void>;
const build_openapi_handler: (api: OpenAPIBackend) => OpenAPIHandler = (
  api: OpenAPIBackend
) => {
  return async function openapi_handler(
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
  };
};

const build_openapi_api: (
  definition: string,
  apiRoot: string
) => [OpenAPIBackend, OpenAPIHandler] = (
  definition: string,
  apiRoot: string
) => {
  const api = new OpenAPIBackend({
    definition: definition,
    apiRoot: apiRoot,
  });
  const api_handler = build_openapi_handler(api);
  api.init();
  api.register(default_registry);
  return [api, api_handler];
};

const [apiV2, apiV2_handler] = build_openapi_api(
  "./openapi/v3/cupcake_storev1.yml",
  "/v2"
);
const [apiV3, apiV3_handler] = build_openapi_api(
  "./openapi/v3/cupcake_storev1.yml",
  "/v3"
);


export type { FastReq };
export { apiV2, apiV2_handler, apiV3, apiV3_handler };
