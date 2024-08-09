import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { BlogForm } from './Forms'

describe('<Blog />', () => {

  const blog = {
    title: 'Test Blog',
    author: 'John Doe',
    url: 'http://testurl.com',
    likes: 5
  }

  const user = {
    name: 'Test User'
  }

  const mockHandleLike = vi.fn()
  const mockRemoveBlog = vi.fn()

  test('renders title and author, but not url or likes by default', () => {
    render(<Blog blog={blog} user={user} handleLike={mockHandleLike} removeBlog={mockRemoveBlog} />)

    expect(screen.getByText('Test Blog by John Doe')).toBeDefined()
    expect(screen.queryByText('url:')).toBeNull()
    expect(screen.queryByText('likes')).toBeNull()
  })

  test('... Also url and likes are shown, when button is clicked', async() => {
    render(<Blog blog={blog} user={user} handleLike={mockHandleLike} removeBlog={mockRemoveBlog} />)
    const userClick = userEvent.setup()
    const button = screen.getByText('View more')
    await userClick.click(button)
    expect(screen.getByText('url: http://testurl.com')).toBeDefined()
    expect(screen.getByText('likes : 5')).toBeDefined()

  })

  test('Likes is clicked twice and likes are +2', async () => {
    render(<Blog blog={blog} user={user} handleLike={mockHandleLike} removeBlog={mockRemoveBlog} />)
    const userClick = userEvent.setup()
    const ViewButton = screen.getByText('View more')
    await userClick.click(ViewButton)

    const LikeButton = screen.getByText('Like!')
    await userClick.click(LikeButton)
    await userClick.click(LikeButton)

    expect(mockHandleLike).toHaveBeenCalledTimes(2)
  })

  test('Adding a new blog succesfully', async() => {
    const createBlog = vi.fn()
    const user = { id: '123' }

    render(<BlogForm user={user} createBlog={createBlog} />)

    const userClick = userEvent.setup()


    const titleInput  = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput    = screen.getByPlaceholderText('url')

    const sendButton = screen.getByText('save')

    await userClick.type(titleInput, 'TESTI')
    await userClick.type(authorInput, 'KIRJOITTAJA')
    await userClick.type(urlInput, 'TESTI.FI')


    await userClick.click(sendButton)


    expect(createBlog).toHaveBeenCalledTimes(1)
    expect(createBlog).toHaveBeenCalledWith({
        title: 'TESTI',
        author: 'KIRJOITTAJA',
        url: 'TESTI.FI',
        likes:0,
        user:'123'
    })

  })
})
