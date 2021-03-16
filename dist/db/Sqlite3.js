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
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var sqlite3_1 = require("sqlite3");
var TABLE_NAME = "mensajes";
var QUERY_CREATE_TABLE = "\nCREATE TABLE IF NOT EXISTS " + TABLE_NAME + " (\n  id TEXT PRIMARY KEY,\n  date TEXT,\n  msg TEXT,\n  fromUser TEXT)\n  ";
var QUERY_GET_ALL = "select * from " + TABLE_NAME;
var QUERY_INSERT_MESSAGE = "INSERT INTO " + TABLE_NAME + " \n  (id,date,msg,fromUser) \n  VALUES\n  ($id,$date,$msg,$fromUser);  \n";
sqlite3_1.verbose();
var dbMessages = new sqlite3_1.Database("mensajesSQLite3.db");
// INIT
dbMessages.serialize(function () {
    dbMessages.run(QUERY_CREATE_TABLE);
});
var getAll = function () { return __awaiter(void 0, void 0, void 0, function () {
    var p;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                p = new Promise(function (res, rej) {
                    dbMessages.all(QUERY_GET_ALL, function (e, r) {
                        if (e)
                            rej(e);
                        res(r);
                    });
                });
                return [4 /*yield*/, p];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var add = function (values) { return __awaiter(void 0, void 0, void 0, function () {
    var date, msg, fromUser, newMessage, p;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                date = values.date, msg = values.msg, fromUser = values.fromUser;
                newMessage = {
                    id: uuid_1.v4(),
                    date: date,
                    msg: msg,
                    fromUser: fromUser,
                };
                p = new Promise(function (res, rej) {
                    dbMessages.run(QUERY_INSERT_MESSAGE, {
                        $id: newMessage.id,
                        $date: newMessage.date,
                        $msg: newMessage.msg,
                        $fromUser: newMessage.fromUser,
                    }, function (e) {
                        if (e)
                            rej(e);
                        res(newMessage);
                    });
                });
                return [4 /*yield*/, p];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var exit = function () { return dbMessages.close(); };
exports.default = {
    getAll: getAll,
    add: add,
    exit: exit,
};
// const Sqlite3 = sqlite3.verbose();
// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(':memory:');
// db.serialize(function() {
//   db.run("CREATE TABLE lorem (info TEXT)");
//   var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();
//   db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
//       console.log(row.id + ": " + row.info);
//   });
// });
// db.close();
