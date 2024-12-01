import patients from "../../data/patients";
import { NewPatient, NonSensitivePatients, Patient } from "../types";
import { v1 as uuid } from "uuid";

const getNonSensitivePatients = (): NonSensitivePatients[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patient = {
    ...newPatient,
    id: uuid()
  };
  patients.push(patient);
  return patient;
};

export default { getNonSensitivePatients, addPatient };