
const initialState = {
  ideas: [{
    ideaId: 43,
    ideaText: "hellow world"
  }]
}

const ideaReducer = (state = [], action) => {
  console.log("calling idea reducer")
  switch(action.type){
    case "NEW_IDEA":{
      console.log("NEW_IDEA")
      break;
    }

    case "DELETE_IDEA":{
      console.log("Delete IDea");
      break;
    }

    case "FETCH_IDEA_PENDING":
      return{ ...state }

    case "FETCH_IDEA_FULFILLED":
      return {
        ...state,
        isFulfilled: true,
        ideas: action.payload.data
      };

    case "FETCH_IDEA_REJECTED":
      return {
        ...state,
        isRejected: true,
        ideas: action.payload.data
      };
  }
  return state
}

export default ideaReducer;
