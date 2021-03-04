"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var fs_1 = __importDefault(require("fs"));
var uuid_1 = require("uuid");
var Archivo = /** @class */ (function () {
    function Archivo(fileName) {
        this.fileName = fileName;
        this.productos = [];
    }
    Archivo.prototype.readFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var products, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs_1.default.promises.readFile(this.fileName, "utf-8")];
                    case 1:
                        products = _a.sent();
                        this.productos = JSON.parse(products);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("File can't be loaded.", error_1);
                        this.productos = [];
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Archivo.prototype.writeFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs_1.default.promises.writeFile(this.fileName, JSON.stringify(this.productos), "utf-8")];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error("Error in saving product", error_2);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/, true];
                }
            });
        });
    };
    Archivo.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readFile()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.productos];
                }
            });
        });
    };
    Archivo.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readFile()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.productos.find(function (p) { return p.id == id; })];
                }
            });
        });
    };
    Archivo.prototype.add = function (nombre, precio, urlFoto) {
        return __awaiter(this, void 0, void 0, function () {
            var newProducto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readFile()];
                    case 1:
                        _a.sent();
                        newProducto = {
                            title: nombre,
                            price: precio,
                            thumbnail: urlFoto,
                            id: uuid_1.v4(),
                        };
                        this.productos.push(newProducto);
                        return [4 /*yield*/, this.writeFile()];
                    case 2: return [2 /*return*/, (_a.sent()) ? newProducto : null];
                }
            });
        });
    };
    Archivo.prototype.update = function (id, body) {
        return __awaiter(this, void 0, void 0, function () {
            var productToUpdate, _i, _a, _b, k, v;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.readFile()];
                    case 1:
                        _c.sent();
                        productToUpdate = this.productos.find(function (p) { return p.id === id; });
                        if (!productToUpdate)
                            return [2 /*return*/];
                        for (_i = 0, _a = Object.entries(body); _i < _a.length; _i++) {
                            _b = _a[_i], k = _b[0], v = _b[1];
                            productToUpdate[k] = v;
                        }
                        return [4 /*yield*/, this.writeFile()];
                    case 2: return [2 /*return*/, (_c.sent()) ? productToUpdate : null];
                }
            });
        });
    };
    Archivo.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var productToDelete;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readFile()];
                    case 1:
                        _a.sent();
                        productToDelete = this.productos.find(function (p) { return p.id === id; });
                        if (!productToDelete)
                            return [2 /*return*/];
                        this.productos = this.productos.filter(function (p) { return p.id !== id; });
                        return [4 /*yield*/, this.writeFile()];
                    case 2: return [2 /*return*/, (_a.sent()) ? productToDelete : null];
                }
            });
        });
    };
    Archivo.prototype.deleteFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs_1.default.promises.unlink(this.fileName)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Archivo;
}());
exports.default = Archivo;
exports.db = new Archivo("./db/productos.txt");
