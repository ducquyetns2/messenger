import './message.scss'
import avatarDefault from '../../images/avatarDefault.png'
import TimeAgo from 'javascript-time-ago'
import vi from 'javascript-time-ago/locale/vi'
import { useEffect, useState, useRef } from 'react'
import UserAPI from '../../services/UserAPI'
TimeAgo.addDefaultLocale(vi)

function Message({ message, own }) {
    const timeAgo = useRef(new TimeAgo('vi'))
    const [sender, setSender] = useState()
    useEffect(() => {
        (async () => {
            const response = await UserAPI.getUser(message.sender)
            if (!response.error) {
                setSender(response.data)
            }
        })()
    }, [message])
    return (
        <div className={own ? 'message own' : 'message'} >
            <div className='messageTop'>
                <img src={sender?.avatarPath || avatarDefault} className='messageImg' />
                <span className='messageText'>{message.text}</span>
            </div>
            <div className='messageBottom '>
                {timeAgo.current.format(new Date(message.createdAt))}
            </div>
        </div>
    )
}
export default Message