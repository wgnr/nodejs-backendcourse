import {
  IchatMessageDocument,
  Messajes,
  IchatMessage,
} from "../models/Messaje";
import { v4 as uuid } from "uuid";
import { normalize, schema } from "normalizr";

async function getAll() {
  const messages: Array<IchatMessageDocument> = await Messajes.find(
    {},
    { __v: 0, _id: 0 }
  );

  const userSchema = new schema.Entity("user");
  const messageSchema = new schema.Entity("message", {
    author: userSchema,
  });
  const messagesSchema = new schema.Entity("messages", {
    messages: [messageSchema],
  });

  const messagesToSend = { id: 1, messages: messages.map((e) => e.toObject()) };
  const norm = normalize(messagesToSend, messagesSchema);
  return norm;
}

async function add(values: IchatMessage) {
  const messaje: IchatMessageDocument = await Messajes.create({
    ...values,
    id: uuid(),
  });

  return messaje;
}

export const dbMessages = {
  getAll,
  add,
};
