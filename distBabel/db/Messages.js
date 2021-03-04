"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbMessages = exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

var _messages = new WeakMap();

var _readFile = new WeakSet();

var _writeFile = new WeakSet();

var Archivo = /*#__PURE__*/function () {
  function Archivo(fileName) {
    _classCallCheck(this, Archivo);

    _writeFile.add(this);

    _readFile.add(this);

    _messages.set(this, {
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
                return _context.abrupt("return", _classPrivateFieldGet(this, _messages));

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
    key: "add",
    value: function () {
      var _add = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref) {
        var date, msg, from, newMessage;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                date = _ref.date, msg = _ref.msg, from = _ref.from;
                _context2.next = 3;
                return _classPrivateMethodGet(this, _readFile, _readFile2).call(this);

              case 3:
                newMessage = {
                  id: (0, _uuid.v4)(),
                  date: date,
                  msg: msg,
                  from: from
                };

                _classPrivateFieldGet(this, _messages).push(newMessage);

                _context2.next = 7;
                return _classPrivateMethodGet(this, _writeFile, _writeFile2).call(this);

              case 7:
                if (!_context2.sent) {
                  _context2.next = 11;
                  break;
                }

                _context2.t0 = newMessage;
                _context2.next = 12;
                break;

              case 11:
                _context2.t0 = null;

              case 12:
                return _context2.abrupt("return", _context2.t0);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function add(_x) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }]);

  return Archivo;
}();

exports["default"] = Archivo;

var _readFile2 = /*#__PURE__*/function () {
  var _readFile3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var messages;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _fs["default"].promises.readFile(this.fileName, "utf-8");

          case 3:
            messages = _context3.sent;

            _classPrivateFieldSet(this, _messages, JSON.parse(messages));

            _context3.next = 11;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            console.error("File can't be loaded.", _context3.t0);

            _classPrivateFieldSet(this, _messages, []);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 7]]);
  }));

  function _readFile2() {
    return _readFile3.apply(this, arguments);
  }

  return _readFile2;
}();

var _writeFile2 = /*#__PURE__*/function () {
  var _writeFile3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _fs["default"].promises.writeFile(this.fileName, JSON.stringify(_classPrivateFieldGet(this, _messages)), "utf-8");

          case 3:
            _context4.next = 9;
            break;

          case 5:
            _context4.prev = 5;
            _context4.t0 = _context4["catch"](0);
            console.error("Error in saving message", _context4.t0);
            return _context4.abrupt("return", false);

          case 9:
            return _context4.abrupt("return", true);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 5]]);
  }));

  function _writeFile2() {
    return _writeFile3.apply(this, arguments);
  }

  return _writeFile2;
}();

var dbMessages = new Archivo("./db/messages.txt");
exports.dbMessages = dbMessages;