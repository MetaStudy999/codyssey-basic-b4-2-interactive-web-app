import { supabase } from './supabase';

const TABLE = 'items';

export async function listItems() {
  const { data, error } = await supabase.from(TABLE).select('*').order('id', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getItem(id) {
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function createItem(values) {
  const { data, error } = await supabase.from(TABLE).insert(values).select().single();
  if (error) throw error;
  return data;
}

export async function updateItem(id, values) {
  const { data, error } = await supabase
    .from(TABLE)
    .update({ ...values, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteItem(id) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}
