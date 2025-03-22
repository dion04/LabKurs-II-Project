const express = require('express')
const cors = require('cors')
const db = require('./models/index')

const app = express()

const corsOptions = {
  origin: ['http://localhost:5173']
}

app.use(cors(corsOptions))

const query = async () => {
  const user = await db.User.findAll()
  return user
}

app.get('/api', async (req, res) => {
  const data = await query()
  res.json({ data })
})

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080')
})
