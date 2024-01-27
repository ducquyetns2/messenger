import './chatBox.scss'
import Message from '../../../components/message'
import { useState, useEffect, useRef } from 'react'
import MessengerAPI from '../../../services/MessengerAPI'

function ChatBox({ socket, currentChat, currentUser }) {
    const [chat, setChat] = useState('')
    const [messages, setMessages] = useState([])
    const sendError = useRef()
    const scrollRef = useRef()
    useEffect(() => {
        (async () => {
            if (currentChat) {
                let response = await MessengerAPI.getMessages(currentChat)
                if (response) {
                    setMessages(response.data)
                }
            }
        })()
    }, [currentChat])
    useEffect(() => {
        socket?.on('recievedMessage', messages => {
            setMessages(pre => {
                pre.push(messages)
                return [...pre]
            })
        })
        return () => {
            socket?.off('recievedMessage')
        }
    }, [socket])
    useEffect(() => {
        scrollRef.current?.scrollIntoView({
            behavior: 'smooth'
        })
    }, [messages])
    const handleCreateMessage = (e) => {
        sendError.current.innerText = ''
        setChat(e.target.value)
    }
    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (chat) {
            sendError.current.innerText = ''
            const response = await MessengerAPI.createMessage({
                conversationId: currentChat,
                sender: currentUser._id,
                text: chat
            })
            if (!response.error) {
                setMessages(pre => {
                    pre.push(response.data)
                    return [...pre]
                })
                socket?.emit('sendMessage', response.data)
                setChat('')
            } else {
                sendError.current.innerText = 'Server error'
            }
        } else {
            sendError.current.innerText = 'Message is empty'
        }
    }
    return (
        <div className='chatBox border-top-0 border-bottom-0'>
            {currentChat ?
                <div className='container_chatBox'>
                    <div className='chatBoxTop'>
                        {messages?.map((message =>
                            <div key={message._id} ref={scrollRef}>
                                <Message message={message} own={(message.sender === currentUser._id)} />
                            </div>
                        ))}
                    </div>
                    <form className='chatBoxBottom d-flex mt-3 mx-1'>
                        <input className='form-control' onChange={handleCreateMessage} value={chat} />
                        <button className='btn btn-success ms-2' onClick={handleSendMessage}>Send</button>
                    </form>
                    <p ref={sendError} style={{ color: 'red' }}></p>
                </div> :
                <h5 className='text-center'>Open a coversation to chat</h5>}
        </div>
    )
}
export default ChatBox