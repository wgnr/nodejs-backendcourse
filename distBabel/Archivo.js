"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

var _productos = new WeakMap();

var _readFile = new WeakSet();

var _writeFile = new WeakSet();

class Archivo {
  constructor(fileName) {
    _writeFile.add(this);

    _readFile.add(this);

    _productos.set(this, {
      writable: true,
      value: void 0
    });

    this.fileName = fileName;
  }

  getAll() {
    var _this = this;

    return _asyncToGenerator(function* () {
      yield _classPrivateMethodGet(_this, _readFile, _readFile2).call(_this);
      return _classPrivateFieldGet(_this, _productos);
    })();
  }

  getById(id) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _classPrivateMethodGet(_this2, _readFile, _readFile2).call(_this2);
      return _classPrivateFieldGet(_this2, _productos).find(p => p.id == id);
    })();
  }

  add(nombre, precio, urlFoto) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      yield _classPrivateMethodGet(_this3, _readFile, _readFile2).call(_this3);
      var newProducto = {
        title: nombre,
        price: precio,
        thumbnail: urlFoto,
        id: (0, _uuid.v4)()
      };

      _classPrivateFieldGet(_this3, _productos).push(newProducto);

      return (yield _classPrivateMethodGet(_this3, _writeFile, _writeFile2).call(_this3)) ? newProducto : null;
    })();
  }

  update(id, body) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      yield _classPrivateMethodGet(_this4, _readFile, _readFile2).call(_this4);

      var productToUpdate = _classPrivateFieldGet(_this4, _productos).find(p => p.id === id);

      if (!productToUpdate) return;

      for (var [k, v] of Object.entries(body)) {
        productToUpdate[k] = v;
      }

      return (yield _classPrivateMethodGet(_this4, _writeFile, _writeFile2).call(_this4)) ? productToUpdate : null;
    })();
  }

  delete(id) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      yield _classPrivateMethodGet(_this5, _readFile, _readFile2).call(_this5);

      var productToDelete = _classPrivateFieldGet(_this5, _productos).find(p => p.id === id);

      if (!productToDelete) return;

      _classPrivateFieldSet(_this5, _productos, _classPrivateFieldGet(_this5, _productos).filter(p => p.id !== id));

      return (yield _classPrivateMethodGet(_this5, _writeFile, _writeFile2).call(_this5)) ? productToDelete : null;
    })();
  }

  deleteFile() {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      try {
        yield _fs.default.promises.unlink(_this6.fileName);
      } catch (e) {
        console.log(e);
      }
    })();
  }

}

exports.default = Archivo;

var _readFile2 = /*#__PURE__*/function () {
  var _readFile3 = _asyncToGenerator(function* () {
    try {
      var products = yield _fs.default.promises.readFile(this.fileName, "utf-8");

      _classPrivateFieldSet(this, _productos, JSON.parse(products));
    } catch (error) {
      console.error("File can't be loaded.", error);

      _classPrivateFieldSet(this, _productos, []);
    }
  });

  function _readFile2() {
    return _readFile3.apply(this, arguments);
  }

  return _readFile2;
}();

var _writeFile2 = /*#__PURE__*/function () {
  var _writeFile3 = _asyncToGenerator(function* () {
    try {
      yield _fs.default.promises.writeFile(this.fileName, JSON.stringify(_classPrivateFieldGet(this, _productos)), "utf-8");
    } catch (error) {
      console.error("Error in saving product", error);
      return false;
    }

    return true;
  });

  function _writeFile2() {
    return _writeFile3.apply(this, arguments);
  }

  return _writeFile2;
}();

var db = new Archivo("./db/productos.txt");
exports.db = db;