const jwt = require('jsonwebtoken')

function veryfyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decode = jwt.verify(token, process.env.JWT_TOKEN)
        req.user_id = decode.user_id
        next()
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = veryfyToken