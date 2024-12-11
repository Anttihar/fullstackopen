import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography
} from "@mui/material";
import { Diary } from "./types";

const Diaries = ({ diaries }: { diaries: Diary[] }) => {
  return (
    <Box sx={{ mt: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h4">Diaries</Typography>
      <Table sx={{  width: 800, mt: 1 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Weather</TableCell>
            <TableCell>Visibility</TableCell>
            <TableCell>Comment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {diaries.map((d, i) =>
          <TableRow key={i}>
            <TableCell>{d.date}</TableCell>
            <TableCell>{d.weather}</TableCell>
            <TableCell>{d.visibility}</TableCell>
            <TableCell>{d.comment}</TableCell>
          </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Diaries;