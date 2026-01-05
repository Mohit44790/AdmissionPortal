import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import studentProfileReducer from "./slices/studentSlice";
import admissionReducer from "./slices/admissionSlice";
import admissionDocumentReducer from "./slices/admissionDocumentSlice";
// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  studentProfile: studentProfileReducer,
  admission: admissionReducer,
  admissionDocument: admissionDocumentReducer,
 
 
});

export default rootReducer;