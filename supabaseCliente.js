const supabaseUrl = 'https://qofkgqlhyzirokodbpuj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvZmtncWxoeXppcm9rb2RicHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyNjg5MDUsImV4cCI6MjA2Njg0NDkwNX0.dVWR1Qb6nLnd2ZUpRkRv0JlIyA2rNK2lb4eSZMad3w8';
window.mySupabase = window.supabase.createClient(supabaseUrl, supabaseKey);