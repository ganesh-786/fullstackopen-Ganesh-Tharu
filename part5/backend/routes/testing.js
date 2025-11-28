import express from 'express'
import { User } from '../models/user.js'
import { Blog } from '../models/Blog.js'

const testingRouter = express.Router()

// Only allow in test environment
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
  testingRouter.post('/reset', async (req, res) => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    res.status(204).end()
  })
}

export default testingRouter

