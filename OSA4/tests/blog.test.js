const { test, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')



describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('Blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  describe('viewing a specific blog', () => {

    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultBlog.body, blogToView)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/blog/${validNonexistingId}`)
        .expect(404)
    })

    test('Identifying field should be id', async () => {
      const blogs = await helper.blogsInDb()
      assert.deepStrictEqual(Object.prototype.hasOwnProperty.call(blogs[0], 'id'), true)

    })
  })
  describe('Adding a blog', () => {
    test('Amount of blogs should be +1 and it should include a added blog', async() => {
      const blogsAtStart = await helper.blogsInDb()
      const newBlog = {
        title: 'newBlog',
        author: 'MickeyMouse',
        url: 'test.com',
        likes: 5
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.deepStrictEqual(blogsAtStart.length +1, blogsAtEnd.length)
      const blogs = blogsAtEnd.map(blog => blog.title)
      assert(blogs.includes('newBlog'))
    })
    test('Amount of likes should be 0 if likes are not included', async () => {
      const newBlog = {
        title: 'No Likes!',
        author: 'Foo',
        url: 'nope.com'
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogs = await helper.blogsInDb()
      const addedBlog = blogs.find(blog => blog.title === 'No Likes!')
      assert.deepStrictEqual(addedBlog.likes,0)
    })
    test('If title or url is missing, returning 400 bad request', async () => {
      const withoutTitle = {
        author: 'Foo',
        url: 'nope.com',
        likes: 10000
      }
      const withoutUrl = {
        title: 'No url!',
        author: 'Foo',
        likes: 10000
      }
      await api
        .post('/api/blogs')
        .send(withoutTitle)
        .expect(400)

      await api
        .post('/api/blogs')
        .send(withoutUrl)
        .expect(400)

    })
  })
  describe('Deleting and modifying a blog', () => {
    test('Amount of blogs should be -1 and it should not include a deleted blog', async() => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      assert.deepStrictEqual(blogsAtStart.length - 1, blogsAtEnd.length)
      const blogs = blogsAtEnd.map(blog => blog.title)
      assert(!blogs.includes(`${blogToDelete.title}`))
    })

    test('Likes of modified blog should be 100 and it should not match original likes', async () => {
      const blogs = await helper.blogsInDb()
      const blogToModifyi = blogs[0]

      const modifyidBlog = {
        title: blogToModifyi.title,
        author: blogToModifyi.author,
        url:    blogToModifyi.url,
        likes:  100
      }

      await api
        .put(`/api/blogs/${blogToModifyi.id}`)
        .send(modifyidBlog)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      assert.notDeepStrictEqual(blogToModifyi.likes,blogsAtEnd[0].likes)
      assert.deepStrictEqual(blogsAtEnd[0].likes, 100)
    })
  })
})
