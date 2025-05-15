
import { createClient } from '@supabase/supabase-js';

// Get environment variables with proper fallbacks for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example';

// Show a warning if using fallback values
if (supabaseUrl === 'https://example.supabase.co' || supabaseKey === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example') {
  console.warn(
    'Using placeholder Supabase credentials. Please set proper VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY ' +
    'environment variables in your Lovable project. Go to Project Settings > Environment Variables to add them.'
  );
}

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Export the client
export { supabase };
