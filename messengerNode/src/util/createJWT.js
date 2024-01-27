const jwt = require('jsonwebtoken')

function createJWT(data, timeOut, secretKey) {
    const token = jwt.sign({
        payload: data
    }, secretKey, { expiresIn: timeOut })
    return token
}
module.exports = createJWT