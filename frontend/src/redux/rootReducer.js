import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import studentReducer from "./slices/studentSlice";


// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  student: studentReducer,
 
 
});

export default rootReducer;