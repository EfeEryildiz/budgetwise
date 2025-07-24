import express from 'express'
import { register, login, logout, getMe } from '../controllers/authController'
import { protect } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout);
router.get('/protected', protect, (req, res) => {
  const userId = (req as any).userId
  res.json({ message: `You are authorized. User ID: ${userId}` })
})

export default router
