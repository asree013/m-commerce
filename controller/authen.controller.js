const express = require('express')
const app = express.Router()
const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keyJwt = process.env.JWT_TOKEN

const refreshTokens = [];

function generateAccessToken(user) {
  return jwt.sign({user_id: user.id, username: user.username}, keyJwt, {expiresIn: '1h'})
};

function generateRefreshToken() {
  const refreshToken = jwt.sign({ type: 'refresh' }, keyJwt, { expiresIn: '7d' });
  refreshTokens.push(refreshToken);
  return refreshToken;
};

app.post('/login', async(req, res) => {
    try {
        const {username, password} = req.body
        const findUser = await db.users.findFirst({
            where: {
                username: username
            }
        })
        if(!findUser) {
            return res.status(401).json({message: 'is not user'})
        }
        const hashPassword = await bcrypt.compare(password, findUser.password)
        if(!hashPassword) {
            return res.status(401).json({message: 'password not match'})
        }
        const accessToken = generateAccessToken(findUser);
        const refreshToken = generateRefreshToken();
        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json(error)
    } finally {
        db.$disconnect()
    }
})

app.post('/refresh-token', async (req, res) => {
    try {
      const refreshToken = req.body.refreshToken;
  
      if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
  
      // In a production scenario, you would typically check the validity of the refresh token
      // and fetch the associated user data from a secure and persistent storage.
  
      // Simulate fetching user data based on the refresh token
      const user = { id: 1, username: 'example_user' };
  
      const accessToken = generateAccessToken(user);
  
      res.json({ accessToken });
    } catch (error) {
      res.status(500).json(error);
    }
  });

app.post('/token', async (req, res) => {
    try {
        const token = req.header('Authorization')
        const decode = await jwt.verify(token.split(' ')[1], keyJwt);
        if(decode){
            const userId = decode.user_id
            const iat = decode.iat
            const exp = decode.exp
            res.status(200).json({user_id: userId, username: decode.username, iat: iat, exp: exp})
        }
    } catch (error) {
        res.status(500).json(error)
    }
});

app.post('/register', async(req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        const data = {
            username: req.body.username,
            password: hashPassword,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }
        const result = await db.users.create({
            data: data
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    } finally {
        db.$disconnect()
    }
})


module.exports = app

