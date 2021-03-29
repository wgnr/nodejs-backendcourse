import { v4 as uuid } from "uuid";
import { IMessaje, Messajes } from "../models/Messaje";

async function getAll() {
  const messajes: Array<IMessaje> = await Messajes.find();
  return messajes;
}

async function add(values: any) {
  const { date, msg, from } = values;
  const messaje: IMessaje = await Messajes.create({
    id: uuid(),
    date,
    msg,
    from,
  });

  return messaje;
}

export const dbMessages = {
  getAll,
  add,
};
