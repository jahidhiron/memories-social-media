import { AUTH, LOGOUT } from "../constants/actionTypes";
import * as api from "../api";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(`Error to signin : ${error}`);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(`Error to signup : ${error}`);
  }
};

export const logout = (navigate) => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT });

    navigate("/auth");
  } catch (error) {
    console.log(`Error to logout : ${error}`);
  }
};
