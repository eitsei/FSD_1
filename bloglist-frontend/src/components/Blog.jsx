const Blog = ({ blog, removeBlog }) => (
  <div>
    {blog.title} by {blog.author}, {blog.likes} likes 
    <button onClick={() => removeBlog(blog.id)}>Remove</button>
  </div>  
)

export default Blog