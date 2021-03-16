"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbMessages = exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

var _messages = new WeakMap();

var _readFile = new WeakSet();

var _writeFile = new WeakSet();

class Archivo {
  constructor(fileName) {
    _writeFile.add(this);

    _readFile.add(this);

    _messages.set(this, {
      writable: true,
      value: void 0
    });

    this.fileName = fileName;
  }

  getAll() {
    var _this = this;

    return _asyncToGenerator(function* () {
      yield _classPrivateMethodGet(_this, _readFile, _readFile2).call(_this);
      return _classPrivateFieldGet(_this, _messages);
    })();
  }

  add(_ref) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      var {
        date,
        msg,
        from
      } = _ref;
      yield _classPrivateMethodGet(_this2, _readFile, _readFile2).call(_this2);
      var newMessage = {
        id: (0, _uuid.v4)(),
        date,
        msg,
        from
      };

      _classPrivateFieldGet(_this2, _messages).push(newMessage);

      return (yield _classPrivateMethodGet(_this2, _writeFile, _writeFile2).call(_this2)) ? newMessage : null;
    })();
  }

}

exports.default = Archivo;

var _readFile2 = /*#__PURE__*/function () {
  var _readFile3 = _asyncToGenerator(function* () {
    try {
      var messages = yield _fs.default.promises.readFile(this.fileName, "utf-8");

      _classPrivateFieldSet(this, _messages, JSON.parse(messages));
    } catch (error) {
      console.error("File can't be loaded.", error);

      _classPrivateFieldSet(this, _messages, []);
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
      yield _fs.default.promises.writeFile(this.fileName, JSON.stringify(_classPrivateFieldGet(this, _messages)), "utf-8");
    } catch (error) {
      console.error("Error in saving message", error);
      return false;
    }

    return true;
  });

  function _writeFile2() {
    return _writeFile3.apply(this, arguments);
  }

  return _writeFile2;
}();

var dbMessages = new Archivo("./db/messages.txt");
exports.dbMessages = dbMessages;