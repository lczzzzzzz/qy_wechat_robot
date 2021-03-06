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
exports.mc_reminder_main_handler = void 0;
var axios_1 = __importDefault(require("axios"));
var dayjs_1 = __importDefault(require("dayjs"));
var database_1 = __importDefault(require("../database/database"));
var today = dayjs_1.default().format('YYYY-MM-DD');
var messagePush = function () { return __awaiter(void 0, void 0, void 0, function () {
    var database, query, result, headId, frontId, endId, headQuery, headResult, headUserId, frontQuery, frontResult, frontUserId, endQuery, endResult, endUserId, dataSuccess, successText, errorText, params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                database = new database_1.default();
                query = "select * from mc where FROM_UNIXTIME(UNIX_TIMESTAMP(date), '%Y-%m-%d') = '" + today + "'";
                return [4 /*yield*/, database.query(query)];
            case 1:
                result = _a.sent();
                headId = result[0][0].head_id;
                frontId = result[0][0].front_id;
                endId = result[0][0].end_id;
                headQuery = "select * from users where id=" + headId;
                return [4 /*yield*/, database.query(headQuery)];
            case 2:
                headResult = (_a.sent()) || [[{}]];
                headUserId = headResult[0][0].username;
                frontQuery = "select * from users where id=" + frontId;
                return [4 /*yield*/, database.query(frontQuery)];
            case 3:
                frontResult = (_a.sent()) || [[{}]];
                frontUserId = frontResult[0][0].username;
                endQuery = "select * from users where id=" + endId;
                return [4 /*yield*/, database.query(endQuery)];
            case 4:
                endResult = (_a.sent()) || [[{}]];
                endUserId = endResult[0][0].username;
                dataSuccess = headUserId && frontUserId && endUserId;
                successText = "\u4ECA\u65E5(" + today + ")\u63A5\u53E3\u4EBA\u3010<@" + headUserId + ">\u3011\uFF0C\u524D\u7AEF\u8D1F\u8D23\u4EBA\u3010<@" + frontUserId + ">\u3011\uFF0C\u540E\u7AEF\u8D1F\u8D23\u4EBA\u3010<@" + endUserId + ">\u3011";
                errorText = '??????????????????????????????????????????<@MaoKaiDi>???';
                params = {
                    msgtype: 'text',
                    text: {
                        content: dataSuccess ? successText : errorText,
                    }
                };
                axios_1.default.post('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=ea37a767-7ce2-414b-8560-518a20f69262', params);
                return [2 /*return*/];
        }
    });
}); };
exports.mc_reminder_main_handler = function () {
    return messagePush();
};
