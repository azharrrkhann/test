import * as Action from '../actionTypes'

const initialState = {
  loggedIn: false,
  loggedInUser: null,
}

class AuthReducer {
  static reduce(state = initialState, action) {
    if (AuthReducer[action.type]) {
      return AuthReducer[action.type](state, action)
    } else {
      return state
    }
  }

  static [Action.LOGIN](state, action) {
    return {
      ...state,
      loggedInUser: { ...state.loggedInUser, ...action.payload.user },
      loggedIn: true,
      isRequestingToken: false,
    }
  }

  static [Action.LOGOUT](state, action) {
    return initialState;
  }

  static [Action.CLEAR](state, action) {
    return initialState;
  }
}

export default AuthReducer.reduce