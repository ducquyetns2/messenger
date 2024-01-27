import './chatMenu.scss'
import User from '../../../components/user'
import { useEffect, useState } from 'react'

function ChatMenu({ conversations, currentUser, allUsers, setCurrentChat }) {
    const [otherUsers, setOtherUsers] = useState([])
    useEffect(() => {
        let users = conversations.map(conversation => {
            return {
                userId: conversation.members.find(member => member !== currentUser._id),
                conversationId: conversation._id
            }
        })
        setOtherUsers(users)
    }, [currentUser._id, conversations])
    const handleChat = (value) => {
        setCurrentChat(value)
    }
    return (
        <div className='chatMenu'>
            <input className='inputSearch' placeholder='Search for friends' />
            <button className='btn btn-sm btn-outline-primary float-end mt-2'
                data-bs-toggle='modal' data-bs-target='#addGroup'>Create Group Chat</button>
            <div className="clearfix"></div>
            <h6 className='text-muted ms-2'>Conversation</h6>
            <div className='searchResult'>
                {otherUsers?.map(user =>
                    <div key={user.userId}>
                        <User userId={user.userId} onClick={handleChat}
                            conversationId={user.conversationId} />
                    </div>)}
            </div>
            <div className='modal fade chatAddGroup' id='addGroup'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className="modal-title text-primary">Add user to group chat</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className='modal-body'>
                            <input className='inputSearch mb-1' placeholder='Search for friends' />
                            {allUsers?.map(user =>
                                <div key={user._id}>
                                    <User user={user} addGroup />
                                </div>
                            )}
                        </div>
                        <div className='modal-footer'>
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ChatMenu