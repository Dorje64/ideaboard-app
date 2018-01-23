const initialState = {
    conversations: []
}

const conversationReducer = (state= initialState , action) =>{
  switch (action.type) {
    case "FECTCH_CONVERSATION_PENDING":
      return Object.assign({}, state)


    case "FECTCH_CONVERSATION_FULFILLED":
      return Object.assign({}, state, {
         conversations: action.payload.data
        }
      )

    case "FECTCH_CONVERSATION_REJECTED":
      return Object.assign({}, state)


    default:
      return Object.assign({}, state)

  }
}

export default conversationReducer;
