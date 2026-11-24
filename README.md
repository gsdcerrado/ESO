# EAD Militar — Instrução de Manutenção e Segurança Operacional

Aplicação web estática (HTML + JS) com banco de dados no **Supabase** e hospedagem no **GitHub Pages**.

```
index.html              -> telas (aluno e coordenador)
js/config.js            -> ★ ÚNICO arquivo que você edita: chaves Supabase + conteúdo do curso
js/storage.js           -> camada de dados (Supabase ou localStorage)
js/app.js               -> lógica das telas
js/tailwind-config.js   -> cores do tema (verde-oliva / ocre)
supabase/schema.sql     -> tabela + segurança + funções (rodar 1x no Supabase)
```

## Testar localmente
Abra `index.html` (ou rode `python3 -m http.server` na pasta). Sem chaves em `js/config.js`
o sistema roda em **modo demonstração** (dados no navegador; senha do painel = `SENHA_COORDENADOR_LOCAL`).

## Publicar (resumo)
1. Supabase: criar projeto → rodar `supabase/schema.sql` → criar usuário coordenador.
2. Preencher `SUPABASE_URL`, `SUPABASE_ANON_KEY` e `EMAIL_COORDENADOR` em `js/config.js`.
3. Subir a pasta para um repositório GitHub.
4. GitHub → Settings → Pages → Deploy from branch → `main` / `(root)`.

Passo a passo detalhado: veja a resposta do assistente ou adapte esta lista.

## Observações de segurança
- A chave **anon** pode ser pública. **Nunca** use a `service_role` no código.
- O painel do coordenador usa login real do Supabase Auth; **desative o cadastro público** (Authentication → Sign In / Providers → desmarque "Allow new users to sign up").
- O aluno acessa pela matrícula (sem senha): quem souber a matrícula de outro militar consegue abrir o progresso dele.
- O gabarito está em `config.js` (visível a quem inspecionar o código). Para prova com valor oficial, o ideal é corrigir no servidor (Edge Function).
