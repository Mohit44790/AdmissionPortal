import { createSlice } from "@reduxjs/toolkit";

const admissionSlice = createSlice({
  name: "admission",
  initialState: {
    step: 1,
    data: {},
  },
  reducers: {
    saveStepData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    resetAdmission: (state) => {
      state.step = 1;
      state.data = {};
    },
  },
});

export const {
  saveStepData,
  nextStep,
  prevStep,
  resetAdmission,
} = admissionSlice.actions;

export default admissionSlice.reducer;
