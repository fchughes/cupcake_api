import type { Context } from "openapi-backend";
import type { FastifyPluginAsync, FastifyRequest } from "fastify";
import mongo_client from "../mongo";
import { Paths } from "../types/cupcake_storev1";
import { apiV2 } from "../openapi";
import { Handler } from "openapi-backend";

const schema_version = 1;

const cupcake_col = mongo_client
  .db(process.env.MONGO_DB_NAME)
  .collection("cupcake");
const counter_col = mongo_client
  .db(process.env.MONGO_DB_NAME)
  .collection("counter");

const retErr = (f: () => any | Error) => {
  try {
    return f();
  } catch (err) {
    return err;
  }
};

const listCupcakes: Handler = async (c: Context) =>
  cupcake_col.find().toArray();

const getCupcakeById: Handler = async (c: Context<{ cupcakeId: string }>) => {
  retErr(async () =>
    cupcake_col.findOne({
      id: parseInt(c.request.params.cupcakeId as string),
    })
  );
};

const addCupcake: Handler = async (
  c: Context,
  request: FastifyRequest<{ Body: Paths.AddCupcake.RequestBody }>
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
      _ver: schema_version,
      ...request.body,
    });
    return cupcake;
  } catch (err) {
    return err;
  }
};

const updateCupcake = async (
  c: Context<{ cupcakeId: string }>,
  request: FastifyRequest<{ Body: Paths.UpdateCupcake.RequestBody }>
) =>
  await retErr(async () =>
    cupcake_col.findOneAndUpdate(
      {
        id: parseInt(c.request.params.cupcakeId as string),
      },
      request.body
    )
  );

const deleteCupcake = async (c: Context<{ cupcakeId: string }>) =>
  await retErr(async () =>
    cupcake_col.findOneAndDelete({
      id: parseInt(c.request.params.cupcakeId as string),
    })
  );

apiV2.register({
  listCupcakes: listCupcakes, //async () => retErr(async () => cupcake_col.find().toArray()),
  getCupcakeById: getCupcakeById,
  addCupcake: addCupcake,
  updateCupcake: updateCupcake,
  deleteCupcake: deleteCupcake,
});

// use as fastify middleware
const cupcake: FastifyPluginAsync = async (fastify, opts): Promise<void> => {};

export default cupcake;
