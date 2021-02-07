import express from "express";
import { db } from "./db/Archivo.mjs";
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/api/productos", async (req, res) => {
  const productos = await db.getAll();
  if (productos.length === 0)
    res.status(404).json({ error: "no hay productos cargados." });

  res.json(productos);
});

app.get("/api/productos/:id", async (req, res) => {
  const { id } = req.params;
  const producto = await db.getById(+id);

  if (!producto) res.status(404).json({ error: "producto no encontrado." });

  res.json(producto);
});

app.post("/api/productos", async (req, res) => {
  const { title, price, thumbnail } = req.body;
  const newProduct = await db.add(title, price, thumbnail);
  if (!newProduct)
    res.status(500).json({ error: "No se ha podido crear el producto." });

  res.json(newProduct);
});

const server = app.listen(PORT, () => {
  console.log(`Server up on port ${server.address().port}`);
});

// An error while serving
server.on("error", (error) => console.log(`Error in server\n${errro}`));
