import { createSupabaseServerClient } from './supabaseServer'

export const getUser = async () => {
  const supabase = await createSupabaseServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  return user
}
