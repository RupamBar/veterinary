
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const apiKey = process.env.ANON_KEY
// Create a single supabase client for interacting with your database
const supabase = createClient("https://ndbiymnaghcpjlislwyu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kYml5bW5hZ2hjcGpsaXNsd3l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyMTM3MDEsImV4cCI6MjAxNDc4OTcwMX0.vbYNhR2ZfEJyfpnI724FaXqjPm9ADwiy0bYXzSJRGXk");

export default supabase;