import express from "express";
import { query } from "../db/index.js";
import bcrypt from 'bcrypt';
import {jwtTokens} from '../utils/jwt-helpers.js'
import jwt from 'jsonwebtoken';

const router = express.Router()

router.post('/login', async (req, res)=> {
    try {
        //Email check
        const { email, password } = req.body;
        const users = await query('SELECT * FROM users WHERE email = $1;',[email]);
        if(users.rows.length === 0) return res.status(401).json({error : "Email address not found"});
        //Password Check
        console.log(users.rows)
        const validPassword = await bcrypt.compare(password, users.rows[0].password);
        console.log(password)
        console.log(validPassword)
        if(!validPassword) return res.status(401).json({error: "Incorrect password"});
        //jwt
        let tokens = jwtTokens(users.rows[0]);
        res.cookie('refresh_token', tokens.refreshToken, {httpOnly:true});
        res.json(tokens);
    } catch (error) {
        res.status(401).json({error: error.message})
    }
})

    router.get('/refresh_token', (req, res) => {
        try {
            const refreshToken = req.cookies.refresh_token
            if(refreshToken === null) return res.status(401).json({error: 'null refresh token'});
            jwt.verify(refreshToken, process.env.REFRESH_SECRET, (error,user) => {
                if(error) return res.status(403).json({error: error.message});
                let tokens = jwtTokens(user);
                res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true});
                res.json(tokens);
            })
        } catch(error) {
            res.status(401).json({error: error.message})
        }
    })

router.delete ('/refresh_token', (req, res) => {
   try {
       res.clearCookie('refresh_token')
       return res.status(200).json({message: 'refresh token deleted'})
   } catch (error){
        res.status(401).json({error: error.message})
   }
})
    
export default router;