"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _express = _interopRequireDefault(require("express"));

var _Archivo = require("../db/Archivo.mjs");

var _index = require("../index.mjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express.default.Router();

exports.router = router;
router.get("", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var productos = yield _Archivo.db.getAll();
    if (productos.length === 0) return res.status(404).json({
      error: "no hay productos cargados."
    });
    res.json(productos);
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get("/:id", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var {
      id
    } = req.params;
    var producto = yield _Archivo.db.getById(id);
    if (!producto) return res.status(404).json({
      error: "producto no encontrado."
    });
    res.json(producto);
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post("", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var {
      title,
      price,
      thumbnail
    } = req.body;
    var newProduct = yield _Archivo.db.add(title, +price, thumbnail);
    if (!newProduct) return res.status(500).json({
      error: "No se ha podido crear el producto."
    });
    yield (0, _index.newItemAdded)();
    res.redirect("/");
  });

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.put("/:id", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var {
      id
    } = req.params;
    var body = {};
    var fieldOfInterest = ["title", "price", "thumbnail"];

    for (var field of fieldOfInterest) {
      var _req$body;

      if ((_req$body = req.body) !== null && _req$body !== void 0 && _req$body[field]) body[field] = req.body[field];
    }

    var updatedProduct = yield _Archivo.db.update(id, body);
    if (!updatedProduct) return res.status(500).json({
      error: "No se ha podido borrar el producto."
    });
    res.json(updatedProduct);
  });

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.delete("/:id", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    var {
      id
    } = req.params;
    var deletedProduct = yield _Archivo.db.delete(id);
    if (!deletedProduct) return res.status(500).json({
      error: "No se ha podido borrar el producto."
    });
    res.json(deletedProduct);
  });

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());