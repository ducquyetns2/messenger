const jwt = require('jsonwebtoken')
const { accessTokenKey, refreshTokenKey, ADMIN } = require('../constant')
const createJWT = require('../util/createJWT')
const User = require('../model/sqlServer/UserSQL')

const TokenController = {
    verifyToken(req, res, next) {
        try {
            if (!req.headers.token) {
                res.json({
                    error: true,
                    message: 'You are not authenticated'
                })
            } else {
                const user = jwt.verify(req.headers.token, accessTokenKey)
                req.data = user.payload
                next()
            }
        } catch (err) {
            res.json({
                error: true,
                message: 'Error server'
            })
        }
    },
    verifyTokenAndAdmin(req, res, next) {
        try {
            TokenController.verifyToken(req, res, () => {
                try {
                    const currentUser = req.data
                    if (currentUser._id === req.params.userId || currentUser.position === ADMIN) {
                        next()
                    } else {
                        res.json({
                            error: 'false',
                            message: 'You are not allow to do that'
                        })
                    }
                } catch (err) {
                    res.json({
                        error: true,
                        message: 'Error server'
                    })
                }
            })
        } catch (error) {
            res.json({
                error: true,
                message: 'Error server'
            })
        }
    },
    async refreshToken(req, res, next) {
        try {
            if (!req.signedCookies.refreshToken) {
                res.json({
                    error: true,
                    message: 'You are not authenticated'
                })
            } else {
                const data = jwt.verify(req.signedCookies.refreshToken, refreshTokenKey)
                if (data) {
                    const findedUser = await User.findByPk(data.payload)
                    const { password, ...payload } = findedUser.dataValues
                    const newAccessToken = createJWT(payload, '30m', accessTokenKey)
                    const newRefreshToken = createJWT(payload.id, '2h', refreshTokenKey)
                    res.cookie('refreshToken', newRefreshToken, {
                        httpOnly: true,
                        signed: true
                    })
                    res.json({
                        error: false,
                        data: {
                            accessToken: newAccessToken,
                            ...payload
                        }
                    })
                } else {
                    res.json({
                        error: true,
                        message: 'Your refresh token is incorrect'
                    })
                }
            }
        } catch (err) {
            res.json({
                error: true,
                message: 'Error server'
            })
        }
    }
}
module.exports = TokenController