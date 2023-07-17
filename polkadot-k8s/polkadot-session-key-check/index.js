"use strict";
/* A script to verify session key.
 * Copyright 2022 MIDL.dev

 * All inputs come from environment variables:
 *
 *  * NODE_ENDPOINT : the polkadot/kusama node rpc (localhost)
 *  * STASH_ACCOUNT_ADDRESS: the address of the validator's stash
 *  * STASH_ACCOUNT_ALIAS: an alias for your validator
 *
 *
 *  To run continously, put the following script in a cronjob.
 *  See for reference: https://opensource.com/article/17/11/how-use-cron-linux
 * */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
// Import the API
var denv = __importStar(require("dotenv"));
require("@polkadot/types");
var api_1 = require("@polkadot/api");
var web_api_1 = require("@slack/web-api");
denv.config();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var provider, api, stash_account, stash_alias, currentBlockNum, nextKeys, nodeHasKeys, message, slackWeb;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = new api_1.WsProvider("ws://".concat(process.env.NODE, ":").concat(process.env.PORT));
                    return [4 /*yield*/, api_1.ApiPromise.create({ provider: provider })];
                case 1:
                    api = _a.sent();
                    stash_account = process.env.STASH_ACCOUNT_ADDRESS;
                    stash_alias = process.env.STASH_ACCOUNT_ALIAS;
                    return [4 /*yield*/, api.rpc.chain.getHeader()];
                case 2:
                    currentBlockNum = (_a.sent()).number;
                    console.log("Polkadot Session Key Verificator by MIDL.dev");
                    console.log("Copyright 2022 MIDLDEV OU");
                    console.log("***");
                    console.log("Current block number:          ".concat(currentBlockNum.toHuman()));
                    console.log("Stash account address:         ".concat(stash_account));
                    console.log("Stash account alias:           ".concat(stash_alias));
                    console.log("Node RPC endpoint in use:      ".concat(process.env.NODE_ENDPOINT));
                    return [4 /*yield*/, api.query.session.nextKeys(stash_account)];
                case 3:
                    nextKeys = _a.sent();
                    console.log("Node's next keys: ".concat(nextKeys));
                    console.log("Node's next keys in hex: ".concat(nextKeys.toHex()));
                    return [4 /*yield*/, api.rpc.author.hasSessionKeys(nextKeys.toHex())];
                case 4:
                    nodeHasKeys = _a.sent();
                    console.log("Local node has the session keys necessary to validate: ".concat(nodeHasKeys));
                    if (!nodeHasKeys.isFalse) return [3 /*break*/, 6];
                    message = "Node ".concat(stash_alias, " does not have the session keys advertised on-chain in local storage. Expected session key: ").concat(nextKeys.toHex().substring(0, 12), "...");
                    console.error(message);
                    slackWeb = new web_api_1.WebClient(process.env.SLACK_ALERT_TOKEN);
                    return [4 /*yield*/, slackWeb.chat.postMessage({ text: message, channel: process.env.SLACK_ALERT_CHANNEL })];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    console.log("Exiting");
                    process.exit(0);
                    return [2 /*return*/];
            }
        });
    });
}
main().then(console.log).catch(console.error);
