import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '../../lib/supabaseServer'
import { getUser } from '../../lib/getUser'

export async function GET(req: Request) {
  const supabase = await createSupabaseServerClient()

  const { searchParams } = new URL(req.url)

  const city = searchParams.get('city')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)

  let query = supabase.from('homes').select('*, home_preferences(*)')

  if (city) query = query.eq('city', city)
  if (minPrice) query = query.gte('price', Number(minPrice))
  if (maxPrice) query = query.lte('price', Number(maxPrice))

  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error } = await query.range(from, to)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient()
  const user = await getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()

  const { data, error } = await supabase
    .from('homes')
    .insert([{ landlord_id: user.id, ...body }])
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data)
}
