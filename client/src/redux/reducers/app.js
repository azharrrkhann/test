import * as Action from '../actionTypes'

const initialState = {
    isAppIntializing: false
}

class AppReducer {
  static reduce(state = initialState, action) {
    if (AppReducer[action.type]) {
      return AppReducer[action.type](state, action)
    } else {
      return state
    }
  }

  static [Action.IS_APP_INITIALIZING](state, action) {
    return {
        ...state,
        isAppIntializing: action.payload.flag
    }
  }

  static [Action.LOGOUT](state, action) {
    return initialState
  }

  static [Action.CLEAR](state, action) {
    return initialState;
  }
}

export default AppReducer.reduce