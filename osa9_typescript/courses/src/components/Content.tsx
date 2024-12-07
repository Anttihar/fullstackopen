import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({courseParts}: {courseParts: CoursePart[]}) => {
  return (
    <table>
      <tbody>
        {courseParts.map(p =>
          <tr key={p.name}>
            <td>
              <strong>{p.name} {p.exerciseCount}</strong>
              <Part part={p} />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Content;