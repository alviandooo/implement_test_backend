const jwt = require('jsonwebtoken');
module.exports = (data) => {
    try {
        return jwt.sign({
            data
        }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
    } catch (error) {
        throw error
    }
}