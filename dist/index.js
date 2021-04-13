"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
Object.defineProperty(exports, "__esModule", { value: true });
const node_sql_parser_1 = require("node-sql-parser");
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
const file_name = process.argv[2];
fs.open(file_name, "r", (err, fd) => {
    if (err) {
        fs.writeFileSync(file_name, "");
        console.log(err);
    }
});
start_repl();
async function start_repl() {
    let query = "";
    while (query !== "quit") {
        process.stdout.write("negi-ramen> ");
        query = await std_input();
        if (query !== "quit") {
            let parsed_query = parse_sql(query);
        }
    }
}
function parse_sql(sql) {
    const parser = new node_sql_parser_1.Parser();
    const ast = parser.astify(sql);
    console.log(ast);
    const parsed_query = parser.sqlify(ast);
    console.log(parsed_query);
    return [''];
}
async function std_input() {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    let query = '';
    const reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    for await (const line of reader) {
        query = line;
        reader.close();
    }
    return query;
}
//# sourceMappingURL=index.js.map