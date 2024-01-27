import './messenger.scss'
import ChatMenu from './chatMenu'
import ChatBox from './chatBox'
import ChatOnline from './chatOnline'
import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { socketUrl } from '../../store/constant'
import { useSelector } from 'react-redux'
import MessengerAPI from '../../services/MessengerAPI'
import UserAPI from '../../services/UserAPI'

function Messenger() {
    const socket = useRef()
    const [onlineUsers, setOnlineUsers] = useState([])
    const [users, setUsers] = useState([])
    const [conversations, setConversations] = useState([])
    const currentUser = useSelector(state => state.user)
    const [currentChat, setCurrentChat] = useState('')
    useEffect(() => {
        socket.current = io(socketUrl)
        socket.current.emit('addUser', currentUser._id)
        socket.current.on('getUsers', (onlineUsers) => {
            console.log(onlineUsers)
            setOnlineUsers(onlineUsers)
        })
        return () => {
            socket.current.off('addUser')
            socket.current.off('getUser')
        }
    }, [currentUser._id])
    useEffect(() => {
        (async () => {
            // Get all users
            const usersResponse = await UserAPI.getAllUsers()
            if (!usersResponse.error) {
                setUsers(usersResponse.data.filter(user => user._id !== currentUser._id))
            }
            // Get all conversations
            const conversationsResponse = await MessengerAPI.getAllConversations(currentUser._id)
            if (!conversationsResponse.error) {
                setConversations(conversationsResponse.data)
            }
        })()
    }, [currentUser.id])
    return (
        <div className='container-fluid'>
            <div className='row messenger'>
                <div className='container_chatMenu col-lg-3'>
                    <ChatMenu socket={socket} conversations={conversations}
                        currentUser={currentUser} allUsers={users} setCurrentChat={setCurrentChat} />
                </div>
                <div className='container_chatBox col-lg-6'>
                    <ChatBox socket={socket.current} currentChat={currentChat} currentUser={currentUser} />
                </div>
                <div className='container_chatOnline col-lg-3'>
                    <ChatOnline allUsers={users} onlineUsers={onlineUsers}
                        currentUser={currentUser} setCurrentChat={setCurrentChat} />
                </div>
            </div>
        </div>
    )
}
export default Messenger