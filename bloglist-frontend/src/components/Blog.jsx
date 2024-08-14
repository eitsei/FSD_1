import { useState } from 'react'
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
      if(!blog.user){
        return (
          <div>
            Added by non-logged in user
          </div>
        )
      }
      if((user.id === blog.user) || (user.id === blog.user.id)){
        return (
          <div>
            Added by: {user.name}
          </div>
        )}
      else {
        return (
          <div>
            Added by other user
          </div>
        )
      }
    } else {
      return (
        <div>
          Added by other or non-logged in user
        </div>
      )
    }
  }
  const showRemove = () => {
    if (user && blog.user) {
      if ((user.id === blog.user.id) || (user.id === blog.user)) {
        return (
          <div>
            <button onClick={handleRemove}>Remove</button>
          </div>
        )
      }
    }
    return <div></div>
  }
  const showLikes = () => {
    if(blog.user){
      return (
        <div data-testid={'likes'}>
            likes : {blog.likes} <button onClick={addLike}>Like!</button>
        </div>
      )
    } else {
      return (
        <div data-testid={'likes'}>
            likes : {blog.likes}
        </div>
      )

    }
  }
  const addLike = () => {
    const likedBlog = ({
      ...blog,
      likes: blog.likes + 1
    })
    handleLike(likedBlog)
  }

  const handleRemove = () => {
    if (window.confirm(`Do you want to remove ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
    }
  }
  return (
    <div style={blogStyle} data-testid={'blog-item'}>
      <div data-testid={'blog-text'}>
        {blog.title} by {blog.author}<span> </span>
        <button onClick={toggleVisibility}>
          {visible ? 'Hide!' : 'View more'}
        </button>
      </div>
      {visible && (
        <>
          <div>
            url: {blog.url}
          </div>
          {showLikes()}
          {showAdded()}
          {showRemove()}
        </>
      )}
    </div>
  )
}

export default Blog
