const { test, describe, expect, beforeEach, afterEach} = require('@playwright/test')

const { loginWith , addBlog , deleteBlog} = require('./helper');

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
        await expect(page.getByText('No blogs added. Maybe add a new blog?')).toBeVisible()
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
                const likesBefore = await page.getByText('likes').textContent()
                const likesBef = parseInt(likesBefore.split('likes : ')[1])
                console.log('Likes before: ',likesBef)
                await page.getByRole('button', { name: 'Like!' }).click()
                const likesAfter = await page.getByText('likes').textContent()
                const updatedLikes = parseInt(likesAfter.split('likes : ')[1])
                console.log('Updated Likes: ', updatedLikes)
                await blog.locator('button', { hasText: 'Hide' }).click()            
            })           
        })
        test('Non-logged user cannot remove blogs', async({page}) => {
            await page.getByRole('button', { name: 'logout' }).click()
            const firstBlog = page.locator('li').first()
            console.log(await firstBlog.textContent())
            await firstBlog.locator('button', { hasText: 'View more' }).click()
            await expect(page.getByRole('button', { name: 'Remove' })).toBeHidden()
        })
    })

    
})