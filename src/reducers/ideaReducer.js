
const initialState = {
  ideas: []
}

const ideaReducer = (state = [], action) => {
  switch(action.type){
    case "NEW_IDEA_PENDING":
    return { ...state
    }

    case "NEW_IDEA_FULLFILLED":
    return {
       ...state,
       isFulfilled: true,
       ideas: [action.payload.data, ...state.ideas]
    }

    case "NEW_IDEA_REJECTED":
    return {
      ...state
    }

    case "DELETE_IDEA_PENDING":
    return {
      ...state
    }

    case "DELETE_IDEA_FULLFILLED":
    {
    }

    case "DELETE_IDEA_REJECTED":
    return {

    }

    case "FETCH_IDEA_PENDING":
      return state;

    case "FETCH_IDEA_FULFILLED":
      return action.payload.data;

    case "FETCH_IDEA_REJECTED":
      return state;
  }
  return state
}

export default ideaReducer;
