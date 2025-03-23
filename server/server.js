const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('./models/index')

const app = express()
// This is a secret key that will be stored inside a .env file
const JWT_SECRET =
  'base64:dHdFTjlGZ0tiSmxneG1heDdGVmpoSzlpTmFlSHRKNStuZ0I2QWRFRzJsZmhOZ2NyeHU3N1QrRXRPNkpuYzM4Qg=='

const corsOptions = {
  origin: ['http://localhost:5173']
}

app.use(cors(corsOptions))
app.use(express.json())

app.post('/api/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await db.User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    })

    const token = jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({ token })
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: 'Registration failed' })
  }
})

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await db.User.findOne({ where: { email } })

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' })
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' })
    res.json({ token })
  } catch (error) {
    res.status(400).json({ error: 'Login failed' })
  }
})

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).json({ error: 'Access denied' })

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' })
    req.user = user
    next()
  })
}

app.get('/api/users', authenticateToken, async (req, res) => {
  const users = await db.User.findAll({
    attributes: ['id', 'firstName', 'lastName', 'email']
  })
  res.json({ data: users })
})

app.get('/api/users/me', authenticateToken, async (req, res) => {
  try {
    const user = await db.User.findByPk(req.user.id, {
      attributes: ['id', 'firstName', 'lastName', 'email']
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user data' })
  }
})

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080')
})
