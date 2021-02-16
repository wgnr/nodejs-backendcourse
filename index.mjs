import express from "express";
import APIroutes from "./routes/index.mjs";
import path from "path";
import fetch from "isomorphic-fetch";

export const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use("/api", APIroutes);

const server = app.listen(PORT, (err) => {
  if (err) throw new Error(`qye desastre un error ${err}`);
  console.log(`Server up on port ${server.address().port}`);
});

// An error while serving
server.on("error", (error) => console.error(`Error in server!!!!!\n${error}`));

// Pug
app.set("view engine", "pug");
app.set("views", "./views");
app.get("/productos/vista", async (req, res) => {
  // Que desgracia pug 🤮, pero mejor que hbs
  let productos;
  try {
    productos = await (
      await fetch(`http://localhost:${PORT}/api/productos`)
    ).json();
  } catch (e) {
    console.error(e);
    productos = [];
  }

  res.render("main", {
    productos,
    showProducts: productos?.length > 0,
  });
});
