import express from "express";
import APIroutes from "./routes/index.mjs";
import path from "path";
const __dirname = path.resolve();
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use("/api", APIroutes);

const server = app.listen(PORT, () => {
  console.log(`Server up on port ${server.address().port}`);
});

// An error while serving
server.on("error", (error) => console.error(`Error in server!!!!!\n${errro}`));
