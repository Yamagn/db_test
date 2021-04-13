import { Parser } from 'node-sql-parser';
import * as fs from 'fs';
import * as readline from 'readline';
import { pid } from 'node:process';
import { SIGINT } from 'node:constants';

const file_name: string = process.argv[2];

fs.open(file_name, "r", (err, fd) => {
    if(err) {
        fs.writeFileSync(file_name, "")
        console.log(err)
    }
})

start_repl()

async function start_repl() {
    let query: string = ""
    while(query !== "quit") {
        process.stdout.write("negi-ramen> ")
        query = await std_input()
        if(query !== "quit"){
            let parsed_query = parse_sql(query)
        }
    }
}

function parse_sql(sql: string): string[] {
    const parser = new Parser()
    const ast = parser.astify(sql)
    console.log(ast)
    const parsed_query = parser.sqlify(ast)
    console.log(parsed_query)
    return ['']
}

async function std_input(): Promise<string> {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    let query = '';
    const reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    for await (const line of reader) {
        query = line
        reader.close()
    }
    return query
}