import Part from "./Part"
import Total from "./Total"

const Content = (props) => {
    const courseData = props.course
    return (
        <div>         
            {courseData.map(prop => 
                <Part key = {prop.id} name = {prop.name} exercises = {prop.exercises}/>
                )}
            <Total data = {courseData}/>

        </div>
    )
  }
export default Content
