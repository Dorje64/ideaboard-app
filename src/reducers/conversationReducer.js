const initialState = {
    conversations: [],
    totalConversations: 0
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

    case "TOTAL_CONV_PENDING":
      return state

    case "TOTAL_CONV_FULFILLED":
      return Object.assign({}, state, { totalConversations: action.payload.data } )

    case "TOTAL_CONV_REJECTED":
      return state;

    case "CREATE_CONV_PENDING":
      return state;

    case "CREATE_CONV_FULFILLED":
      return Object.assign({}, state, {conversations: [action.payload.data, ...state.conversations.slice(0,-1)]})

    case "CREATE_CONV_REJECTED":
      return state;

    default:
      return Object.assign({}, state)

  }
}

export default conversationReducer;
