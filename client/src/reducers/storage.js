const storeData = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      state = action
      return state
    case 'LOGOUT':
      state = {}
      return state
    default:
      return state
  }
}

export default storeData
