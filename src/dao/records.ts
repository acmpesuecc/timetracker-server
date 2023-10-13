import db from "./db";
import { NRecord } from "../resolvers-types";

export function createRecord(sheetId: number, time: number, event: string) {
  return db
    .prepare("INSERT INTO Records (SheetId, Event, Time) VALUES (?,?,?)")
    .run(sheetId, event, time).lastInsertRowid;
}

export function getRecordCountBySheetId(sheetId: number) {
  return (
    db
      .prepare("SELECT COUNT(*) as c FROM Records WHERE SheetId = ?")
      //@ts-ignore
      .get(sheetId).c
  );
}

export function getRecordsBySheetId(sheetId: number) {
  return db
    .prepare(
      "SELECT Event as event, Id as id, Time as time FROM Records WHERE SheetId = ? ORDER BY Id",
    )
    .all(sheetId) as Array<NRecord>;
}
