import axios from "axios";
import { Diary, NewDiary } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getDiaries = async () => {
  return axios.get<Diary[]>(baseUrl).then(response => response.data);
};

export const createDiary = async (newDiary: NewDiary) => {
  const addedDiary = await axios.post<Diary>(baseUrl, newDiary);
  return addedDiary.data;
};