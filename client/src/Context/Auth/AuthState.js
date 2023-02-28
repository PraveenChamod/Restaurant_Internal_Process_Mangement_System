import { useReducer } from "react"
import AuthContext from './AuthContext';
import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    SET_LOADING,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    GOOGLE_OAUTH
} from '../type';
import axios from 'axios';
import AuthReducer from "./AuthReducer";
const AuthState = (props) => {
    const initialState = {
        isAuthenticated: null,
        loading: false,
        user: null,
        error:null
    }

    const[state,dispatch] = useReducer(AuthReducer,initialState);
    console.log(state);
    //user logout
    const logout = async () =>{
        dispatch({type:SET_LOADING});
        try {
            const res = await axios.get('api/v1/Auth/logout');
            console.log(res);
            dispatch({type:LOGOUT})
            console.log({'logout':res})
        } catch (error) {
            console.log(error);
            dispatch({type:LOGOUT});
        }
    }

    const loadUser = async()=>{
        dispatch({type:SET_LOADING});
        try {
            const res = await axios.get('api/v1/Auth/getProfile')
            console.log(res.data.user);
            dispatch(
                {
                    type:USER_LOADED,
                    payload:res.data.user
                });
        } catch (error) {
            console.log(error);
            dispatch({ type: AUTH_ERROR })
        }
    }

    // const googleAuth = () => {
	// 	window.open(
	// 		`api/v1/Auth/google/callback`,
	// 		"_self"
	// 	);
    //     dispatch({
    //         type:GOOGLE_OAUTH
    //     })
	// };

    const logingUser = async (formData)=>{
        dispatch({type:SET_LOADING});
        const res = await axios.post('api/v1/Auth/LoginUser',formData);
            console.log(res.data);
            dispatch({
                type:LOGIN_SUCCESS,
                payload:res
            })
            loadUser();
    }
    const RegisterUser = async(formData) => {
        dispatch({type:SET_LOADING});
        try {
            const res = await axios.post('api/v1/customer/AddCustomer',formData);
            console.log(res);
            dispatch({
                type:REGISTER_SUCCESS,
                payload:res.data
            })
        } catch (error) {
            console.log(error.response.data);
            dispatch({
                type: REGISTER_FAIL,                
            })
        }
    }
    console.log(state.user);

    return ( 
        <AuthContext.Provider
            value={{
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                logingUser,
                logout,
                loadUser,
                RegisterUser,
                // googleAuth
            }}
        >
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthState;