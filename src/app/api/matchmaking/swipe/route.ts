import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supabaseServer'
import { getUser } from '../../../lib/getUser'

export async function POST(req: Request) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { homeId, liked } = await req.json()

  const { error } = await supabaseAdmin
    .from('swipes')
    .upsert([{ user_id: user.id, home_id: homeId, liked }])

  if (error) return NextResponse.json({ error }, { status: 400 })

  return NextResponse.json({ success: true })
}
