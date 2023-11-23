
const Header = ({ name }) => {
    console.log("Headerin propsit: ", name)
    return (
    <h2>{name}</h2>
    )
}

const Parts = ({ parts }) => {
    return (
        <table>
            <tbody>
                <tr>
                    <th align="left">Parts</th>
                    <th align="left">Exercises</th>
                </tr>            
                {parts.map(line => 
                    <tr key={line.id}>
                        <td width={190}>{line.name}</td>
                        <td>{line.exercises}</td>
                    </tr>            
                )}
            </tbody>
        </table>
    )
}

const Total = ({ parts }) => {
    console.log("Partsin propsit: ", parts)
    const total = parts.reduce((sum, part) => 
        sum + part.exercises, 
        0
    )
        
    return (
        <table>
            <tbody>
                <tr>
                    <th align="left" width={190}>Total:</th>
                    <th>{total}</th>
                </tr>
            </tbody>
        </table>    
    )
}


const Course = ({ courses }) => {
    console.log("Coursen propsit:", courses)
    return (
        <dl>
            {courses.map((course, i) => 
                <dt key={course.id}>
                    <Header name={courses[i].name} />
                    <Parts parts={courses[i].parts} />
                    <Total parts={courses[i].parts} />
                </dt>        
            )}
        </dl>
    )
}

export default Course