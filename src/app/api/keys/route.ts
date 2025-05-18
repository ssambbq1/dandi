import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const { data, error } = await supabase
    .from('api_keys')
    .select('id, value, name, usage')
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  const id = uuidv4();
  const value = `ak_${Date.now()}`;
  const usage = 0;
  const { data, error } = await supabase
    .from('api_keys')
    .insert([{ id, value, name, usage }])
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const { id, name } = await req.json();
  const { data, error } = await supabase
    .from('api_keys')
    .update({ name })
    .eq('id', id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const { error } = await supabase
    .from('api_keys')
    .delete()
    .eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
} 