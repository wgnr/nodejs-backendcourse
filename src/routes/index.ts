import express from "express";
import { router as ProductosRouter } from "./Productos";

const router = express.Router();
router.use("/productos", ProductosRouter);

export default router;
