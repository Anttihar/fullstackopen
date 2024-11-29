import express, { Response } from "express";
import patientService from "../services/patientService";
import { NonSensitivePatients } from "../types";

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatients[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

export default router;