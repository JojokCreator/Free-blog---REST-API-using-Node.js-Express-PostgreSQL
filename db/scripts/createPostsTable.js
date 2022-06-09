import { query } from "../index.js"

const sqlString = `CREATE TABLE IF NOT EXISTS posts(post_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, post_title VARCHAR, post_body VARCHAR, date TIMESTAMP, user_id INT);`;

async function createPostsTable(){
    const res = await query(sqlString)
    console.log(res.command)
}
createPostsTable()