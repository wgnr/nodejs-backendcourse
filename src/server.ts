import mongoose from "mongoose";
import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path";
import APIroutes from "./routes/index";
import { db } from "./db/Archivo";
import { dbMessages } from "./db/Messages";
const __dirname = path.resolve();
const app = express();
export const httpServer = createServer(app);
export const io = new Server(httpServer);

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(`${__dirname}/public`));
app.use("/api", APIroutes);

const server = httpServer.listen(PORT, () => {
  console.log(`✔ Server up on port ${PORT}`);

  mongoose
    .connect("mongodb://localhost/ecommerce", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((r) => console.log(`✔ Connected to DB`))
    .catch((e) => {
      console.error(`❌ Cannot connect to DB... exiting... `);
      console.error(e);
      process.exit();
    });
});

// An error while serving
server.on("error", (error) => console.error(`Error in server!!!!!\n${error}`));

io.on("connection", async (socket) => {
  // When user connect: pass to him all productos
  socket.emit("products", await generateTable());
  // Chat messages methods
  handleMessages(socket);
});

export async function newItemAdded() {
  io.sockets.emit("products", await generateTable());
}

export async function generateTable() {
  const products = await db.getAll();
  if (!products.length) return;

  return `
      <div class="container-table">
        <h2>Product List</h2>
        <table class="tabla-table table table-striped">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col">Thumbnail</th>
            </tr>
          </thead>
          <tbody>
           ${products
             .map(
               (p) => `
            <tr>
              <td scope="row">${p.title}</td>
              <td>${p.price}</td>
              <td><img src="${p.thumbnail}"/></td>
            </tr>
           `
             )
             .join("")}
          </tbody>
        </table>
      </div>
  `;
}

// const messages = [];

async function handleMessages(socket: Socket) {
  // Add socket to chat room
  // I know it's weird, everyone joins the room, but, fo.
  socket.join("generalChat");

  // First connection send all records
  const messages = await dbMessages.getAll();
  socket.emit("chat", messages);

  socket.on("chat", async (from, msg) => {
    const newMessage = await dbMessages.add({
      date: new Date().toLocaleString(),
      msg,
      from,
    });

    io.to("generalChat").emit("chat", [newMessage]);
  });
}
