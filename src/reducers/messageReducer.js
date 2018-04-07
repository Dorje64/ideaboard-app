const initialState = {
  messages: [],
  isTyping: false,
  textToSent: ''
};

const messageReducer = (state= initialState, action) => {
  switch (action.type) {

    case "FETCH_MESSAGE_PENDING":
      return state;

    case "FETCH_MESSAGE_FULFILLED":
      return Object.assign({}, state);

    case "FETCH_MESSAGE_REJECTED":
      return state;

    default:
    return state

  }
}

export default conversationReducer;
