import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tfzumjizxzwoegyenqzc.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_aW2FlmdYZQ96frt9nGIGYw_C6dQv3L2'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
