import request from '../ulti/request'
import tokenRequest from '../ulti/tokenRequest'

class UserAPI {
    createUser(data, options) {
        return request.post('/createUser', data, options)
    }
    compareUser(data) {
        return request.get('/compareUser', {
            params: data
        })
    }
    getUser(userId, options) {
        return tokenRequest.get(`/getUser/${userId}`, options)
    }
    getAllUsers(options) {
        return tokenRequest.get('/getAllUsers', options)
    }
    logoutUser(options) {
        return tokenRequest.get('/logoutUser', options)
    }
    deleteUser(userId, options) {
        return tokenRequest.delete(`/deleteUser/${userId}`, options)
    }
}
export default new UserAPI()