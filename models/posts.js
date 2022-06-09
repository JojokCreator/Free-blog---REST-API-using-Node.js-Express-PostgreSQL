import { query } from "../db/index.js"

//Get all posts
export async function getPosts(req, res) {
    const posts = await query(`SELECT * FROM posts ORDER BY date DESC LIMIT 5;`)
    res.send({
        success: true,
        payload: posts.rows,
    })
}

//Get specific post by ID
export async function getPostById(req,res) {
    const id = req.params.id;
    const foundPost = await query(`SELECT * FROM posts WHERE post_id = $1;`,[id])
    res.send({
        success: true,
        payload: foundPost.rows,
    })
}

// Delete a post
export async function deletePostById(req,res) {
    const id = req.params.id;
    const deletePost = await query(`DELETE FROM posts WHERE post_id = $1;`,[id])
    res.send({
        success: true,
        payload: `Post ${id} deleted.`
    })
}

//Create a post
export async function createPost(req,res){
    const newPost = req.body;
    console.log(req.body);
    const createdPost = await query(
    `INSERT INTO posts (post_title, post_body, date, user_id) VALUES
    ($1,$2,CURRENT_TIMESTAMP,$3) RETURNING *;`,[newPost.post_title,newPost.post_body,newPost.user_id])
    res.send({
        success: true,
        payload: createdPost.rows
        })
}

// UPDATE A POST BY ID
export async function updatePostById(req, res) {
    const { id } = req.params;
    const { post_title, post_body } = req.body;

    const postUpdate = await query(`SELECT * FROM posts WHERE post_id = ${id}`)
    if (post_title) {
        await query (`UPDATE posts SET post_title = $1 WHERE post_id = ${id};`,
        [post_title] )
    }
    if (post_body) {
        await query (`UPDATE posts SET post_body = $1 WHERE post_id = ${id};`,
        [post_body] )
    }
    if (postUpdate) {
        res.send({
        success: true,
        payload: postUpdate.rows
    })} 
}