
import { useState } from 'react'

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => (
  <div>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
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

const BlogForm = ({user, createBlog }) =>{ 
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
      <div> title: <input name="title" value={newBlog.title} onChange={handleBlogChange} /></div>
      <div> author: <input name="author" value={newBlog.author} onChange={handleBlogChange} /></div>
      <div> url: <input name="url" value={newBlog.url} onChange={handleBlogChange} /></div>
      <button type="submit">save</button>
    </form>
  </div>
  )
}


export { LoginForm, BlogForm }
