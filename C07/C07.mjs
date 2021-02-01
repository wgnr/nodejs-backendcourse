import fs from "fs";
import express from "express";
const app = express();

const entries = {
  items: 0,
  item: 0,
};

const PORT = process.env.PORT || 8080; // If 0 node will chosse any free port randomly

const server = app.listen(PORT, () => {
  console.log(`Server up on port ${server.address().port}`);
});

// An error while serving
server.on("error", (error) => console.log(`Error in server\n${errro}`));

app.get("/items", async (req, res) => {
  const productos = await importTxt("productos.txt");
  entries.items++;
  res.json({ items: productos, cantidad: productos.length });
});

app.get("/items-random", async (req, res) => {
  const productos = await importTxt("productos.txt");
  entries.item++;
  res.json({ items: productos[Math.floor(Math.random() * productos.length)] });
});

app.get("/visitas", (req, res) => {
  res.json({
    visitas: { ...entries },
  });
});

async function importTxt(fileName) {
  try {
    return JSON.parse(await fs.promises.readFile(fileName));
  } catch (e) {
    console.error(e);
    return [];
  }
}
