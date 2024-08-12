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
    
    page.on('dialog', async dialog => {
        expect(dialog.message()).toEqual(`Do you want to remove ${name} by ${author}?`)
        await dialog.accept()
    }) 
    await page.getByRole('button', { name: 'Remove' }).click()
    await expect(page.locator(`text=${name} by ${author}`)).toHaveCount(0)
}
export { loginWith , addBlog, deleteBlog}