import { Router } from 'express'
import { supabase } from '../lib/supabaseClient'
import { verifyUser, AuthRequest } from '../middleware/auth'

const router = Router()

// GET homes with filters + pagination
router.get('/', async (req, res) => {
  const { city, minPrice, maxPrice, page = '1', limit = '10' } = req.query

  let query = supabase.from('homes').select('*, home_preferences(*)')

  if (city) query = query.eq('city', city)
  if (minPrice) query = query.gte('price', Number(minPrice))
  if (maxPrice) query = query.lte('price', Number(maxPrice))

  const from = (Number(page) - 1) * Number(limit)
  const to = from + Number(limit) - 1

  const { data, error } = await query.range(from, to)
  if (error) return res.status(400).json({ error })

  res.json(data)
})

// CREATE home (landlord only)
router.post('/', verifyUser, async (req: AuthRequest, res) => {
  const userId = req.user!.id
  const { title, description, city, price } = req.body

  const { data, error } = await supabase
    .from('homes')
    .insert([{ landlord_id: userId, title, description, city, price }])

  if (error) return res.status(400).json({ error })
  res.json(data)
})

export default router
