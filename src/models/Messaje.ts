import { model, Schema, Model, Document } from "mongoose";

const MensajesCollection = "mensajes";

export interface IreceivedChatMessage {
  text: string;
  author: {
    id: string; // email
    name: string;
    surname: string;
    age: string;
    alias: string;
    avatar: string;
  };
}

export interface IchatMessage extends IreceivedChatMessage {
  date: string;
}

export interface IchatMessageDocument extends Document {}

const MessajeSchema: Schema = new Schema({
  id: String,
  date: String,
  text: String,
  author: {
    id: { type: String, require: true }, // email
    name: String,
    surname: String,
    age: String,
    alias: String,
    avatar: String,
  },
});

export const Messajes: Model<IchatMessageDocument> = model(
  MensajesCollection,
  MessajeSchema
);
