"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newItemAdded = newItemAdded;
exports.generateTable = generateTable;
exports.io = exports.httpServer = void 0;

var _express = _interopRequireDefault(require("express"));

var _http = require("http");

var _socket = require("socket.io");

var _path = _interopRequireDefault(require("path"));

var _index = _interopRequireDefault(require("./routes/index.mjs"));

var _Archivo = require("./db/Archivo.mjs");

var _Messages = require("./db/Messages.mjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _dirname = _path.default.resolve();

var app = (0, _express.default)();
var httpServer = (0, _http.createServer)(app);
exports.httpServer = httpServer;
var io = new _socket.Server(httpServer);
exports.io = io;
var PORT = process.env.PORT || 8080;
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
console.log(_dirname);
app.use('/', _express.default.static("".concat(_dirname, "/public")));
app.use("/api", _index.default);
var server = httpServer.listen(PORT, err => {
  if (err) console.log("ERROR!", err);
  console.log("Server up on port ".concat(server.address().port));
}); // An error while serving

server.on("error", error => console.error("Error in server!!!!!\n".concat(error)));
io.on("connection", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (socket) {
    // When user connect: pass to him all productos
    socket.emit("products", yield generateTable()); // Chat messages methods

    handleMessages(socket);
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

function newItemAdded() {
  return _newItemAdded.apply(this, arguments);
}

function _newItemAdded() {
  _newItemAdded = _asyncToGenerator(function* () {
    io.sockets.emit("products", yield generateTable());
  });
  return _newItemAdded.apply(this, arguments);
}

function generateTable() {
  return _generateTable.apply(this, arguments);
} // const messages = [];


function _generateTable() {
  _generateTable = _asyncToGenerator(function* () {
    var products = yield _Archivo.db.getAll();
    if (!products.length) return;
    return "\n      <div class=\"container-table\">\n        <h2>Product List</h2>\n        <table class=\"tabla-table table table-striped\">\n          <thead>\n            <tr>\n              <th scope=\"col\">Title</th>\n              <th scope=\"col\">Price</th>\n              <th scope=\"col\">Thumbnail</th>\n            </tr>\n          </thead>\n          <tbody>\n           ".concat(products.map(p => "\n            <tr>\n              <td scope=\"row\">".concat(p.title, "</td>\n              <td>").concat(p.price, "</td>\n              <td><img src=\"").concat(p.thumbnail, "\"/></td>\n            </tr>\n           ")).join(""), "\n          </tbody>\n        </table>\n      </div>\n  ");
  });
  return _generateTable.apply(this, arguments);
}

function handleMessages(_x2) {
  return _handleMessages.apply(this, arguments);
}

function _handleMessages() {
  _handleMessages = _asyncToGenerator(function* (socket) {
    // Add socket to chat room
    // I know it's weird, everyone joins the room, but, fo.
    socket.join("generalChat"); // First connection send all records

    var messages = yield _Messages.dbMessages.getAll();
    socket.emit("chat", messages);
    socket.on("chat", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(function* (from, msg) {
        var newMessage = yield _Messages.dbMessages.add({
          date: new Date().toLocaleString(),
          msg,
          from
        });
        io.to("generalChat").emit("chat", [newMessage]);
      });

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }());
  });
  return _handleMessages.apply(this, arguments);
}