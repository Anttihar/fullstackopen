import express, { Request, Response } from "express";
import patientService from "../services/patientService";
import { NewPatient, NonSensitivePatients, Patient } from "../types";
import { errorHandler, newPatientParser } from "../../utils/middleware";

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatients[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

router.use(errorHandler);

export default router;