import {createSheet as c, sheetsByUser, sheetById as s} from "./dao/sheets";
import {getRecordsBySheetId} from "./dao/records";
import {EventType, SheetInfo} from "./resolvers-types";

export function getSheets(userId: number) {
    return sheetsByUser(userId)
}

export function createSheet(userId: number, sheetName: string, year: number, month:number) {
    const newSheetName = sheetName + "-" + `${year.toString().padStart(2, "0")}${month.toString().padStart(2, "0")}`
    return c(newSheetName, userId)
}

export function sheetById(sheetId: number){
    const rows = getRecordsBySheetId(sheetId)
    const hasEnded = rows.length % 2 === 0
    if (!hasEnded){
        rows.push({id: rows[rows.length -1].id+1, time: new Date().getTime(), event: EventType.End})
    }
    let numMillis = 0
    let tmp = 0
    rows.map(e => {
        if (e.event === EventType.Start){
            tmp = e.time
        } else {
            numMillis += (e.time - tmp)
        }
        e.time = Math.floor(e.time / 1000)
    })
    return {
        summary: s(sheetId),
        total: Math.floor(numMillis / 1000),
        records: rows,
        hasEnded: hasEnded
    } as SheetInfo
}