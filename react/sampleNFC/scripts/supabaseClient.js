import {createClient} from '@supabase/supabase-js'
import {VITE_SUPABASE_URL} from '@env'
import {VITE_SUPABASE_ANON_KEY} from '@env'

const supabaseURL = VITE_SUPABASE_URL
const supabaseANON = VITE_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseURL, supabaseANON)