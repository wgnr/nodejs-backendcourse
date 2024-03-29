import express from "express";
import { db } from "../db/Archivo";
import { newItemAdded } from "../server";
export const router = express.Router();

router.get("", async (req, res) => {
  const productos = await db.getAll();
  if (productos.length === 0)
    return res.status(404).json({ error: "no hay productos cargados." });

  res.json(productos);
});

router.get("/:id", async (req, res) => {
  const id: string = req.params.id;
  const producto = await db.getById(id);

  if (!producto)
    return res.status(404).json({ error: "producto no encontrado." });

  res.json(producto);
});

router.post("", async (req, res) => {
  const { title, price, thumbnail } = req.body;
  const newProduct = await db.add(title, +price, thumbnail);
  if (!newProduct)
    return res
      .status(500)
      .json({ error: "No se ha podido crear el producto." });

  await newItemAdded();
  res.redirect("/");
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const body = {} as any;

  const fieldOfInterest: string[] = ["title", "price", "thumbnail"];
  for (const field of fieldOfInterest)
    if (req.body?.[field]) body[field] = req.body[field];

  const updatedProduct = await db.update(id, body);
  if (!updatedProduct)
    return res
      .status(500)
      .json({ error: "No se ha podido borrar el producto." });

  res.json(updatedProduct);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await db.delete(id);
  if (!deletedProduct)
    return res
      .status(500)
      .json({ error: "No se ha podido borrar el producto." });

  res.json(deletedProduct);
});

export interface Producto {
  title: string;
  price: number;
  thumbnail: string;
}
