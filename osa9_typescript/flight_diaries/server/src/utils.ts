import { NewDiaryEntry, Visibility, Weather } from "./types";
import z from 'zod';

export const NewEntrySchema = z.object({
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  date: z.string().date(),
  comment: z.string().optional()
});

const toNewDiary = (object: unknown): NewDiaryEntry => {
  return NewEntrySchema.parse(object)
};

export default toNewDiary;