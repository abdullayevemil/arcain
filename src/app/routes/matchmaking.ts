import { Router } from 'express'
import { supabase } from '../lib/supabaseClient'
import { verifyUser, AuthRequest } from '../middleware/auth'

const router = Router()

router.get('/feed', verifyUser, async (req: AuthRequest, res) => {
  const userId = req.user!.id

  const { data: prefs } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', userId)
    .single()

  const { data: homes } = await supabase
    .from('homes')
    .select('*, home_preferences(*)')

  if (!prefs || !homes) return res.json([])

  const rankedHomes = homes.map((home: any) => {
    let score = 0

    if (home.price >= prefs.budget_min && home.price <= prefs.budget_max) score += 30
    if (prefs.preferred_cities?.includes(home.city)) score += 20
    if (home.home_preferences.smoker_allowed || !prefs.smoker) score += 15
    if (home.home_preferences.pets_allowed || !prefs.pets) score += 10
    if (Math.abs(home.home_preferences.cleanliness_expectation - prefs.cleanliness_level) <= 1) score += 15
    if (home.home_preferences.environment === prefs.study_environment) score += 10

    return { ...home, score }
  })

  rankedHomes.sort((a, b) => b.score - a.score)

  res.json(rankedHomes.slice(0, 20))
})

// Swipe action
router.post('/swipe', verifyUser, async (req: AuthRequest, res) => {
  const userId = req.user!.id
  const { homeId, liked } = req.body

  const { error } = await supabase
    .from('swipes')
    .upsert([{ user_id: userId, home_id: homeId, liked }])

  if (error) return res.status(400).json({ error })

  res.json({ success: true })
})

export default router
