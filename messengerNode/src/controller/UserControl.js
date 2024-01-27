const User = require('../model/sqlServer/UserSQL')
const UserMongo = require('../model/mongoDb/User')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const createJWT = require('../util/createJWT')
const { accessTokenKey, refreshTokenKey } = require('../constant')
const IMAGESCLIENT = require('../constant').IMAGESCLIENT

class UserControl {
    getUser(req, res) {
        UserMongo.findById(req.params.userId).then(result => {
            res.json({
                error: false,
                data: result
            })
        }).catch(error => {
            res.json({
                error: true,
                message: 'Error server'
            })
        })
    }
    getAllUsers(req, res) {
        UserMongo.find().then(result => {
            res.json({
                error: false,
                data: result
            })
        }).catch(error => {
            res.json({
                error: true,
                message: 'Error server'
            })
        })
    }
    compareUser(req, res) {
        UserMongo.findOne({
            useName: req.query.useName
        }).then(result => {
            if (result) {
                const isTruePassword = bcrypt.compareSync(req.query.password, result.password)
                if (isTruePassword) {
                    const { password, filePath, ...payload } = result.toObject()
                    const accessToken = createJWT(payload, '30m', accessTokenKey)
                    const refreshToken = createJWT(payload.id, '2h', refreshTokenKey)
                    res.cookie('refreshToken', refreshToken, {
                        signed: true,
                        httpOnly: true
                    })
                    res.json({
                        error: false,
                        data: {
                            accessToken,
                            ...payload
                        }
                    })
                    return
                }
            }
            res.json({
                error: true,
                message: 'Usename or password is incorrect'
            })
        })
            .catch(error => {
                res.json({
                    error: true,
                    message: 'Error server'
                })
            })
    }
    createUser(req, res) {
        const recievedData = req.body
        const avatarPath = req.protocol + "://" + req.get('host') + IMAGESCLIENT + "/" + req.file.filename
        const newUser = {
            ...req.body,
            avatarPath: avatarPath,
            filePath: req.file.path
        }
        UserMongo.findOne({
            useName: recievedData.useName
        }).then(result => {
            if (result) {
                res.json({
                    error: true,
                    message: 'User has been exist'
                })
            } else {
                UserMongo.create(newUser).then(() => {
                    res.json({
                        error: false,
                        message: 'Create new user successfully'
                    })
                })
            }
        }).catch(error => {
            res.json({
                error: true,
                message: 'Error server'
            })
        })
    }
    deleteUser(req, res) {
        try {
            UserMongo.findById(req.params.userId).then(result => {
                fs.unlink(result.filePath, () => { })
                result.delete()
                res.json({
                    error: false,
                    message: 'Delete users successfully'
                })
            })
        } catch (err) {
            res.json({
                error: true,
                message: 'Error server'
            })
        }
    }
    LogoutUser(req, res) {
        try {
            res.clearCookie('refreshToken')
            res.json({
                error: false,
                message: 'Logout successfully'
            })
        } catch (err) {
            res.json({
                error: true,
                message: 'Error server'
            })
        }
    }
}
module.exports = new UserControl()