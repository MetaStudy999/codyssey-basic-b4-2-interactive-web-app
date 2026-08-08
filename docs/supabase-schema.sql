create extension if not exists pgcrypto;

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) > 0),
  content text not null check (char_length(trim(content)) > 0),
  category text not null default 'Other',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- B4-2 학습용 익명 CRUD 구성. 운영 서비스에서는 반드시 인증/RLS 정책을 설계한다.
alter table public.notes disable row level security;
