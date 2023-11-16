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

const Course = ({ course }) => {
    return (
        <div>
            <Header header={course.name}/>
            <Content parts={course.parts} />
        </div>
    )
}

export default Course