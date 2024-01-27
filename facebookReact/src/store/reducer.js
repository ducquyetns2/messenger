import { createSlice } from '@reduxjs/toolkit'

const initUser = {
    _id: null,
    useName: '',
    password: '',
    position: '',
    avatarPath: '',
    accessToken: ''
}
const userReducer = createSlice({
    name: 'user',
    initialState: initUser,
    reducers: {
        addUser: (state, action) => {
            return action.payload
        },
        removeUser: (state, action) => {
            return initUser
        }
    }
})
const { actions, reducer } = userReducer
export { actions }
export default reducer