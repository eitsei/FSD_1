const dummy = () => {
  return 1
}
const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else if (blogs.length === 1) {
    return blogs[0].likes
  } else {
    return blogs.reduce((sum, blog) => sum += blog.likes, 0)
  }
}

const favoriteBlog = (blogs) => {

  if (blogs.length === 0) return null

  let favBlog = 0
  favBlog = blogs[0]

  for (let i = 0; i < blogs.length; i++) {
    if (favBlog.likes < blogs[i].likes) {
      favBlog = blogs[i]
    }
  }

  const res = {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes
  }
  return res
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  let bloggers = []
  for (let i = 0; i < blogs.length; i++) {
    const author = blogs[i].author
    const existingBlogger = bloggers.find(blogger => blogger.author === author)

    if (!existingBlogger) {
      bloggers.push({
        author: author,
        blogs: 1
      })
    } else {
      existingBlogger.blogs += 1
    }
  }

  let mostBlogger = bloggers[0]
  for (let i = 0; i < bloggers.length; i++) {
    if (bloggers[i].blogs > mostBlogger.blogs){
      mostBlogger = bloggers[i]
    }
  }
  return mostBlogger
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  let bloggers = []
  for (let i = 0; i < blogs.length; i++) {
    const author = blogs[i].author
    const existingBlogger = bloggers.find(blogger => blogger.author === author)

    if (!existingBlogger) {
      bloggers.push({
        author: author,
        likes: blogs[i].likes
      })
    } else {
      existingBlogger.likes += blogs[i].likes
    }
  }

  let mostLiked = bloggers[0]
  for (let i = 0; i < bloggers.length; i++) {
    if (bloggers[i].likes > mostLiked.likes){
      mostLiked = bloggers[i]
    }
  }
  return mostLiked
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}