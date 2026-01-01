import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";


// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
 
});

export default rootReducer;