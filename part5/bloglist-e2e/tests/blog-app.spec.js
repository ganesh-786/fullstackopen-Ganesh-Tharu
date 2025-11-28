import { test, expect, beforeEach, describe } from '@playwright/test'

const API_BASE_URL = 'http://localhost:8080/api'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // Reset the database
    await request.post(`${API_BASE_URL}/testing/reset`)

    // Create a test user
    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'testpass'
    }

    await request.post(`${API_BASE_URL}/users`, {
      data: newUser
    })

    // Navigate to the app
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    // Find inputs by their labels or by name attribute
    await expect(page.locator('input[name="Username"]')).toBeVisible()
    await expect(page.locator('input[name="Password"]')).toBeVisible()
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.locator('input[name="Username"]').fill('testuser')
      await page.locator('input[name="Password"]').fill('testpass')
      await page.getByRole('button', { name: /login/i }).click()

      await expect(page.getByText('Test User logged in')).toBeVisible()
      await expect(page.getByText('log in to application')).not.toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.locator('input[name="Username"]').fill('testuser')
      await page.locator('input[name="Password"]').fill('wrongpass')
      await page.getByRole('button', { name: /login/i }).click()

      await expect(page.getByText('wrong username or password')).toBeVisible()
      await expect(page.getByText('log in to application')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      // Login before each test
      await page.locator('input[name="Username"]').fill('testuser')
      await page.locator('input[name="Password"]').fill('testpass')
      await page.getByRole('button', { name: /login/i }).click()
      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      // Click create new blog button
      await page.getByRole('button', { name: /create new blog/i }).click()

      // Fill in the form
      const titleInput = page.locator('.blog-form-title')
      const authorInput = page.locator('.blog-form-author')
      const urlInput = page.locator('.blog-form-url')

      await titleInput.fill('Test Blog Title')
      await authorInput.fill('Test Author')
      await urlInput.fill('https://test.com')

      // Submit the form
      await page.getByRole('button', { name: /create/i }).click()

      // Check that the blog appears in the list
      await expect(page.getByText('Test Blog Title Test Author')).toBeVisible()
    })

    test('a blog can be liked', async ({ page, request }) => {
      // First create a blog via API
      const loginResponse = await request.post(`${API_BASE_URL}/login`, {
        data: {
          username: 'testuser',
          password: 'testpass'
        }
      })
      const loginData = await loginResponse.json()
      const token = loginData.token

      const blogResponse = await request.post(`${API_BASE_URL}/blogs`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: {
          title: 'Blog to Like',
          author: 'Test Author',
          url: 'https://test.com',
          likes: 0
        }
      })
      const blog = await blogResponse.json()

      // Refresh the page to see the blog
      await page.reload()

      // Find and expand the blog - find the blog container by title
      const blogContainer = page.locator('.blog').filter({ hasText: 'Blog to Like Test Author' })
      await blogContainer.getByRole('button', { name: /view/i }).click()

      // Click the like button
      const likeButton = blogContainer.getByRole('button', { name: /like/i })
      await likeButton.click()

      // Check that likes increased - wait a bit for the update
      await expect(blogContainer.getByText(/likes 1/)).toBeVisible()
    })

    test('user can delete their own blog', async ({ page, request }) => {
      // Create a blog via API
      const loginResponse = await request.post(`${API_BASE_URL}/login`, {
        data: {
          username: 'testuser',
          password: 'testpass'
        }
      })
      const loginData = await loginResponse.json()
      const token = loginData.token

      await request.post(`${API_BASE_URL}/blogs`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: {
          title: 'Blog to Delete',
          author: 'Test Author',
          url: 'https://test.com'
        }
      })

      // Refresh the page
      await page.reload()

      // Find and expand the blog
      const blogContainer = page.locator('.blog').filter({ hasText: 'Blog to Delete Test Author' })
      await blogContainer.getByRole('button', { name: /view/i }).click()

      // Set up dialog handler before clicking delete
      const dialogPromise = page.waitForEvent('dialog')
      await blogContainer.getByRole('button', { name: /remove/i }).click()
      const dialog = await dialogPromise
      
      expect(dialog.message()).toContain('Remove blog Blog to Delete by Test Author')
      await dialog.accept()

      // Verify blog is removed
      await expect(page.getByText('Blog to Delete Test Author')).not.toBeVisible()
    })

    test('only blog owner sees delete button', async ({ page, request }) => {
      // Create a blog as testuser
      const loginResponse = await request.post(`${API_BASE_URL}/login`, {
        data: {
          username: 'testuser',
          password: 'testpass'
        }
      })
      const loginData = await loginResponse.json()
      const token = loginData.token

      await request.post(`${API_BASE_URL}/blogs`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: {
          title: 'Owned Blog',
          author: 'Test Author',
          url: 'https://test.com'
        }
      })

      // Create another user
      await request.post(`${API_BASE_URL}/users`, {
        data: {
          username: 'otheruser',
          name: 'Other User',
          password: 'otherpass'
        }
      })

      // Login as other user
      await page.getByRole('button', { name: /logout/i }).click()
      await page.locator('input[name="Username"]').fill('otheruser')
      await page.locator('input[name="Password"]').fill('otherpass')
      await page.getByRole('button', { name: /login/i }).click()

      await page.reload()

      // Find and expand the blog
      const blogContainer = page.locator('.blog').filter({ hasText: 'Owned Blog Test Author' })
      await blogContainer.getByRole('button', { name: /view/i }).click()

      // Verify delete button is NOT visible
      await expect(blogContainer.getByRole('button', { name: /remove/i })).not.toBeVisible()
    })

    test('blogs are sorted by likes', async ({ page, request }) => {
      // Login and create multiple blogs with different likes
      const loginResponse = await request.post(`${API_BASE_URL}/login`, {
        data: {
          username: 'testuser',
          password: 'testpass'
        }
      })
      const loginData = await loginResponse.json()
      const token = loginData.token

      // Create blog with 0 likes
      const blog1 = await request.post(`${API_BASE_URL}/blogs`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: {
          title: 'Blog with 0 likes',
          author: 'Author 1',
          url: 'https://test1.com',
          likes: 0
        }
      })
      const blog1Data = await blog1.json()

      // Create blog with 5 likes
      const blog2 = await request.post(`${API_BASE_URL}/blogs`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: {
          title: 'Blog with 5 likes',
          author: 'Author 2',
          url: 'https://test2.com',
          likes: 5
        }
      })
      const blog2Data = await blog2.json()

      // Create blog with 10 likes
      const blog3 = await request.post(`${API_BASE_URL}/blogs`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: {
          title: 'Blog with 10 likes',
          author: 'Author 3',
          url: 'https://test3.com',
          likes: 10
        }
      })
      const blog3Data = await blog3.json()

      // Refresh the page
      await page.reload()

      // Get all blog titles in order
      const blogTitles = await page.locator('.blog-title-author').allTextContents()

      // Find indices of each blog
      const index0 = blogTitles.findIndex(t => t.includes('Blog with 0 likes'))
      const index5 = blogTitles.findIndex(t => t.includes('Blog with 5 likes'))
      const index10 = blogTitles.findIndex(t => t.includes('Blog with 10 likes'))

      // Verify sorting: 10 likes should come first, then 5, then 0
      expect(index10).toBeLessThan(index5)
      expect(index5).toBeLessThan(index0)
    })
  })
})

