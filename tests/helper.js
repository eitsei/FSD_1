const {expect} = require('@playwright/test')

const loginWith = async (page, username, password)  => {
    await page.getByRole('button', { name: 'Open login form' }).click()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
  }
const addBlog = async(page, title, author, url) => {
    await page.getByRole('button', { name: 'Add new blog' }).click()
    await page.getByTestId('title').fill(title)
    await page.getByTestId('author').fill(author)
    await page.getByTestId('url').fill(url)
    await page.getByRole('button', { name: 'save' }).click()
    await page.getByText(`${title} by ${author}`).waitFor()
    }
const deleteBlog = async (page, name, author) => {
    const blog = page.locator(`text=${name} by ${author}`).first()
    await blog.locator('button', { hasText: 'View more' }).click()

    page.once('dialog', async dialog => {
        const message = await dialog.message()
        expect(message).toEqual(`Do you want to remove ${name} by ${author}?`)
        await dialog.accept()       
    }) 
    await page.getByRole('button', { name: 'Remove' }).click()
    await expect(blog).toHaveCount(0)
}

const addLikes = async (page, blog) => {

        const blogElem = page.locator(`text=${blog.title} by ${blog.author}`).first();
        await blogElem.locator('button', { hasText: 'View more' }).click()
        for (let i = 0; i < blog.likes; i++) {
            await page.getByRole('button', { name: 'Like!' }).click()
        }
        await blogElem.locator('button', { hasText: 'Hide' }).click()

}
const addMultipleBlogs = async(page, blogs) => {

    for(let i = 0; i < blogs.length; i++) {
        await addBlog(page, blogs[i].title, blogs[i].author, blogs[i].url)
        await addLikes(page, blogs[i])
    }
    
}

const deleteMultipleBlogs = async(page, blogs) => {
    for(const blog of blogs) {
        await deleteBlog(page, blog.title, blog.author)
    }
}
export { loginWith , addBlog, deleteBlog, addMultipleBlogs, deleteMultipleBlogs}