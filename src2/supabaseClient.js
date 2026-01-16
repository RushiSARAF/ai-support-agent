import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://xgofcjzlskdjnszxvmep.supabase.co"
const supabaseAnonKey = "sb_publishable_FO4EqH3y6r51D-rEW-K8sg_PKEkUNfs"

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)
