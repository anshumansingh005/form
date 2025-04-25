import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
export interface Applicant {
  id: number;
  name: string;
  age: number | undefined;
  email: string;
  gender: "male" | "female" | "other";
  techStack: string[];
  hobbies: string;
}
interface ApplicantState {
  applicants: Applicant[];
}
const initialState: ApplicantState = {
  applicants: [],
};
let applicantId = 0;
const formSlice = createSlice({
  name: "applicant",
  initialState,
  reducers: {
    addApplicant: (state, action: PayloadAction<Applicant>) => {
      state.applicants.push({ ...action.payload, id: applicantId++ });
    },
    updateApplicant: (
      state,
      action: PayloadAction<{
        id: number;
        updatedApplicant: Omit<Applicant, "id">;
      }>
    ) => {
      const { id, updatedApplicant } = action.payload;
      const applicantIdx = state.applicants.findIndex(
        (applicant) => applicant.id === id
      );
      if (applicantIdx !== -1) {
        state.applicants[applicantIdx] = { ...updatedApplicant, id: id };
      }
    },
    deleteApplicant: (state, action: PayloadAction<number>) => {
      const deleteId = action.payload;
      state.applicants = state.applicants.filter(
        (applicant) => applicant.id !== deleteId
      );
    },
  },
});

export const { addApplicant, updateApplicant, deleteApplicant } =
  formSlice.actions;
export const selectApplicants = (state: { applicant: ApplicantState }) =>
  state.applicant.applicants;
export default formSlice.reducer;
