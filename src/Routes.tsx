import React, { useEffect } from "react";
import { Route, Routes as RouteData, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import ApplicantForm from "./component/ApplicantForm";
import ApplicantTable from "./component/ApplicantTable";
import NavBar from "./component/NavBar";
import {
  Applicant,
  addApplicant,
  deleteApplicant,
  selectApplicants,
  updateApplicant,
} from "./features/form/formSlice";

const Routes: React.FC = () => {
  // Replace useState with useSelector to get data from Redux store
  const applicants = useAppSelector(selectApplicants);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddApplicant = (applicant: Applicant) => {
    // Use dispatch instead of setState
    dispatch(addApplicant(applicant));
    navigate("/table");
  };

  const handleDeleteApplicant = (id: number) => {
    // Use dispatch instead of setState
    dispatch(deleteApplicant(id));
  };

  const handleUpdateApplicant = (
    id: number,
    updatedApplicant: Omit<Applicant, "id">
  ) => {
    // Use dispatch instead of setState
    dispatch(updateApplicant({ id, updatedApplicant }));
  };
  console.log("Routes rendering", new Date().getTime());
  useEffect(() => {
    console.log("Applicants changed:", applicants);
  }, [applicants]);

  return (
    <>
      <NavBar />
      <RouteData>
        <Route
          path="/"
          element={<ApplicantForm onApplicantAdded={handleAddApplicant} />}
        />
        <Route
          path="/table"
          element={
            <ApplicantTable
              applicants={applicants}
              onDeleteApplicant={handleDeleteApplicant}
              onUpdateApplicant={handleUpdateApplicant}
            />
          }
        />
      </RouteData>
    </>
  );
};

export default Routes;
