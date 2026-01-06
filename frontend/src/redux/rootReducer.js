import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import studentProfileReducer from "./slices/studentSlice";
import admissionReducer from "./slices/admissionSlice";
import admissionDocumentReducer from "./slices/admissionDocumentSlice";
import masterReducer from "./slices/masterSlice";

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  studentProfile: studentProfileReducer,
  admission: admissionReducer,
  admissionDocument: admissionDocumentReducer,
   master: masterReducer,
 
 
});

export default rootReducer;