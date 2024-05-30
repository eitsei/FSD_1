import Header from "./Header"
import Content from "./Content"

const Course = (props) => {
    return(
        <div>
            <Header  key = {props.course.key} course = {props.course.name}/>
            <Content key = {props.course.key} course = {props.course.parts}/>      
        </div>
    )
}
//<Content course = {props.course}/>
export default Course