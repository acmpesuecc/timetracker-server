import db from "./db";
import {Sheet} from "../resolvers-types";

export function sheetsByUser(userId: number) {
    return db.prepare("SELECT Id as id, Name as name FROM Sheets WHERE UserId = ?")
             .all(userId) as Array<Sheet>
}

export function createSheet(sheetName: string, userId: number){
    try {
        return db.prepare("INSERT INTO Sheets(Name, UserId) VALUES (?,?)").run(sheetName, userId).lastInsertRowid
    } catch {
        return -1;
    }
}

export function sheetById(sheetId: number){
    return db.prepare("SELECT Name as name, Id as id FROM Sheets WHERE Id = ?").get(sheetId) as Sheet
}