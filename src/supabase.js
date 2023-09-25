import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://csqonlcnfljufnuyipuj.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzcW9ubGNuZmxqdWZudXlpcHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU2NDk1MDgsImV4cCI6MjAxMTIyNTUwOH0._FcBHzMpFIhCMEkRWf6H7hrMLSYpaBx1j3lD4oA5IQo"

export const supabase = createClient(supabaseUrl, supabaseKey)