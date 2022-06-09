import { query } from "../index.js"

const sqlString = `CREATE TABLE IF NOT EXISTS users(user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, first_name VARCHAR, last_name VARCHAR, email VARCHAR, password VARCHAR);`;

async function createUsersTable(){
    const res = await query(sqlString)
    console.log(res.command)
}
createUsersTable()