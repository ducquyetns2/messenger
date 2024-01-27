import './chatOnline.scss'
import User from '../../../components/user'
import { useEffect, useState } from 'react'
import MessengerAPI from '../../../services/MessengerAPI'

function ChatOnline({ allUsers, onlineUsers, setCurrentChat, currentUser }) {
    const [users, setUsers] = useState([])
    useEffect(() => {
        setUsers(allUsers.filter(user =>
            onlineUsers.some(online => user._id === online.userId)))
    }, [allUsers, onlineUsers])
    // handle transfer conversationId
    const handleChat = async (conversationId, otherUserId) => {
        let response = await MessengerAPI.getConversation({
            params: {
                members: [currentUser._id, otherUserId]
            }
        })
        if (!response.error) {
            if (response.data) {
                setCurrentChat(response.data._id)
            } else {
                let response = await MessengerAPI.createConversation({
                    members: [currentUser._id, otherUserId]
                })
                if (!response.error) {
                    setCurrentChat(response.data._id)
                }
            }
        }
    }
    return (
        <div className='chatOnline'>
            <h6 className='text-muted ms-2'>Online Users</h6>
            <div className='users-online'>
                {users && users.map(onlineUser => {
                    return (
                        <div key={onlineUser._id}>
                            <User isOnline={true} user={onlineUser} onClick={handleChat} />
                        </div>
                    )
                })}
            </div >
        </div >
    )
}
export default ChatOnline