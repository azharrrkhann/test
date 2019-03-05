import * as Actions from '../actionTypes';

export const isAppIntializing = flag => {
    return {
        type: Actions.IS_APP_INITIALIZING,
        payload: {
            flag
        }
    }
}