import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'

export const register = async (req: Request, res: Response) => {
  console.log('📥 Register Request Received:', req.body)

  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      console.error('❌ Missing fields in request body')
      return res.status(400).json({ error: 'All fields are required' })
    }

    // check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      console.error('❌ Email already in use:', email)
      return res.status(400).json({ error: 'Email already in use' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    console.log('✅ New user created:', user)

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'default_secret', {
      expiresIn: '7d',
    })

    res.status(201).json({ token })
  } catch (error) {
    console.error('🔥 Registration Error:', error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(404).json({ error: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' })
    res.json({ user: { id: user.id, email: user.email }, token })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}

export const getMe = async (req: Request, res: Response) => {
  const userId = (req as any).userId
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({ user: { id: user.id, email: user.email, name: user.name } })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'lax',
    secure: false, // true if using HTTPS
  });
  res.json({ message: 'Logged out successfully' });
};
