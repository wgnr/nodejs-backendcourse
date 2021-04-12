"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messajes = void 0;
var mongoose_1 = require("mongoose");
var MensajesCollection = "mensajes";
var MessajeSchema = new mongoose_1.Schema({
    id: { type: String, require: true },
    date: { type: String },
    msg: { type: String },
    from: { type: String },
});
exports.Messajes = mongoose_1.model(MensajesCollection, MessajeSchema);
