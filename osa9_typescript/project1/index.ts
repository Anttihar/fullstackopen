import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

interface Details {
  daily_exercises: number[],
  target: number
}

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
  }
  const result: string = calculateBmi(height, weight);
  res.json({ height: height, weight: weight, bmi: result });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body: Details = req.body;
  if (!('target' in body) || !('daily_exercises' in body)) {
    res.status(400).json({ error: "parameters missing" });
  } else if (!body.daily_exercises.every(n => isNaN(n) ? false : true)) {
    res.status(400).json({ error : "malformatted parameters"});
  } else if (isNaN(body.target)) {
    res.status(400).json({ error : "malformatted parameters"});
  } else {
    const result = calculateExercises(body.daily_exercises, body.target);
    res.json(result);
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});