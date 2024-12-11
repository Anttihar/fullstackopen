export interface Diary {
  date: string;
  weather: string;
  visibility: string;
  comment: string;
  id: string;
}

export type NewDiary = Omit<Diary, 'id'>

