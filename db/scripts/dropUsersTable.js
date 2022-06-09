import { query } from "../index.js"

const sqlString = `DROP TABLE IF NOT EXISTS users;`;

async function dropUsersTable(){
    const res = await query(sqlString)
    console.log(res.command)
}
dropUsersTable()