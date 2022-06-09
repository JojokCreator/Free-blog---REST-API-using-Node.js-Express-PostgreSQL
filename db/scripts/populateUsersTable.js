import { query } from "../index.js";

async function populateUsers() {
        const res = await query (
            `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *;`,
             ['Miriam', 'Green', 'mg@hotmail.com', 'password']
        );
        console.log(res.rows[0])
    }

populateUsers()
