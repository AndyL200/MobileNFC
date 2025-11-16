import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import {REACT_APP_SUPABASE_URL} from '@env'
import {REACT_APP_SUPABASE_ANON_KEY} from '@env'

const supabaseURL = REACT_APP_SUPABASE_URL
const supabaseANON = REACT_APP_SUPABASE_ANON_KEY
console.log('URL:', supabaseURL)
console.log('ANON:', supabaseANON)

// Validate environment variables
if (!supabaseURL || !supabaseANON) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseURL, supabaseANON, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'implicit',
  },
})

console.log('Supabase client created:', !!supabase)

export default supabase