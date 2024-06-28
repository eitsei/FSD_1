import { useState} from 'react'
import blogs from '../services/blogs'
const Blog = ({ blog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)
  

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showAdded = () => {
    if (user) {
      return (
        <div>
          Added by: {user.name}
        </div>
      )
    } else {
      return (
        <div>
          Added by non-logged in user
        </div>
      )
    }
  }

  const addLike = async () => {
    const blogObject = {
      "user":`${blog.user}`,
      "likes":blog.likes + 1,
      "author":`${blog.author}`,
      "title":`${blog.title}`,
      "url":`${blog.url}`
    }
    try{
      await blogs.update(blog.id, blogObject)
    }
    catch(error) {
      console.log("Error: ",error)
    }
  }
  
  const handleRemove = () => {
    if (window.confirm(`Do you want to remove ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id);
    }
  }
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author} 
        <button onClick={toggleVisibility}>
          {visible ? 'Hide!' : 'View more'}
        </button>
      </div>
      {visible && (
        <>
          <div>
            url: {blog.url}
          </div>
          <div>
          likes : {blog.likes} <button onClick= {addLike}>Like!</button>
          </div>
          {showAdded()}
          {user && <div>
            <button onClick={handleRemove}>Remove</button>
          </div>}
        </>
      )}
    </div>
  )
}

export default Blog;
