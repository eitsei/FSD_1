import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import {LoginForm, BlogForm} from './components/Forms'
import loginService from './services/login'
import BlogApp from './components/BlogAppService'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', likes: 0 })
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState("info")

  const { errorMessageFunc, Notification } = BlogApp({
    setErrorMessage,
    notificationMessage,
    setNotificationMessage
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs ))  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes,
      user: user.id
    }
    try {
      
      const response = await blogService.create(blogObject)

      setBlogs((prevBlogs) => {
        const newBlogs = [...prevBlogs, response]
        return newBlogs
      })
      errorMessageFunc(user, response,"add",null)
      setNewBlog({ title: '', author: '', url: '', likes: 0 })
    } catch (error) {
      errorMessageFunc(null, null,"error",error)
    }          
  }

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog(prevBlog => ({ ...prevBlog, [name]: value }))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      errorMessageFunc(user,null,"login",null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      errorMessageFunc(user,null,"credentials",'Wrong credentials!')
    }
  }

  const handleRemoveBlog = async (blog) => {
    try {
      await blogService.remove(blog.id)
      setBlogs((prevBlogs) => {
        const newBlogs = prevBlogs.filter(b => b.id !== blog.id)
        return newBlogs
      })
      errorMessageFunc(null, blog,"remove",null)
    }
    catch(error) {
      errorMessageFunc(null,null,"error",error)
    }
  }
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    errorMessageFunc(user,null,"logout",null)
    setUser(null)
  }
  
  const b = user === null ? [] : blogs.filter(blog => blog.user && (blog.user.id || blog.user) === user.id)
  return (
    <div>
      <h1>blogs</h1>
      <Notification message = {errorMessage}/>
      {!user && <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />}
      {user && <div>
        <p>{user.name} logged in <button type='button' onClick={handleLogout}>logout</button> </p>
        <BlogForm addBlog={addBlog} newBlog={newBlog} handleBlogChange={handleBlogChange} />
        {
          b.length === 0 ? <p> No blogs added. Maybe add a new blog?</p> :
        b.map(blog =>
        <Blog key={blog.id} blog={blog} removeBlog={() => handleRemoveBlog(blog)} />)
      }
      </div>}
    </div>
  )
}
//        
export default App