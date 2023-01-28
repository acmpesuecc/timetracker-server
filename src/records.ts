import {createRecord, getRecordCountBySheetId} from "./dao/records";
import {EventType} from "./resolvers-types";

function getNextEventType(sheetId: number) {
    const rowCount = getRecordCountBySheetId(sheetId)
    return (rowCount % 2) ? EventType.End : EventType.Start
}

export function punch(sheetId: number) {
    const etype = getNextEventType(sheetId)
    const punchTime = new Date().getTime()
    return createRecord(sheetId, punchTime, etype)
}