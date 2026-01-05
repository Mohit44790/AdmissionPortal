import { createSlice } from "@reduxjs/toolkit";

export const TOTAL_STEPS = 6;

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
      if (state.step < TOTAL_STEPS) state.step += 1;
    },
    prevStep: (state) => {
      if (state.step > 1) state.step -= 1;
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
