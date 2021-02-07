import express from "express";
import { router as ProductosRouter } from "./Productos.mjs";

const router = express.Router();
router.use("/productos", ProductosRouter);

export default router;
