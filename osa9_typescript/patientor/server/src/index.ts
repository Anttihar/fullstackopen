import express from "express";
import cors from 'cors';
import diagnoseRouter from "./routes/diagnosesRoute";
import patientRouter from "./routes/patientsRoute";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  console.log('Someone pinged here!');
  res.send("pong");
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});