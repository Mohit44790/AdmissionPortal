import { combineReducers } from "redux";

// Import all your slices
import authReducer from "./slices/authSlice";


// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
 
});

export default rootReducer;