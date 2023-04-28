const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.body.token

    if (!token)
        return res.json({ "code": 97, "message": "please add token" })

    const JWT_SECRET = process.env.JWT_SECRET
    jwt.verify(token, JWT_SECRET, (err, data) => {
        if (err) return res.json({ "code": 98, "message": "Token wrong or expired" })
        if (data.username != req.session.username || data.salt != req.session.salt)
            return res.json({ "code": 98, "message": "Token wrong or expired" })
        next()
    })
}