import fs from "fs";
import { v4 as uuid } from "uuid";

export default class Archivo {
  private productos: any[];
  private fileName;

  constructor(fileName: string) {
    this.fileName = fileName;
    this.productos = [];
  }

  async readFile() {
    try {
      const products = await fs.promises.readFile(this.fileName, "utf-8");
      this.productos = JSON.parse(products);
    } catch (error) {
      console.error("File can't be loaded.", error);
      this.productos = [];
    }
  }

  async writeFile() {
    try {
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(this.productos),
        "utf-8"
      );
    } catch (error) {
      console.error("Error in saving product", error);
      return false;
    }
    return true;
  }

  async getAll() {
    await this.readFile();
    return this.productos;
  }

  async getById(id: string) {
    await this.readFile();
    return this.productos.find((p) => p.id == id);
  }

  async add(nombre: string, precio: number, urlFoto: string) {
    await this.readFile();

    const newProducto = {
      title: nombre,
      price: precio,
      thumbnail: urlFoto,
      id: uuid(),
    };

    this.productos.push(newProducto);

    return (await this.writeFile()) ? newProducto : null;
  }

  async update(id: string, body: any) {
    await this.readFile();
    const productToUpdate = this.productos.find((p) => p.id === id);
    if (!productToUpdate) return;

    for (const [k, v] of Object.entries(body)) productToUpdate[k] = v;

    return (await this.writeFile()) ? productToUpdate : null;
  }

  async delete(id: string) {
    await this.readFile();
    const productToDelete = this.productos.find((p) => p.id === id);
    if (!productToDelete) return;

    this.productos = this.productos.filter((p) => p.id !== id);
    return (await this.writeFile()) ? productToDelete : null;
  }

  async deleteFile() {
    try {
      await fs.promises.unlink(this.fileName);
    } catch (e) {
      console.log(e);
    }
  }
}

export const db = new Archivo("./db/productos.txt");
