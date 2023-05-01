import { useEffect, useReducer } from "react";
import AuthContext from "./AuthContext";
import Cookies from "js-cookie";
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
  GOOGLE_OAUTH,
} from "../type";
import axios from "axios";
import AuthReducer from "./AuthReducer";
const AuthState = (props) => {
  const initialState = {
    isAuthenticated: null,
    loading: false,
    user: null,
    error: null,
    google: null,
  };

  const setEssentialCookie = (user) => {
    const data = {
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
        regNo: user.regNo,
      },
    };
    Cookies.set("userCookie", JSON.stringify(data), { expires: 2 / 24 });
  };

  const getCookie = async () => {
    try {
      const cookie = Cookies.get("userCookie");
      // console.log("userCookie", cookie);
      if (typeof cookie === "undefined") {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      const checkCookie = async () => {
        const hasCookie = await getCookie();
        if (hasCookie) {
          await loadUser();
        }
      };
      checkCookie();
    } catch (error) {
      console.log("eeeee", error);
    }
  }, []);

  const [state, dispatch] = useReducer(AuthReducer, initialState);
  console.log(state);
  //user logout
  const logout = async () => {
    dispatch({ type: SET_LOADING });
    try {
      const res = await axios.get("api/v1/Auth/logout");
      console.log(res);
      dispatch({ type: LOGOUT });
      console.log({ logout: res });
    } catch (error) {
      console.log(error);
      dispatch({ type: LOGOUT });
    }
  };

  const loadUser = async () => {
    dispatch({ type: SET_LOADING });
    try {
      const res = await axios.get("api/v1/Auth/Profile");
      Cookies.set("userCookie", "logged-in", { expires: 2 / 24 });
      console.log(res);
      dispatch({
        type: USER_LOADED,
        payload: res.data.user,
        google: res.data.google,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: AUTH_ERROR });
    }
  };

  const logingUser = async (formData) => {
    dispatch({ type: SET_LOADING });
    const res = await axios.post("api/v1/Auth/LoginUser", formData);
    Cookies.set("userCookie", "logged-in", { expires: 2 / 24 });
    console.log(res.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res,
    });
    loadUser();
  };
  const RegisterUser = async (formData) => {
    dispatch({ type: SET_LOADING });
    try {
      const res = await axios.post("api/v1/User/CustomerRegister", formData);
      console.log(res);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
