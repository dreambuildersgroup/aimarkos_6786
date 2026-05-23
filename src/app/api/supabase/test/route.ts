import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('agencies')
      .select('*')
      .limit(1);

    if (error) {
      return NextResponse.json({ 
        status: "⚠️ Connected but no tables yet", 
        message: error.message 
      });
    }

    return NextResponse.json({
      status: "✅ Supabase connected successfully!",
      message: "Ready for tables, auth, and data",
      data: data
    });

  } catch (error: any) {
    return NextResponse.json({
      status: "❌ Connection failed",
      error: error.message
    });
  }
}