import { query } from "../db/index.js"
import bcrypt from 'bcrypt'

export async function getUsers(req, res) {
    const users = await query(`SELECT * FROM users ORDER BY user_id ASC;`)
    res.send({
        success: true,
        payload: users.rows,
    })
}
export async function getUserById(req, res) {
    const id = req.params.id;
    const foundUser = await query(`SELECT * FROM users WHERE user_id = $1;`,[id])
    res.send({
        success: true,
        payload: foundUser.rows,
    })
}
export async function deleteUserById(req, res) {
    const id = req.params.id;
    const deletedUsers = await query(`DELETE FROM users WHERE user_id = $1;`,[id])
    res.send({
        success: true,
        payload: `User with the Id of ${id} deleted`,
    })
}
// CREATE A USER
export async function createUser(req, res) {
    const newUser = req.body;
    console.log(req.body) 
    const checkEmail = await query (`SELECT * FROM users WHERE email = $1`, [newUser.email])
    if (checkEmail.rows.length === 0) {
    const hash = await bcrypt.hash(newUser.password, 10)
    const createdUser = await query (
            `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *;`,
             [newUser.first_name, newUser.last_name, newUser.email, hash]
        );
    res.send({
        success: true,
        payload: createdUser.rows
    })
} else {
console.log('email exists')
res.status(500).send('User email already exists!') }
}

// UPDATE A USER BY ID
export async function updateUserById(req, res) {
    const { id } = req.params;
    const { first_name, last_name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10)
    const userUpdate = await query(`SELECT * FROM users WHERE user_id = ${id}`)
    if (first_name) {
        await query (`UPDATE users SET first_name = $1 WHERE user_id = ${id};`,
        [first_name] )
    }
    if (last_name) {
        await query (`UPDATE users SET last_name = $1 WHERE user_id = ${id};`,
        [last_name] )
    }
    if (email) {
        await query (`UPDATE users SET email = $1 WHERE user_id = ${id};`,
        [email] )
    }
    if (password) {
        await query (`UPDATE users SET password = $1 WHERE user_id = ${id};`,
        [hash] )
    }
    if (userUpdate) {
        res.send({
        success: true,
        payload: userUpdate.rows
    })} 
}

