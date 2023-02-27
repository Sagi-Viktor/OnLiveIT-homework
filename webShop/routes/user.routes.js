import express from 'express';
import bcrypt from 'bcrypt';
import { createUser, getUserByEmail } from '../db/user.model.js'
import jwt from 'jsonwebtoken';


const router = express.Router();


router.post('/login', async (req, resp) => {
    let data = req.body;
    const pwd = data.pwd;
    const email = data.email;
    let userData = {};
    let hashedPwd = '';
    let isExsist = false;
    userData = await getUserByEmail(email)
    if (userData) {
        hashedPwd = userData.password;
        isExsist = true;
    }
    if (isExsist && await validatePwd(pwd, hashedPwd)) {
        const user = {email: email};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        resp.send({ user: email, accessToken: accessToken});
    } else {
        resp.send("failed to login");
    }
})

router.post('/register', async (req, resp) => {
    let data = req.body;
    const pwd = data.password;
    
    createUser({
        email: data.email,
        password: await generateHash(pwd)
    });
    resp.send(`user created with eamil: ${data.email}`);
})


const generateHash =  async (pwd, saltRounds=10) => {
    let hash;
    await bcrypt
        .hash(pwd, saltRounds)
        .then(h => {
            hash = h
    });
    return hash;
}

const validatePwd = async (password, hash) => {
    let resp;
    await bcrypt
    .compare(password, hash)
    .then(r => {
        resp = r;
    })
    .catch(err => console.error(err.message));
    return resp;
}

export default router;
