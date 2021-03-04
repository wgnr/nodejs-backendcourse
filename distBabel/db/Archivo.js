"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

var _productos = new WeakMap();

var _readFile = new WeakSet();

var _writeFile = new WeakSet();

var Archivo = /*#__PURE__*/function () {
  function Archivo(fileName) {
    _classCallCheck(this, Archivo);

    _writeFile.add(this);

    _readFile.add(this);

    _productos.set(this, {
      writable: true,
      value: void 0
    });

    this.fileName = fileName;
  }

  _createClass(Archivo, [{
    key: "getAll",
    value: function () {
      var _getAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _classPrivateMethodGet(this, _readFile, _readFile2).call(this);

              case 2:
                return _context.abrupt("return", _classPrivateFieldGet(this, _productos));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAll() {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "getById",
    value: function () {
      var _getById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _classPrivateMethodGet(this, _readFile, _readFile2).call(this);

              case 2:
                return _context2.abrupt("return", _classPrivateFieldGet(this, _productos).find(function (p) {
                  return p.id == id;
                }));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getById(_x) {
        return _getById.apply(this, arguments);
      }

      return getById;
    }()
  }, {
    key: "add",
    value: function () {
      var _add = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(nombre, precio, urlFoto) {
        var newProducto;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _classPrivateMethodGet(this, _readFile, _readFile2).call(this);

              case 2:
                newProducto = {
                  title: nombre,
                  price: precio,
                  thumbnail: urlFoto,
                  id: (0, _uuid.v4)()
                };

                _classPrivateFieldGet(this, _productos).push(newProducto);

                _context3.next = 6;
                return _classPrivateMethodGet(this, _writeFile, _writeFile2).call(this);

              case 6:
                if (!_context3.sent) {
                  _context3.next = 10;
                  break;
                }

                _context3.t0 = newProducto;
                _context3.next = 11;
                break;

              case 10:
                _context3.t0 = null;

              case 11:
                return _context3.abrupt("return", _context3.t0);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function add(_x2, _x3, _x4) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, body) {
        var productToUpdate, _i, _Object$entries, _Object$entries$_i, k, v;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _classPrivateMethodGet(this, _readFile, _readFile2).call(this);

              case 2:
                productToUpdate = _classPrivateFieldGet(this, _productos).find(function (p) {
                  return p.id === id;
                });

                if (productToUpdate) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt("return");

              case 5:
                for (_i = 0, _Object$entries = Object.entries(body); _i < _Object$entries.length; _i++) {
                  _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), k = _Object$entries$_i[0], v = _Object$entries$_i[1];
                  productToUpdate[k] = v;
                }

                _context4.next = 8;
                return _classPrivateMethodGet(this, _writeFile, _writeFile2).call(this);

              case 8:
                if (!_context4.sent) {
                  _context4.next = 12;
                  break;
                }

                _context4.t0 = productToUpdate;
                _context4.next = 13;
                break;

              case 12:
                _context4.t0 = null;

              case 13:
                return _context4.abrupt("return", _context4.t0);

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function update(_x5, _x6) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
        var productToDelete;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _classPrivateMethodGet(this, _readFile, _readFile2).call(this);

              case 2:
                productToDelete = _classPrivateFieldGet(this, _productos).find(function (p) {
                  return p.id === id;
                });

                if (productToDelete) {
                  _context5.next = 5;
                  break;
                }

                return _context5.abrupt("return");

              case 5:
                _classPrivateFieldSet(this, _productos, _classPrivateFieldGet(this, _productos).filter(function (p) {
                  return p.id !== id;
                }));

                _context5.next = 8;
                return _classPrivateMethodGet(this, _writeFile, _writeFile2).call(this);

              case 8:
                if (!_context5.sent) {
                  _context5.next = 12;
                  break;
                }

                _context5.t0 = productToDelete;
                _context5.next = 13;
                break;

              case 12:
                _context5.t0 = null;

              case 13:
                return _context5.abrupt("return", _context5.t0);

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _delete(_x7) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "deleteFile",
    value: function () {
      var _deleteFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return _fs["default"].promises.unlink(this.fileName);

              case 3:
                _context6.next = 8;
                break;

              case 5:
                _context6.prev = 5;
                _context6.t0 = _context6["catch"](0);
                console.log(_context6.t0);

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 5]]);
      }));

      function deleteFile() {
        return _deleteFile.apply(this, arguments);
      }

      return deleteFile;
    }()
  }]);

  return Archivo;
}();

exports["default"] = Archivo;

var _readFile2 = /*#__PURE__*/function () {
  var _readFile3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    var products;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _fs["default"].promises.readFile(this.fileName, "utf-8");

          case 3:
            products = _context7.sent;

            _classPrivateFieldSet(this, _productos, JSON.parse(products));

            _context7.next = 11;
            break;

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            console.error("File can't be loaded.", _context7.t0);

            _classPrivateFieldSet(this, _productos, []);

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this, [[0, 7]]);
  }));

  function _readFile2() {
    return _readFile3.apply(this, arguments);
  }

  return _readFile2;
}();

var _writeFile2 = /*#__PURE__*/function () {
  var _writeFile3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _fs["default"].promises.writeFile(this.fileName, JSON.stringify(_classPrivateFieldGet(this, _productos)), "utf-8");

          case 3:
            _context8.next = 9;
            break;

          case 5:
            _context8.prev = 5;
            _context8.t0 = _context8["catch"](0);
            console.error("Error in saving product", _context8.t0);
            return _context8.abrupt("return", false);

          case 9:
            return _context8.abrupt("return", true);

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this, [[0, 5]]);
  }));

  function _writeFile2() {
    return _writeFile3.apply(this, arguments);
  }

  return _writeFile2;
}();

var db = new Archivo("./db/productos.txt");
exports.db = db;