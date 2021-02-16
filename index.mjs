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

// ejs
app.set("view engine", "ejs");
app.set("views", "./views");
app.get("/productos/vista", async (req, res) => {
  // ejs, bueno no esta tan mal
  let productos;
  try {
    productos = await (
      await fetch(`http://localhost:${PORT}/api/productos`)
    ).json();
  } catch (e) {
    console.error(e);
    productos = [];
  }

  res.render("./layouts/index", {
    productos,
    showProducts: productos?.length > 0,
  });
});
