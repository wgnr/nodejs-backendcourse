import fs from "fs";
import { v4 as uuid } from "uuid";

export default class Archivo {
  #messages;

  constructor(fileName) {
    this.fileName = fileName;
  }

  async #readFile() {
    try {
      const messages = await fs.promises.readFile(this.fileName, "utf-8");
      this.#messages = JSON.parse(messages);
    } catch (error) {
      console.error("File can't be loaded.", error);
      this.#messages = [];
    }
  }

  async #writeFile() {
    try {
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(this.#messages),
        "utf-8"
      );
    } catch (error) {
      console.error("Error in saving message", error);
      return false;
    }
    return true;
  }

  async getAll() {
    await this.#readFile();
    return this.#messages;
  }

  async add({ date, msg, from }) {
    await this.#readFile();

    const newMessage = {
      id: uuid(),
      date,
      msg,
      from,
    };

    this.#messages.push(newMessage);

    return (await this.#writeFile()) ? newMessage : null;
  }
}

export const dbMessages = new Archivo("./db/messages.txt");
