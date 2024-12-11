import {
  Box,
  InputLabel,
  Input,
  MenuItem,
  Select,
  Typography,
  FormControl,
  FormGroup,
  Button,
} from "@mui/material";
import { useState } from "react";
import { NewDiary } from "./types";

interface CreateDiary {
  createDiary: (object: NewDiary) => void;
}

const AddDiary = ({ createDiary }: CreateDiary) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiary({
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment
    });
  };

  return (
    <Box sx={{ mt: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h4">Add new diary</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "300px",
          mt: 3
        }}
      >
        <FormGroup>
          <FormControl fullWidth>
            <InputLabel shrink id="date-label">Date</InputLabel>
            <Input
              required
              aria-label="date-label"
              type="date"
              value={ date }
              onChange={ (e) => setDate(e.target.value) }
              sx={{ mb: 3 }}
            />         
          </FormControl>
          <FormControl>
            <InputLabel id="weather-label">Weather</InputLabel>
            <Select
              required
              labelId="weather-label"
              id="weather"
              type="text"
              value={weather}
              variant="standard"
              onChange={(event) => setWeather(event.target.value)}
              sx={{ width: "100%", mb: 2 }}
            >
              <MenuItem value={"sunny"}>Sunny</MenuItem>
              <MenuItem value={"rainy"}>Rainy</MenuItem>
              <MenuItem value={"cloudy"}>Cloudy</MenuItem>
              <MenuItem value={"stormy"}>Stromy</MenuItem>
              <MenuItem value={"windy"}>Windy</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="visibility-label">Visibility</InputLabel>
            <Select
              required
              labelId="visibility-label"
              id="visibility"
              type="text"
              value={visibility}
              variant="standard"
              onChange={ (event) => setVisibility(event.target.value) }
              sx={{ width: "100%", mb: 2 }}
            >
              <MenuItem value={ "great" }>Great</MenuItem>
              <MenuItem value={ "good" }>Good</MenuItem>
              <MenuItem value={"ok"}>Ok</MenuItem>
              <MenuItem value={"poor"}>Poor</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="comment-label">Comment</InputLabel>
            <Input
              multiline
              aria-label="Comment"
              type="text"
              value={ comment }
              onChange={ (e) => setComment(e.target.value) }
              sx={{ width: "100%", mb: 3 }}
            />         
          </FormControl>
        </FormGroup>
        <Button
          type="submit"
          variant="outlined"
          sx={{ width: "50%" }}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default AddDiary;