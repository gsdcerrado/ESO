-- ============================================================================
--  EAD MILITAR - ESTRUTURA DO BANCO (Supabase / PostgreSQL)
--  Como usar: Supabase > SQL Editor > New query > cole TUDO > Run.
--  Pode ser executado mais de uma vez sem quebrar nada.
-- ============================================================================

-- 1) TABELA ------------------------------------------------------------------
create table if not exists public.registros (
  matricula       text primary key,                       -- SARAM/Matrícula (maiúsculas)
  posto           text not null,
  nome_guerra     text not null,
  nome_completo   text not null,
  secao           text not null,
  slides_vistos   jsonb not null default '{"m1":false,"m2":false,"m3":false,"m4":false}',
  notas           jsonb not null default '{"m1":null,"m2":null,"m3":null,"m4":null}',
  data_conclusao  timestamptz,
  criado_em       timestamptz not null default now(),
  atualizado_em   timestamptz not null default now()
);

-- 2) SEGURANÇA (RLS) ---------------------------------------------------------
-- Com RLS ligado e SEM nenhuma policy para "anon", o público NÃO consegue
-- ler nem listar a tabela diretamente. Só o coordenador logado enxerga tudo.
alter table public.registros enable row level security;

drop policy if exists "coordenador le tudo"   on public.registros;
drop policy if exists "coordenador exclui"    on public.registros;

create policy "coordenador le tudo"
  on public.registros for select
  to authenticated using (true);

create policy "coordenador exclui"
  on public.registros for delete
  to authenticated using (true);

-- 3) FUNÇÕES USADAS PELOS ALUNOS (sem login) ---------------------------------
-- "security definer" = a função roda com permissão do dono, então o aluno só
-- consegue mexer no PRÓPRIO registro (informando a matrícula), nunca listar todos.

-- Auxiliar: converte nota para inteiro 0..5 (ou null)
create or replace function public._nota(p jsonb, k text)
returns int language sql immutable as $$
  select case
    when p->'notas'->>k is null then null
    else greatest(0, least(5, (p->'notas'->>k)::int))
  end
$$;

-- 3a) Buscar o registro de uma matrícula (retorna null se não existir)
create or replace function public.aluno_obter(p_matricula text)
returns jsonb
language sql
security definer
set search_path = public
as $$
  select to_jsonb(r)
  from public.registros r
  where r.matricula = upper(trim(p_matricula))
$$;

-- 3b) Criar/atualizar o registro do próprio aluno
create or replace function public.aluno_salvar(p_registro jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_matricula text := upper(trim(p_registro->>'matricula'));
  v_row public.registros;
begin
  -- validações básicas
  if v_matricula is null or length(v_matricula) not between 1 and 30 then
    raise exception 'Matrícula inválida';
  end if;
  if coalesce(length(trim(p_registro->>'posto')),0)         not between 1 and 30
  or coalesce(length(trim(p_registro->>'nome_guerra')),0)   not between 1 and 60
  or coalesce(length(trim(p_registro->>'nome_completo')),0) not between 1 and 120
  or coalesce(length(trim(p_registro->>'secao')),0)         not between 1 and 120 then
    raise exception 'Dados cadastrais inválidos';
  end if;

  insert into public.registros as r (
    matricula, posto, nome_guerra, nome_completo, secao,
    slides_vistos, notas, data_conclusao
  ) values (
    v_matricula,
    trim(p_registro->>'posto'),
    upper(trim(p_registro->>'nome_guerra')),
    trim(p_registro->>'nome_completo'),
    trim(p_registro->>'secao'),
    jsonb_build_object(
      'm1', coalesce((p_registro->'slides_vistos'->>'m1')::boolean, false),
      'm2', coalesce((p_registro->'slides_vistos'->>'m2')::boolean, false),
      'm3', coalesce((p_registro->'slides_vistos'->>'m3')::boolean, false),
      'm4', coalesce((p_registro->'slides_vistos'->>'m4')::boolean, false)
    ),
    jsonb_build_object(
      'm1', public._nota(p_registro,'m1'), 'm2', public._nota(p_registro,'m2'),
      'm3', public._nota(p_registro,'m3'), 'm4', public._nota(p_registro,'m4')
    ),
    nullif(p_registro->>'data_conclusao','')::timestamptz
  )
  on conflict (matricula) do update set
    posto          = excluded.posto,
    nome_guerra    = excluded.nome_guerra,
    nome_completo  = excluded.nome_completo,
    secao          = excluded.secao,
    slides_vistos  = excluded.slides_vistos,
    notas          = excluded.notas,
    data_conclusao = excluded.data_conclusao,
    atualizado_em  = now()
  returning * into v_row;

  return to_jsonb(v_row);
end;
$$;

-- 4) PERMISSÕES DE EXECUÇÃO --------------------------------------------------
revoke all on function public.aluno_obter(text)  from public;
revoke all on function public.aluno_salvar(jsonb) from public;
grant execute on function public.aluno_obter(text)   to anon, authenticated;
grant execute on function public.aluno_salvar(jsonb) to anon, authenticated;
grant execute on function public._nota(jsonb, text)  to anon, authenticated;
