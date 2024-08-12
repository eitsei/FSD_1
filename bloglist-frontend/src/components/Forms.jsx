
import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

const BlogForm = ({ user, createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', likes: 0 })

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog ({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes,
      user: user.id
    })
    setNewBlog({ title: '', author: '', url: '', likes: 0 })

  }
  const handleBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog(prevBlog => ({ ...prevBlog, [name]: value }))
  }

  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={addBlog}>
        <div> title:
          <input
            data-testid='title'
            name="title"
            value={newBlog.title}
            onChange={handleBlogChange}
            placeholder='title'
          />
        </div>
        <div>
          author:
          <input
            data-testid = 'author'
            name="author"
            value={newBlog.author}
            onChange={handleBlogChange}
            placeholder='author'
          />
        </div>
        <div> url:
          <input
            data-testid='url'
            name="url"
            value={newBlog.url}
            onChange={handleBlogChange}
            placeholder='url'
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}


export { LoginForm, BlogForm }
