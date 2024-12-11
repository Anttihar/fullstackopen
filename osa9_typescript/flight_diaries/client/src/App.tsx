import { useEffect, useState } from "react";
import { Diary, NewDiary } from "./types";
import { Container } from "@mui/material";
import Diaries from "./Diaries";
import Navigation from "./Navigation";
import AddDiary from "./AddDiary";
import { Route, Routes, useNavigate } from "react-router-dom";
import { getDiaries, createDiary } from "./services/diaryService";
import axios from "axios";
import Swal from "sweetalert2";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    getDiaries().then(d => setDiaries(d));
  }, []);

  interface ValidationError {
    message: string;
    errors: Record<string, string[]>
  }

  const addDiary = async (newDiary: NewDiary) => {
    try {
      const addedDiary = await createDiary(newDiary);
      setDiaries(diaries.concat(addedDiary));
      Swal.fire({
        title: "Success!",
        text: "New diary added",
        icon: "success"
      });
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        console.log(error.status);
        console.log(error.response);
        const errorMessage = error.response?.data.message;
        Swal.fire({
          title: "Oops..",
          text: `${errorMessage}`,
          icon: "error"
        });
      }
    }
  };

  return (
      <Container sx={{ textAlign: "center" }}>
        <Navigation />
        <Routes>
          <Route path="/" element={ <Diaries diaries={diaries} /> } />
          <Route path="/add" element={ <AddDiary createDiary={addDiary} /> }/>
        </Routes>
      </Container>
  );
};

export default App;
