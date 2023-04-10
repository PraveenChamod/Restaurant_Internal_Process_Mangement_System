import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_ERROR,
    SET_LOADING,
    LOGOUT,
    USER_LOADED,
    GOOGLE_OAUTH
} from '../type';

export default (state,action) => {
    switch(action.type){
        case GOOGLE_OAUTH:
            return{
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading:false
            }
        case REGISTER_SUCCESS:
            return{
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading:false
            }
        case REGISTER_FAIL:
        case LOGIN_SUCCESS:
            return{
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading:false
            }
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
                error:action.payload
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user:action.payload,
                google: action.google
            }
        case SET_LOADING:
            return {
                ...state,
                loading:true
            }
        
        
        default:
            return state; 
    }
}