import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
} from "../constants";

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  errMessage: "",
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        token: action.payload.token,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        errMessage: action.payload.error,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default AuthReducer;
