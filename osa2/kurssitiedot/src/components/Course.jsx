const Header = ({ header }) => (
    <h1>{header}</h1>
)

const Content = ({ parts }) => {
    return (
        <dl>
            {parts.map(line => 
                <dt key={line.id}>
                    {line.name} {line.exercises}
                </dt>
            )}
        </dl>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
        
    return (
        <h4>Total: {total} exercises</h4>        
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header header={course.name}/>
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course