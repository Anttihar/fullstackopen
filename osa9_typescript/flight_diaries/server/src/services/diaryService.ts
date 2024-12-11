import diaries from '../../data/entries';

import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id, date, weather, visibility
  }));
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id);
  return entry
}

const addDiary = (newEntry: NewDiaryEntry): DiaryEntry => {
  const newDiary = {
    ...newEntry,
    id: Math.max(...diaries.map(d => d.id)) + 1
  };

  diaries.push(newDiary);
  return newDiary;
};

export default { getEntries, addDiary, findById, getNonSensitiveEntries };