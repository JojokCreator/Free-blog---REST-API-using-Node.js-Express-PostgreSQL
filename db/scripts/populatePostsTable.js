import { query } from "../index.js";

async function populatePosts() {
        const res = await query (
            `INSERT INTO posts (post_title, post_body, date, user_id) VALUES ($1, $2, $3, $4) RETURNING *;`,
             ['Hello World', 'This is the body of our post', '1999-01-08 04:05:06', 1]
        );
        console.log(res.rows[0])
    }

populatePosts()