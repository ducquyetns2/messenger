import './user.scss'
import avatarDefault from '../../images/avatarDefault.png'
import { useState, useEffect } from 'react'
import UserAPI from '../../services/UserAPI'
import MessengerAPI from '../../services/MessengerAPI'

function User({ user, isOnline, addGroup, userId, onClick, conversationId }) {
    const [chatFriend, setChatFriend] = useState(user)
    const [checked, setChecked] = useState(false)
    const handleClick = () => {
        if (addGroup) {
            setChecked(!checked)
        }
        // Handle transfer conversation
        if (onClick) {
            onClick(conversationId, user?._id)
        }
    }
    useEffect(() => {
        if (userId) {
            (async () => {
                let response = await UserAPI.getUser(userId)
                if (!response.error) {
                    setChatFriend(response.data)
                }
            })()
        }
    }, [userId])
    return (
        <div className='user dropdown-item rounded' onClick={handleClick}>
            <div className='container_avatar'>
                <img className='user_avatar' src={chatFriend?.avatarPath || avatarDefault} />
                {isOnline && <span className='user-online'></span>}
            </div>
            <span className='user_name'>{chatFriend?.useName || 'anonymous user'}</span>
            {addGroup && checked && <i className="fa-solid fa-check mt-1 ms-auto text-success"></i>}
        </div>
    )
}
export default User