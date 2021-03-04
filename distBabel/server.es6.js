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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _dirname = _path["default"].resolve();

var app = (0, _express["default"])();
var httpServer = (0, _http.createServer)(app);
exports.httpServer = httpServer;
var io = new _socket.Server(httpServer);
exports.io = io;
var PORT = process.env.PORT || 8080;
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
console.log(_dirname);
app.use('/', _express["default"]["static"]("".concat(_dirname, "/public")));
app.use("/api", _index["default"]);
var server = httpServer.listen(PORT, function (err) {
  if (err) console.log("ERROR!", err);
  console.log("Server up on port ".concat(server.address().port));
}); // An error while serving

server.on("error", function (error) {
  return console.error("Error in server!!!!!\n".concat(error));
});
io.on("connection", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(socket) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = socket;
            _context.next = 3;
            return generateTable();

          case 3:
            _context.t1 = _context.sent;

            _context.t0.emit.call(_context.t0, "products", _context.t1);

            // Chat messages methods
            handleMessages(socket);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

function newItemAdded() {
  return _newItemAdded.apply(this, arguments);
}

function _newItemAdded() {
  _newItemAdded = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = io.sockets;
            _context2.next = 3;
            return generateTable();

          case 3:
            _context2.t1 = _context2.sent;

            _context2.t0.emit.call(_context2.t0, "products", _context2.t1);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _newItemAdded.apply(this, arguments);
}

function generateTable() {
  return _generateTable.apply(this, arguments);
} // const messages = [];


function _generateTable() {
  _generateTable = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var products;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _Archivo.db.getAll();

          case 2:
            products = _context3.sent;

            if (products.length) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return");

          case 5:
            return _context3.abrupt("return", "\n      <div class=\"container-table\">\n        <h2>Product List</h2>\n        <table class=\"tabla-table table table-striped\">\n          <thead>\n            <tr>\n              <th scope=\"col\">Title</th>\n              <th scope=\"col\">Price</th>\n              <th scope=\"col\">Thumbnail</th>\n            </tr>\n          </thead>\n          <tbody>\n           ".concat(products.map(function (p) {
              return "\n            <tr>\n              <td scope=\"row\">".concat(p.title, "</td>\n              <td>").concat(p.price, "</td>\n              <td><img src=\"").concat(p.thumbnail, "\"/></td>\n            </tr>\n           ");
            }).join(""), "\n          </tbody>\n        </table>\n      </div>\n  "));

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _generateTable.apply(this, arguments);
}

function handleMessages(_x2) {
  return _handleMessages.apply(this, arguments);
}

function _handleMessages() {
  _handleMessages = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(socket) {
    var messages;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            // Add socket to chat room
            // I know it's weird, everyone joins the room, but, fo.
            socket.join("generalChat"); // First connection send all records

            _context5.next = 3;
            return _Messages.dbMessages.getAll();

          case 3:
            messages = _context5.sent;
            socket.emit("chat", messages);
            socket.on("chat", /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(from, msg) {
                var newMessage;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return _Messages.dbMessages.add({
                          date: new Date().toLocaleString(),
                          msg: msg,
                          from: from
                        });

                      case 2:
                        newMessage = _context4.sent;
                        io.to("generalChat").emit("chat", [newMessage]);

                      case 4:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x3, _x4) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _handleMessages.apply(this, arguments);
}