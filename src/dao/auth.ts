import db from "./db"

export interface User {
    Id: number,
    Username: string,
    Password: string
}

export function userByUsername(username: string) {
    const row = db.prepare("SELECT * FROM Users WHERE Username = ?").get(username)
    return row as (User | undefined)
}

export function createUser(user: Partial<User>){
    try {
        const info = db.prepare("INSERT INTO Users (Username, Password) VALUES (?, ?)").run(user.Username, user.Password)
        return info.lastInsertRowid
    } catch (e){
        return -1;
    }
}