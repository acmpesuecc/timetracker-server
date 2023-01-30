import betterSqlite from "better-sqlite3"
import * as fs from "fs";
import * as PROCESS from "process";

let db: betterSqlite.Database
const filename = PROCESS.env.DATABASE_PATH
try {
    db = betterSqlite(filename, {fileMustExist: true})
} catch (e){
    // db does not exist yet
    db = betterSqlite(filename)
    console.log("Creating tables")
    db.exec(fs.readFileSync("./src/dao/schema.sql").toString())
    console.log("Created tables")
}

db.pragma('journal_mode = WAL');

export default db