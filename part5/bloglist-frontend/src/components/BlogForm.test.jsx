import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('BlogForm', () => {
  it('calls createBlog with correct details when form is submitted', async () => {
    const mockCreateBlog = vi.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm createBlog={mockCreateBlog} />)

    // Find inputs by their class names
    const titleField = container.querySelector('.blog-form-title')
    const authorField = container.querySelector('.blog-form-author')
    const urlField = container.querySelector('.blog-form-url')
    const submitButton = screen.getByText('create')

    await user.type(titleField, 'Test Blog Title')
    await user.type(authorField, 'Test Author')
    await user.type(urlField, 'https://test.com')
    await user.click(submitButton)

    expect(mockCreateBlog).toHaveBeenCalledTimes(1)
    expect(mockCreateBlog).toHaveBeenCalledWith({
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'https://test.com'
    })
  })
})

