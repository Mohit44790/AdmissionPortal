import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import studentProfileReducer from "./slices/studentSlice";
import admissionReducer from "./slices/admissionSlice";

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  studentProfile: studentProfileReducer,
  admission: admissionReducer,
 
 
});

export default rootReducer;