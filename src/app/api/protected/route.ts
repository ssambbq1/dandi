import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function POST(req: NextRequest) {
  const { value } = await req.json();
  const { data, error } = await supabase
    .from('api_keys')
    .select('id')
    .eq('value', value)
    .single();
  if (error || !data) {
    return NextResponse.json({ valid: false }, { status: 200 });
  }
  return NextResponse.json({ valid: true }, { status: 200 });
} 