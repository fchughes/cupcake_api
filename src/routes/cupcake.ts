import type { Context } from "openapi-backend";
import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { api, mongo_client } from "../app";
import { Paths } from "../types/openapi";
import type { FastReq } from "../app";

const cupcake_col = mongo_client
  .db(process.env.MONGO_DB_NAME)
  .collection("cupcake");
const counter_col = mongo_client
  .db(process.env.MONGO_DB_NAME)
  .collection("counter");

const retErr = (f: Function) => {
  try {
    return f();
  } catch (err) {
    return err;
  }
};

api.register({
  listCupcakes: async (c: Context, request: FastReq, reply: FastifyReply) =>
    retErr(async () => cupcake_col.find().toArray()),
  getCupcakeById: async (
    c: Context<{ cupcakeId: string }>,
    request: FastifyRequest<{
      Querystring: Paths.GetCupcakeById.PathParameters;
    }>,
    reply: FastifyReply
  ) =>
    retErr(async () =>
      cupcake_col.findOne({
        id: parseInt(c.request.params.cupcakeId as string),
      })
    ),
  addCupcake: async (
    c: Context,
    request: FastifyRequest<{ Body: Paths.AddCupcake.RequestBody }>,
    reply: FastifyReply,
    fastify
  ) => {
    try {
      var counter = await counter_col.findOneAndUpdate(
        {},
        { $inc: { counter: 1 } },
        { returnDocument: "after", upsert: true }
      );
    } catch (err) {
      return err;
    }
    try {
      const cupcake = await cupcake_col.insertOne({
        id: counter?.counter,
        ...request.body,
      });
      return cupcake;
    } catch (err) {
      return err;
    }
  },
  updateCupcake: async (
    c: Context<{ cupcakeId: string }>,
    request: FastifyRequest<{ Body: Paths.UpdateCupcake.RequestBody }>,
    reply: FastifyReply
  ) =>
    await retErr(async () =>
      cupcake_col.findOneAndUpdate(
        {
          id: parseInt(c.request.params.cupcakeId as string),
        },
        request.body
      )
    ),
  deleteCupcake: async (
    c: Context<{ cupcakeId: string }>,
    request: FastifyRequest,
    reply: FastifyReply
  ) =>
    await retErr(async () =>
      cupcake_col.findOneAndDelete({
        id: parseInt(c.request.params.cupcakeId as string),
      })
    ),
});

// use as fastify middleware
const cupcake: FastifyPluginAsync = async (fastify, opts): Promise<void> => {};

export default cupcake;
