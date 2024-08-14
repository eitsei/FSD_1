const { test, describe, expect, beforeEach, afterEach} = require('@playwright/test')

const { loginWith , addBlog , deleteBlog, addMultipleBlogs, deleteMultipleBlogs} = require('./helper');

describe('Blog app', async () => {
    const data = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
    };
    
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
          data: {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
          }
        })
    
        await page.goto('/')
      })
    

    test('front page can be opened', async ({ page }) => {
        if( await page.getByTestId('no-blogs-message').isVisible()){
            await expect(page.getByText('No blogs added. Maybe add a new blog?')).toBeVisible()
        } else {
            await expect(page.getByTestId('blog-item').first()).toBeVisible()
        }
    })
    describe('Login', () => {
        afterEach(async ({ page }) => {
            const loggedInTextVisible = await page.locator(`text=${data.name} logged in`).isVisible();
            if (loggedInTextVisible) {
                await page.getByRole('button', { name: 'logout' }).click()
            }
        })

        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, data.username, data.password)
            await expect(page.getByText(`${data.name} logged in`)).toBeVisible()
        })
    
        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, data.username, 'wrongpswrd')
            const errorDiv = await page.locator('.error')
            await expect(errorDiv).toContainText('Wrong credentials!')
        })
      })


    describe('when logged in', async () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, data.username, data.password)
        })

        afterEach(async({ page }) => {
            await page.getByRole('button', { name: 'logout' }).click()
        })
    
        test('a new blog can be added and deleted', async ({ page }) => {
            const title = 'Some blog'
            const author = 'playwrightFI'
            await addBlog(page, title, author, 'playwright.url')
            await expect(page.locator(`text=${title} by ${author}`)).toHaveCount(1)
            await deleteBlog(page,title,author)
        })

        describe('and a blog exist',() => {
            const title = 'test blog'
            const author = 'playwright'
            beforeEach(async ({page}) => {
                await addBlog(page, title, author, 'playwright.url')
            })
            afterEach(async ({page}) => {
                await deleteBlog(page,title,author)
            })

            test('Like can be added to a specific blog', async ({ page }) => {
                const blog = page.locator(`text=${title} by ${author}`).first()
                await blog.locator('button', { hasText: 'View more' }).click()
                const likesBefore = await page.getByText('likes : 0 Like!').textContent()
                const likesBef = parseInt(likesBefore.split('likes : ')[1])
                await page.getByRole('button', { name: 'Like!' }).click()
                const likesAfter = await page.getByText('likes : 1 Like!').textContent()
                const updatedLikes = parseInt(likesAfter.split('likes : ')[1])
                expect(updatedLikes).toBe(likesBef + 1)
                await blog.locator('button', { hasText: 'Hide' }).click()            
            })
        })
        
        test('Non-logged user cannot remove blogs', async({page}) => {
            const blogs = await page.getByTestId('blog-item')
            const firstBlog = blogs.first()
            await expect(firstBlog).toBeVisible()
            await firstBlog.locator('button', { hasText: 'View more' }).first().click()
            await expect(page.getByRole('button', { name: 'Remove' })).toBeHidden()
        })
    
        test('Logged user cannot remove blogs added by other user', async({page}) => {
            if(await page.getByRole('button', { name: 'logout' }).isVisible()){
                await page.getByRole('button', { name: 'logout' }).click()
            }
    
            loginWith(page, 'eitsei', 'anasalas')
            const blogs = await page.getByTestId('blog-item')
            const firstBlog = blogs.first()
            await expect(firstBlog).toBeVisible()
            await firstBlog.getByRole('button', { name: 'View more' }).first().click()
            await expect(page.getByRole('button', { name: 'Remove' })).toBeHidden()
            await page.getByRole('button', { name: 'logout' }).click()
        })

        describe('Multiple blogs', () => {
            const testBlogs = [
                { title: "JavaScriptin perusteet", author: "Matti Meikäläinen", url: "www.javascript.fi", likes: 4 },
                { title: "React ja moderni frontend-kehitys", author: "Liisa Virtanen", url: "www.react.fi", likes: 12 },
                { title: "Node.js ja palvelinpuolen JavaScript", author: "Kalle Korhonen", url: "www.nodejs.fi", likes: 7 },
                { title: "CSS-vinkit ja -temput", author: "Minna Nieminen", url: "www.css.fi", likes: 3 },
                { title: "HTML:n uudet ominaisuudet", author: "Pekka Pouta", url: "www.html.fi", likes: 9 }
            ]
            beforeEach(async ({ page }) => {
                await addMultipleBlogs(page, testBlogs)
            })

            afterEach(async ({ page }) => {
                await deleteMultipleBlogs(page, testBlogs)
            })
            test('Blogs are sorted by likes in descending order', async ({ page }) => {
                const blogElements = await page.getByTestId('blog-item').all()
                let blogs = []
                for (const blog of blogElements) {
                    await blog.getByRole('button', {name: 'View more'}).click()
                    const text = await blog.getByTestId('blog-text').textContent()
                    const parsedText = text.replace(' Hide!', '')
                    const likes = await blog.getByTestId('likes').textContent()
                    const parsedLikes = parseInt(likes.split('likes : ')[1])
                    blogs = [...blogs, {text: parsedText,likes: parsedLikes}]
                    await blog.locator('button', { hasText: 'Hide' }).click()
                }
                for (let i = 1; i < blogs.length; i++) {
                    expect(blogs[i - 1].likes).toBeGreaterThanOrEqual(blogs[i].likes)
                } 

            })
        })

        
    })
})

