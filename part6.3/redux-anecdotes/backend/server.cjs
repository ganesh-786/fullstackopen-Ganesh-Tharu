const jsonServer = require('json-server')
const path = require('path')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

const PORT = 3001

server.use(middlewares)
server.use(jsonServer.bodyParser)

// Validation middleware for creating anecdotes
server.use((req, res, next) => {
  if (req.method === 'POST' && req.path === '/anecdotes') {
    const { content } = req.body
    if (!content || content.length < 5) {
      return res.status(400).json({
        error: 'too short anecdote, must have length 5 or more',
      })
    }
  }
  next()
})

server.use(router)

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`)
})

