const intialState = {
  ideas: [],
  editingIdea: null,
  current: 1,
  totalCount: 0
}

const ideaReducer = (state = intialState, action) => {
  switch(action.type){
    //new actions
    case "NEW_IDEA_PENDING":
      return state;

    case "NEW_IDEA_FULFILLED":
      return Object.assign({},state,
                          {
                             ideas: [action.payload.data, ...state.ideas.slice(0, -1)],
                             editingIdea: action.payload.data.id,
                             totalCount: state.totalCount + 1
                          })

    case "NEW_IDEA_REJECTED":
      return state;

    //Delete Actions
    case "DELETE_IDEA_PENDING":
      return state;

    case "DELETE_IDEA_FULFILLED":
      return Object.assign({}, state,
                        {
                          ideas: state.ideas.filter( (item, index) => item.id !== action.payload.data.id),
                          totalCount: state.totalCount - 1
                        });

    case "DELETE_IDEA_REJECTED":
      return state;

    //Fetching actions
    case "FETCH_IDEA_PENDING":
      return state;

    case "FETCH_IDEA_FULFILLED":
      return Object.assign({}, state, {ideas: action.payload.data});

    case "FETCH_IDEA_REJECTED":
      return state;

    //action enable editingIdea
    case "ENABLE_EDIT":
    return Object.assign({}, state, { editingIdea: action.payload})

    //action UPDATE_IDEA
    case "UPDATE_IDEA_PENDING":
    return state;

    case "UPDATE_IDEA_FULFILLED":
      const updatedId = state.ideas.findIndex(x => x.id === action.payload.data.id);
      return Object.assign({}, state,{
                                    ideas: [...state.ideas.slice(0,updatedId), action.payload.data, ...state.ideas.slice(updatedId+1, state.ideas.length) ],
                                    editingIdea: null
                                  }
                        )

    case "UPDATE_IDEA_REJECTED":
      return state;
      break;

    case "SEARCH_IDEA_PENDING":
      return state;

    case "SEARCH_IDEA_FULFILLED":
      return Object.assign( {}, state, {ideas: action.payload.data})

    case "SEARCH_IDEA_REJECTED":
      return state;

    case "TOTAL_COUNT_PENDING":
      return state;

    case "TOTAL_COUNT_FULFILLED":
      return Object.assign({}, state, {totalCount: action.payload.data } );

    case "SHARE_IDEA_PENDING":
      return state;

    case "SHARE_IDEA_FULFILLED":
      // alert(action.payload.data);
      return state;

    case "SHARE_IDEA_REJECTED":
      return state;

    default:
      return state;

  }
  return state
}

export default ideaReducer;
