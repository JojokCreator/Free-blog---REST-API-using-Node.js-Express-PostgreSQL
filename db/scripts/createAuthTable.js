import { query } from "../index.js"

const sqlString = `CREATE TABLE IF NOT EXISTS authtokens(id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, token VARCHAR NOT NULL, user_id INT NOT NULL UNIQUE REFERENCES users (user_id) );`;

async function createUsersTable(){
    const res = await query(sqlString)
    console.log(res.command)
}
createUsersTable()