import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
} from "../constants";

import axios from "axios";
import Toast from "react-native-toast-message";

export const loginHandle = (username, password) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    axios
      .post(
        "https://devel-7.tonjoostudio.com/recruitment-api/authenticate",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        Toast.show({
          type: "success",
          text1: "Selamat datang kembali !",
        });
      })
      .catch((err) => {
        dispatch({ type: LOGIN_FAILED, payload: err.response.data });
        Toast.show({
          type: "error",
          text1: err.response.data.error,
        });
      });
  } catch (err) {
    console.log(err.response);
  }
};

export const logoutHandle = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
