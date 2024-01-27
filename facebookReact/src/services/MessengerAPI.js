import tokenRequest from '../ulti/tokenRequest'

class MessengerAPI {
    getAllConversations(userId, options) {
        return tokenRequest.get(`/getAllConversations/${userId}`, options)
    }
    getConversationbyId(conversationId, options) {
        return tokenRequest.get(`/getConversation/${conversationId}`, options)
    }
    getConversation(options) {
        return tokenRequest.get('/getConversation', options)
    }
    getMessages(conversationId, options) {
        return tokenRequest.get(`/getMessages/${conversationId}`, options)
    }
    createMessage(data, options) {
        return tokenRequest.post('/createMessage', data, options)
    }
    createConversation(data, options) {
        return tokenRequest.post('/createConversation', data, options)
    }
}
export default new MessengerAPI()
