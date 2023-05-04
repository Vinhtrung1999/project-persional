const { validateToken } = require('../token');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.token;
        const privateKey = process.env.JWT_SECRET;
        if (!token) {
            return res.json({
                code: 1,
                message: 'Token should be in header',
            });
        }
        const userData = validateToken(token, privateKey);

        req.user = userData;
        next();
    } catch (error) {
        return res.json({
            code: 98,
            message: 'Token invalid',
        })
    }
}