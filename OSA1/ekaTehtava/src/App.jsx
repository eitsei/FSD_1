const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <>
      <p>{props.content} {props.exercises}</p>
    </>
  )

}

const Content = (props) => {
  return (
    <>
      <Part content = {props.part11} exercises = {props.exercises11}/>
      <Part content = {props.part22} exercises = {props.exercises22}/>
      <Part content = {props.part33} exercises = {props.exercises33}/>
    </>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <>
      <p>Number of exercises {props.exercises11 + props.exercises22 + props.exercises33}</p>
    </>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header  course  = {course.name} />
      <Content part11 = {course.parts[0].name} exercises11 = {course.parts[0].exercises}/>
      <Content part22 = {course.parts[1].name} exercises22 = {course.parts[1].exercises}/>
      <Content part33 = {course.parts[2].name} exercises33 = {course.parts[2].exercises}/>
      <Total exercises11 = {course.parts[0].exercises} exercises22 = {course.parts[1].exercises} exercises33 = {course.parts[2].exercises}/>
    </div>
  )
}

export default App