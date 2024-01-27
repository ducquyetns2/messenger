import axios from 'axios'
import { store } from '../store/store'
import { actions } from '../store/reducer'
import { baseUrl } from '../store/constant'
import jwtDecode from 'jwt-decode'
import request from './request'

const tokenRequest = axios.create({
    baseURL: baseUrl,
    withCredentials: true
})
tokenRequest.interceptors.response.use((response) => {
    return response.data
})
tokenRequest.interceptors.request.use(async config => {
    const user = store.getState().user
    if (user.accessToken) {
        const decoded = jwtDecode(user?.accessToken)
        const currentTime = new Date().getTime() / 1000
        if (currentTime > decoded.exp) {
            const response = await request.get('/refreshToken')
            if (!response.error) {
                store.dispatch(actions.addUser(response.data))
                config.headers.token = response.data.accessToken
            } else {
                window.location.href = '/login'
            }
        } else {
            config.headers.token = user.accessToken
        }
    }
    return config
})
export default tokenRequest