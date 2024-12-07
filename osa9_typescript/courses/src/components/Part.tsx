import { CoursePart } from "../types";

const Part = ({part}: {part: CoursePart}) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <i>{part.description}</i>
        </div>
      );
    case "group":
      return (
        <div>
          Project exercises: {part.groupProjectCount}
        </div>
      );
    case "background":
      return (
        <div>
          <i>{part.description}</i><br />
          submit to: {part.backgroundMaterial}
        </div>
      )
    case "special":
      return (
        <div>
          <i>{part.description}</i><br />
          Required skills: {part.requirements.join(", ")}
        </div>
      )
    default:
      break;
  }
}

export default Part;