

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => (
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
)

const BlogForm = ({ addBlog, newBlog, handleBlogChange }) => (
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

export { LoginForm, BlogForm }
