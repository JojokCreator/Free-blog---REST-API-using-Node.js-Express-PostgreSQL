import express from "express";
import { authToken } from "../db/middleware/auth.js";
import { getUsers, getUserById, deleteUserById, createUser, updateUserById } from "../models/users.js";
const router = express.Router()


//Get all users
router.get('/', authToken, getUsers);

//Get user by Id
router.get('/:id', getUserById);

//Delete user by Id
router.get('/:id', deleteUserById);

//Create user
router.post('/', createUser);

//update user by id
router.patch('/:id', updateUserById);

export default router