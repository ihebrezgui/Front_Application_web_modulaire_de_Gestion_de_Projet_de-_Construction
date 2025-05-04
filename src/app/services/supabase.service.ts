// src/app/services/supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rjdfqsmxwlpgbjchghzl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqZGZxc214d2xwZ2JqY2hnaHpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NjAyMjksImV4cCI6MjA1OTUzNjIyOX0.1DPolyoB3sgHtiTwrxDdPver5aMLa0QP8VEuf_5MQKY';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

 // Update your SupabaseService constructor:
constructor() {
  this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
      storage: {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {}
      }
    },
    global: {
      // This disables the lock manager entirely
      headers: {
        'X-Supabase-No-Navigator-Lock': 'true'
      }
    }
  });
}



  // Method to fetch model by id
 // In your SupabaseService
 async getModelById(id: number) {
  try {
    const { data, error } = await this.supabase
      .from('models')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return data;
  } catch (err) {
    console.error('Error querying model:', err);
    return null;
  }
}


// In supabase.service.ts

// Get all models
async getAllModels(): Promise<any[]> {
  try {
    const { data, error } = await this.supabase
      .from('models')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching models:', error);
    return [];
  }
}
}
