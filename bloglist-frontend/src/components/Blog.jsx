import { useState } from 'react'
//import blogs from '../services/blogs'
const Blog = ({ blog, removeBlog, user, handleLike }) => {
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
  // const blogObject = {
  //   "user":`${blog.user.id}`,
  //   "likes":blog.likes + 1,
  //   "author":`${blog.author}`,
  //   "title":`${blog.title}`,
  //   "url":`${blog.url}`
  // }
  // const addLike = async () => {
  //   const blogObject = {
  //     user: user.id,
  //     likes: blog.likes + 1,
  //     author: blog.author,
  //     title: blog.title,
  //     url: blog.url
  //   }
  //   try
  //   {
  //     const updatedBlog = await blogs.update(blog.id, blogObject)
  //     handleLike(updatedBlog)
  //     console.log("Blog.jsx updated blog: ", updatedBlog)
  //   }
  //   catch(error) {
  //     console.log("Error: ",error)
  //   }
  // }

  const addLike = async () => {
    const blogObject = ({
      ...blog, likes: blog.likes +1
    })
    console.log('Blog addLike blogObject: ', blogObject)
    handleLike(blogObject)
  }

  const handleRemove = () => {
    if (window.confirm(`Do you want to remove ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
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
          likes : {blog.likes} <button onClick={addLike}>Like!</button>
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

export default Blog
