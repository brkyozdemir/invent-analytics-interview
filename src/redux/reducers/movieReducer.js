const initialState = {
  search: null,
  response: null,
  total: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MOVIE":
      return {
        ...state,
        search: action.payload.search,
        response: action.payload.response,
        total: action.payload.total
      }
    default:
      return state
  }
}

export default reducer;