import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://test.com',
    likes: 5,
    id: '123',
    user: {
      id: 'user123',
      username: 'testuser',
      name: 'Test User'
    }
  }

  const mockOnLike = vi.fn()
  const mockOnDelete = vi.fn()
  const currentUser = {
    id: 'user123',
    username: 'testuser'
  }

  it('renders blog title and author by default', () => {
    const { container } = render(
      <Blog blog={blog} onLike={mockOnLike} onDelete={mockOnDelete} currentUser={currentUser} />
    )

    expect(container.querySelector('.blog-title-author')).toHaveTextContent('Test Blog Test Author')
  })

  it('does not render URL or likes by default', () => {
    const { container } = render(
      <Blog blog={blog} onLike={mockOnLike} onDelete={mockOnDelete} currentUser={currentUser} />
    )

    expect(container.querySelector('.blog-url')).not.toBeInTheDocument()
    expect(container.querySelector('.blog-likes')).not.toBeInTheDocument()
  })

  it('shows URL and likes when view button is clicked', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Blog blog={blog} onLike={mockOnLike} onDelete={mockOnDelete} currentUser={currentUser} />
    )

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    expect(container.querySelector('.blog-url')).toBeInTheDocument()
    expect(container.querySelector('.blog-url')).toHaveTextContent('https://test.com')
    expect(container.querySelector('.blog-likes')).toBeInTheDocument()
    expect(container.querySelector('.blog-likes')).toHaveTextContent('likes 5')
  })

  it('calls onLike handler twice when like button is clicked twice', async () => {
    const user = userEvent.setup()
    render(
      <Blog blog={blog} onLike={mockOnLike} onDelete={mockOnDelete} currentUser={currentUser} />
    )

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockOnLike).toHaveBeenCalledTimes(2)
  })
})

