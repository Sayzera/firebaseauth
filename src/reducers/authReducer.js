import { AUTH_ADD_USER } from "../types";


export const authRedecur = (state = {}, action ) => {
    switch (action.type) {
        case AUTH_ADD_USER:
        return action.payload
    
        default:
        return state;
    }
}