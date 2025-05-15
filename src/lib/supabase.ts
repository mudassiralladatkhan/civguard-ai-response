
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Log an error if environment variables are missing
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
}

// Create supabase client with error handling
let supabase;

try {
  supabase = createClient(supabaseUrl, supabaseKey);
} catch (error) {
  console.error('Error initializing Supabase client:', error);
  // Create a dummy client that will display appropriate errors when methods are called
  supabase = {
    auth: {
      signUp: () => Promise.reject(new Error('Supabase not configured')),
      signInWithPassword: () => Promise.reject(new Error('Supabase not configured')),
      signOut: () => Promise.reject(new Error('Supabase not configured')),
      getSession: () => Promise.resolve({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: () => ({
      select: () => ({ eq: () => ({ single: () => Promise.reject(new Error('Supabase not configured')) }) }),
      insert: () => Promise.reject(new Error('Supabase not configured')),
    }),
  };
}

export { supabase };
