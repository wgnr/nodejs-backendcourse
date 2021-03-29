import { model, Schema, Model, Document } from "mongoose";

const MensajesCollection = "mensajes";

export interface IMessaje extends Document {
  id: string;
  date: string;
  msg: string;
  from: string;
}

const MessajeSchema: Schema = new Schema({
  id: { type: String, require: true },
  date: { type: String },
  msg: { type: String },
  from: { type: String },
});

export const Messajes: Model<IMessaje> = model(
  MensajesCollection,
  MessajeSchema
);
