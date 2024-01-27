const bcrypt = require('bcryptjs')

function hashPassword(req, res, next) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    req.body.password = hash
    next()
}
module.exports = hashPassword