import fs from "fs";
import { v4 as uuid } from "uuid";

export default class Archivo {
  #productos;

  constructor(fileName) {
    this.fileName = fileName;
  }

  async #readFile() {
    try {
      const products = await fs.promises.readFile(this.fileName, "utf-8");
      this.#productos = JSON.parse(products);
    } catch (error) {
      console.error("File can't be loaded.", error);
      this.#productos = [];
    }
  }

  async getAll() {
    await this.#readFile();
    return this.#productos;
  }

  async getById(id) {
    await this.#readFile();
    return this.#productos.find((p) => p.id == id);
  }

  async add(nombre, precio, urlFoto) {
    await this.#readFile();

    const newProducto = {
      title: nombre,
      price: precio,
      thumbnail: urlFoto,
      id: uuid(),
    };

    this.#productos.push(newProducto);

    try {
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(this.#productos),
        "utf-8"
      );
      return newProducto;
    } catch (error) {
      console.error("Error in saving product", error);
    }
  }

  async delete() {
    try {
      await fs.promises.unlink(this.fileName);
    } catch (e) {
      console.log(e);
    }
  }
}

export const db = new Archivo("./db/productos.txt");
