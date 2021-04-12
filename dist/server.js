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
exports.generateTable = exports.newItemAdded = exports.io = exports.httpServer = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var path_1 = __importDefault(require("path"));
var index_1 = __importDefault(require("./routes/index"));
var Archivo_1 = require("./db/Archivo");
var Messages_1 = require("./db/Messages");
var __dirname = path_1.default.resolve();
var app = express_1.default();
exports.httpServer = http_1.createServer(app);
exports.io = new socket_io_1.Server(exports.httpServer);
var PORT = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/", express_1.default.static(__dirname + "/public"));
app.use("/api", index_1.default);
var server = exports.httpServer.listen(PORT, function () {
    console.log("\u2714 Server up on port " + PORT);
    mongoose_1.default
        .connect("mongodb://localhost/ecommerce", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(function (r) { return console.log("\u2714 Connected to DB"); })
        .catch(function (e) {
        console.error("\u274C Cannot connect to DB... exiting... ");
        console.error(e);
        process.exit();
    });
});
// An error while serving
server.on("error", function (error) { return console.error("Error in server!!!!!\n" + error); });
exports.io.on("connection", function (socket) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                // When user connect: pass to him all productos
                _b = (_a = socket).emit;
                _c = ["products"];
                return [4 /*yield*/, generateTable()];
            case 1:
                // When user connect: pass to him all productos
                _b.apply(_a, _c.concat([_d.sent()]));
                // Chat messages methods
                handleMessages(socket);
                return [2 /*return*/];
        }
    });
}); });
function newItemAdded() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = (_a = exports.io.sockets).emit;
                    _c = ["products"];
                    return [4 /*yield*/, generateTable()];
                case 1:
                    _b.apply(_a, _c.concat([_d.sent()]));
                    return [2 /*return*/];
            }
        });
    });
}
exports.newItemAdded = newItemAdded;
function generateTable() {
    return __awaiter(this, void 0, void 0, function () {
        var products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Archivo_1.db.getAll()];
                case 1:
                    products = _a.sent();
                    if (!products.length)
                        return [2 /*return*/];
                    return [2 /*return*/, "\n      <div class=\"container-table\">\n        <h2>Product List</h2>\n        <table class=\"tabla-table table table-striped\">\n          <thead>\n            <tr>\n              <th scope=\"col\">Title</th>\n              <th scope=\"col\">Price</th>\n              <th scope=\"col\">Thumbnail</th>\n            </tr>\n          </thead>\n          <tbody>\n           " + products
                            .map(function (p) { return "\n            <tr>\n              <td scope=\"row\">" + p.title + "</td>\n              <td>" + p.price + "</td>\n              <td><img src=\"" + p.thumbnail + "\"/></td>\n            </tr>\n           "; })
                            .join("") + "\n          </tbody>\n        </table>\n      </div>\n  "];
            }
        });
    });
}
exports.generateTable = generateTable;
// const messages = [];
function handleMessages(socket) {
    return __awaiter(this, void 0, void 0, function () {
        var messages;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Add socket to chat room
                    // I know it's weird, everyone joins the room, but, fo.
                    socket.join("generalChat");
                    return [4 /*yield*/, Messages_1.dbMessages.getAll()];
                case 1:
                    messages = _a.sent();
                    socket.emit("chat", messages);
                    socket.on("chat", function (from, msg) { return __awaiter(_this, void 0, void 0, function () {
                        var newMessage;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Messages_1.dbMessages.add({
                                        date: new Date().toLocaleString(),
                                        msg: msg,
                                        from: from,
                                    })];
                                case 1:
                                    newMessage = _a.sent();
                                    exports.io.to("generalChat").emit("chat", [newMessage]);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
}
