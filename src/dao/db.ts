import betterSqlite from "better-sqlite3"
import * as fs from "fs";

let db: betterSqlite.Database

try {
    db = betterSqlite("db.db", {fileMustExist: true})
} catch (e){
    // db does not exist yet
    db = betterSqlite("db.db")
    db.exec(fs.readFileSync("./src/dao/schema.sql").toString())
}

db.pragma('journal_mode = WAL');

export default db