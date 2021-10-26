import {
  FETCH_AGENTS,
  FETCH_AGENTS_SUCCESS,
  FETCH_AGENTS_FAILED,
  LOGOUT,
  UPLOAD_AGENT_REQUEST,
  UPLOAD_AGENT_SUCCESS,
  UPLOAD_AGENT_FAILED,
  FETCH_FIREBASE_AGENTS,
  FETCH_FIREBASE_AGENTS_SUCCESS,
  FETCH_FIREBASE_AGENTS_FAILED,
} from "../constants";

const initialState = {
  agents: [],
  isLoading: false,
  errMessage: "",
  firebaseAgents: [],
};

const AgentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AGENTS:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_AGENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        agents: action.payload,
      };
    case FETCH_AGENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMessage: action.payload,
      };
    case FETCH_FIREBASE_AGENTS:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_FIREBASE_AGENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        firebaseAgents: action.payload,
      };
    case FETCH_FIREBASE_AGENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMessage: action.payload,
      };
    case UPLOAD_AGENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UPLOAD_AGENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case UPLOAD_AGENT_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default AgentReducer;
