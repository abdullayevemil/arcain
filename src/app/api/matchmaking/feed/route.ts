import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supabaseServer'
import { getUser } from '../../../lib/getUser'

export async function GET() {
  const user = await getUser()
  if (!user) return NextResponse.json([], { status: 401 })

  const { data: prefs } = await supabaseAdmin
    .from('user_preferences')
    .select('*')
    .eq('user_id', user.id)
    .single()

  const { data: homes } = await supabaseAdmin
    .from('homes')
    .select('*, home_preferences(*)')

  const rankedHomes = homes?.map((home: any) => {
    let score = 0
    if (home.price >= prefs.budget_min && home.price <= prefs.budget_max) score += 30
    if (prefs.preferred_cities?.includes(home.city)) score += 20
    if (home.home_preferences.smoker_allowed || !prefs.smoker) score += 15
    if (home.home_preferences.pets_allowed || !prefs.pets) score += 10
    if (Math.abs(home.home_preferences.cleanliness_expectation - prefs.cleanliness_level) <= 1) score += 15
    if (home.home_preferences.environment === prefs.study_environment) score += 10
    return { ...home, score }
  })

  rankedHomes.sort((a: any, b: any) => b.score - a.score)

  return NextResponse.json(rankedHomes.slice(0, 20))
}
