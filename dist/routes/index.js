"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Productos_1 = require("./Productos");
var router = express_1.default.Router();
router.use("/productos", Productos_1.router);
exports.default = router;
