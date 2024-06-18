const Blog = ({ blog }) => (
  <div>
    {blog.title} by {blog.author}, {blog.likes} likes
  </div>  
)

export default Blog