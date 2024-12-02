interface Course {
  name: string;
  exerciseCount: number;
};

const Content = ({ courseParts }: { courseParts: Course[] }) => {
  return (
    <table>
      <tbody>
        {courseParts.map(p =>
          <tr key={p.name}>
            <td>{p.name}</td>
            <td>{p.exerciseCount}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Content;