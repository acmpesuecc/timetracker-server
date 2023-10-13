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

enum EditRecord {
    Start,
    End
}

input IRecord {
    time: Int!,
    event: IRecord
}

export function Edit(sheetId,Event, Time) {
    db
    .prepare(
        "UPDATE RECORDS SET (sheetId,Event,Time) VALUES (?,?,?)"
    );

}