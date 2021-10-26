import { combineReducers } from "redux";

//Reducers List
import AuthReducer from "./AuthReducer";
import AgentReducer from "./AgentReducer";

const reducers = combineReducers({
  auth: AuthReducer,
  agent: AgentReducer,
});

export default reducers;
