import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { LoginForm, BlogForm } from './components/Forms'
import loginService from './services/login'
import BlogApp from './components/BlogAppService'
import Togglable from './components/Togglable'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState('info')


  const { errorMessageFunc, Notification } = BlogApp({
    setErrorMessage,
    notificationMessage,
    setNotificationMessage
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


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
      errorMessageFunc(user,null,'login',null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      errorMessageFunc(user,null,'credentials','Wrong credentials!')
    }
  }

  const handleRemoveBlog = async (blog) => {
    try {
      await blogService.remove(blog.id)
      setBlogs((prevBlogs) => {
        const newBlogs = prevBlogs.filter(b => b.id !== blog.id)
        return newBlogs
      })
      errorMessageFunc(null, blog,'remove',null)
    }
    catch(error) {
      if (error.response && error.response.status === 401 && error.response.data.error === 'token expired') {
        errorMessageFunc(null, null, 'error', 'Token expired. Please log in again.')
      } else {
        errorMessageFunc(null, null, 'error', error)
      }
    }
  }
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    errorMessageFunc(user,null,'logout',null)
    setUser(null)
  }

  // const b = user
  //   ?
  //   blogs.filter(blog => blog.user && (blog.user.id || blog.user) === user.id)
  //   :
  //   blogs
  const b = blogs

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const response = await blogService.create(blogObject)

      setBlogs((prevBlogs) => {
        const newBlogs = [...prevBlogs, response]
        return newBlogs
      })

      errorMessageFunc(user, response, 'add', null)
    } catch (error) {
      if (error.response && error.response.status === 401 && error.response.data.error === 'token expired') {
        errorMessageFunc(null, null, 'error', 'Token expired. Please log in again.')
      } else {
        errorMessageFunc(null, null, 'error', error)
      }
    }
  }
  const handleLike = async (blogObject) => {

    try {
      const updatedBlog = await blogService.update(blogObject)
      const updatedBlogs = blogs.map(b => b.id !== blogObject.id ? b : updatedBlog)
      setBlogs(updatedBlogs)
      errorMessageFunc(null,updatedBlog,'like',null)
    } catch (error) {
      errorMessageFunc(null, null, 'error', error)
    }
  }

  const blogFormRef = useRef()
  return (
    <div data-testid="blog-container">
      <h1>blogs</h1>
      <Notification message={errorMessage} />
      {
        !user &&
        <div>
          <Togglable buttonLabel='Open login form'>
            <LoginForm
              handleLogin={handleLogin}
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          </Togglable>
        </div>
      }
      {
        user &&
        <div>
          <p>{user.name} logged in <button type='button' onClick={handleLogout}>logout</button> </p>
          <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
            <BlogForm
              user={user}
              createBlog={addBlog}
            />
          </Togglable>
        </div>
      }
      <div data-testid="blog-section">
        {b.length === 0 ? (
          <p data-testid="no-blogs-message">No blogs added. Maybe add a new blog?</p>
        ) : (
          b.sort((a, b) => b.likes - a.likes).map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              removeBlog={() => handleRemoveBlog(blog)}
              user={user}
            />
          ))
        )}
      </div>
    </div>
  )
}
//
export default App