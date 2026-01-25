import { Router } from 'express'
import { supabase } from '../lib/supabaseClient'
import { verifyUser, AuthRequest } from '../middleware/auth'

const router = Router()

router.post('/user', verifyUser, async (req: AuthRequest, res) => {
  const userId = req.user!.id

  const { error } = await supabase
    .from('user_preferences')
    .upsert([{ user_id: userId, ...req.body }])

  if (error) return res.status(400).json({ error })
  res.json({ success: true })
})

router.post('/home/:homeId', verifyUser, async (req: AuthRequest, res) => {
  const homeId = Number(req.params.homeId)

  const { error } = await supabase
    .from('home_preferences')
    .upsert([{ home_id: homeId, ...req.body }])

  if (error) return res.status(400).json({ error })
  res.json({ success: true })
})

export default router
