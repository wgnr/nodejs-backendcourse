"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _express = _interopRequireDefault(require("express"));

var _Archivo = require("../db/Archivo.mjs");

var _index = require("../index.mjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();

exports.router = router;
router.get("", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var productos;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Archivo.db.getAll();

          case 2:
            productos = _context.sent;

            if (!(productos.length === 0)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              error: "no hay productos cargados."
            }));

          case 5:
            res.json(productos);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get("/:id", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, producto;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.next = 3;
            return _Archivo.db.getById(id);

          case 3:
            producto = _context2.sent;

            if (producto) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              error: "producto no encontrado."
            }));

          case 6:
            res.json(producto);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post("", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, title, price, thumbnail, newProduct;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, price = _req$body.price, thumbnail = _req$body.thumbnail;
            _context3.next = 3;
            return _Archivo.db.add(title, +price, thumbnail);

          case 3:
            newProduct = _context3.sent;

            if (newProduct) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.status(500).json({
              error: "No se ha podido crear el producto."
            }));

          case 6:
            _context3.next = 8;
            return (0, _index.newItemAdded)();

          case 8:
            res.redirect("/");

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.put("/:id", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, body, fieldOfInterest, _i, _fieldOfInterest, _req$body2, field, updatedProduct;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            body = {};
            fieldOfInterest = ["title", "price", "thumbnail"];

            for (_i = 0, _fieldOfInterest = fieldOfInterest; _i < _fieldOfInterest.length; _i++) {
              field = _fieldOfInterest[_i];
              if ((_req$body2 = req.body) !== null && _req$body2 !== void 0 && _req$body2[field]) body[field] = req.body[field];
            }

            _context4.next = 6;
            return _Archivo.db.update(id, body);

          case 6:
            updatedProduct = _context4.sent;

            if (updatedProduct) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.status(500).json({
              error: "No se ha podido borrar el producto."
            }));

          case 9:
            res.json(updatedProduct);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router["delete"]("/:id", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, deletedProduct;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.next = 3;
            return _Archivo.db["delete"](id);

          case 3:
            deletedProduct = _context5.sent;

            if (deletedProduct) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", res.status(500).json({
              error: "No se ha podido borrar el producto."
            }));

          case 6:
            res.json(deletedProduct);

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());