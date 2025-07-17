import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase project URL and anon key
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://xphgwzbxwwaqoaedfsoq.supabase.co';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwaGd3emJ4d3dhcW9hZWRmc29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyMjU0ODgsImV4cCI6MjA2NjgwMTQ4OH0.J6lqFQjg41BsaA1i0yWeIkAR_yN2ia7_FgkTnxmdzLU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
