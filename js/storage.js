/**
 * ============================================================================
 *  CAMADA DE DADOS (StorageService)
 * ============================================================================
 *  Todas as telas conversam SOMENTE com este objeto. Ele escolhe sozinho:
 *
 *   - MODO SUPABASE: se CONFIG_SUPABASE.SUPABASE_URL e SUPABASE_ANON_KEY
 *     estiverem preenchidos em js/config.js.
 *   - MODO LOCAL: caso contrário (localStorage do navegador + alunos de exemplo).
 *
 *  Todos os métodos são assíncronos (async/await) nos dois modos, então o
 *  restante do código não precisa saber qual está em uso.
 *
 *  Formato do registro usado pela aplicação (camelCase):
 *   { matricula, posto, nomeGuerra, nomeCompleto, secao,
 *     slidesVistos: {m1..m4: bool}, notas: {m1..m4: 0-5|null},
 *     dataConclusao: ISO-string | texto antigo | null }
 */

const STORAGE_KEY = "ead_militar_registros_v1";

const REGISTROS_EXEMPLO = [
  {
    matricula: "389412-0", posto: "2º Sgt", nomeGuerra: "ALMEIDA",
    nomeCompleto: "Marcos Vinícius Almeida Santos",
    secao: "Esquadrão de Segurança e Defesa",
    slidesVistos: { m1: true, m2: true, m3: true, m4: true },
    notas: { m1: 4, m2: 5, m3: 4, m4: 4 },
    dataConclusao: "22/11/2026 14:32"
  },
  {
    matricula: "405198-7", posto: "Cb", nomeGuerra: "FERREIRA",
    nomeCompleto: "Lucas Gabriel Ferreira Lima",
    secao: "Seção de Transporte e Viaturas",
    slidesVistos: { m1: true, m2: true, m3: true, m4: true },
    notas: { m1: 3, m2: 2, m3: 4, m4: 3 },
    dataConclusao: "23/11/2026 09:15"
  },
  {
    matricula: "421087-3", posto: "S1", nomeGuerra: "OLIVEIRA",
    nomeCompleto: "Rafael Henrique de Oliveira",
    secao: "Companhia de Guarda",
    slidesVistos: { m1: true, m2: true, m3: true, m4: true },
    notas: { m1: 2, m2: 1, m3: 3, m4: 2 },
    dataConclusao: "23/11/2026 16:40"
  },
  {
    matricula: "398741-5", posto: "3º Sgt", nomeGuerra: "COSTA",
    nomeCompleto: "Bruno Eduardo Costa Pereira",
    secao: "Seção de Material Bélico",
    slidesVistos: { m1: true, m2: true, m3: false, m4: false },
    notas: { m1: 5, m2: 4, m3: null, m4: null },
    dataConclusao: null
  }
];

/* Traduz erros comuns do Supabase para algo que dê para entender e corrigir */
function explicarErro(err) {
  const msg = String((err && (err.message || err.error_description)) || err || "");
  const cod = (err && err.code) || "";
  if (/SUPABASE_URL inválida/i.test(msg)) return msg;
  if (/invalid api key|apikey/i.test(msg)) return "Chave inválida: confira SUPABASE_ANON_KEY no config.js (copie a chave 'anon public' inteira, sem espaços).";
  if (/invalid login credentials/i.test(msg)) return "E-mail ou senha incorretos (confira EMAIL_COORDENADOR no config.js e a senha do usuário criado em Authentication > Users).";
  if (/email not confirmed/i.test(msg)) return "Usuário ainda não confirmado: no Supabase, em Authentication > Users, confirme o usuário (ou recrie marcando 'Auto Confirm User').";
  if (cod === "PGRST202" || /could not find the function|schema cache/i.test(msg)) return "As funções do banco não existem: rode o arquivo supabase/schema.sql no SQL Editor do Supabase.";
  if (cod === "42P01" || /relation .* does not exist/i.test(msg)) return "A tabela 'registros' não existe: rode o arquivo supabase/schema.sql no SQL Editor do Supabase.";
  if (/failed to fetch|networkerror|load failed/i.test(msg)) return "Não foi possível alcançar o Supabase: confira SUPABASE_URL e a conexão. Projetos gratuitos pausados também geram esse erro (veja o painel do Supabase).";
  return msg || "erro desconhecido";
}

const normMatricula = (m) => String(m || "").trim().toUpperCase();

/* ----------------------------------------------------------------------------
 *  Conversão  banco (snake_case)  <->  aplicação (camelCase)
 * -------------------------------------------------------------------------- */
function deBanco(row) {
  if (!row) return null;
  return {
    matricula: row.matricula,
    posto: row.posto,
    nomeGuerra: row.nome_guerra,
    nomeCompleto: row.nome_completo,
    secao: row.secao,
    slidesVistos: row.slides_vistos || { m1: false, m2: false, m3: false, m4: false },
    notas: row.notas || { m1: null, m2: null, m3: null, m4: null },
    dataConclusao: row.data_conclusao || null
  };
}

function paraBanco(reg) {
  return {
    matricula: normMatricula(reg.matricula),
    posto: reg.posto,
    nome_guerra: reg.nomeGuerra,
    nome_completo: reg.nomeCompleto,
    secao: reg.secao,
    slides_vistos: reg.slidesVistos,
    notas: reg.notas,
    data_conclusao: reg.dataConclusao || null
  };
}

/* ----------------------------------------------------------------------------
 *  IMPLEMENTAÇÃO LOCAL (localStorage)
 * -------------------------------------------------------------------------- */
const LocalBackend = {
  nome: "local",

  async init() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(REGISTROS_EXEMPLO));
    }
  },

  _ler() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch (e) { return []; }
  },

  async getAll() { return this._ler(); },

  async findByMatricula(matricula) {
    const norm = normMatricula(matricula);
    return this._ler().find(r => normMatricula(r.matricula) === norm) || null;
  },

  async upsert(registro) {
    const lista = this._ler();
    const norm = normMatricula(registro.matricula);
    const idx = lista.findIndex(r => normMatricula(r.matricula) === norm);
    if (idx >= 0) lista[idx] = registro; else lista.unshift(registro);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
    return registro;
  },

  // --- Coordenação (modo demonstração: senha definida em config.js) ---
  _coordOk: false,
  async coordSessaoAtiva() { return this._coordOk; },
  async coordLogin(senha) {
    this._coordOk = senha === CONFIG_SUPABASE.SENHA_COORDENADOR_LOCAL;
    return this._coordOk ? { ok: true } : { ok: false, erro: "Senha incorreta. Tente novamente." };
  },
  async coordLogout() { this._coordOk = false; },
  urlPdf() { return ""; }
};

/* ----------------------------------------------------------------------------
 *  IMPLEMENTAÇÃO SUPABASE
 *   - Aluno (sem login): usa funções RPC "aluno_obter" e "aluno_salvar".
 *   - Coordenador: login real (Supabase Auth) + leitura da tabela "registros".
 *  As regras de segurança ficam no banco (supabase/schema.sql).
 * -------------------------------------------------------------------------- */
const SupabaseBackend = {
  nome: "supabase",
  client: null,

  // Cria a conexão (síncrono). Se a configuração estiver errada, lança um erro claro.
  _iniciar() {
    const url = String(CONFIG_SUPABASE.SUPABASE_URL || "").trim().replace(/\/+$/, "");
    const chave = String(CONFIG_SUPABASE.SUPABASE_ANON_KEY || "").trim();
    if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url)) {
      throw new Error("SUPABASE_URL inválida. Use só o endereço do projeto, ex.: https://abcdefgh.supabase.co (sem /rest/v1 e sem /dashboard).");
    }
    if (!chave) throw new Error("SUPABASE_ANON_KEY está vazia no config.js.");
    this.client = window.supabase.createClient(url, chave);
  },

  async init() { this._iniciar(); },

  // Sempre devolve uma conexão pronta (cria na hora se ainda não existir)
  get c() {
    if (!this.client) this._iniciar();
    return this.client;
  },

  // Link público de um PDF guardado no bucket (Storage) do Supabase
  urlPdf(nomeArquivo) {
    const { data } = this.c.storage
      .from(CONFIG_SUPABASE.BUCKET_PDFS)
      .getPublicUrl(nomeArquivo);
    return data.publicUrl;
  },

  async getAll() {
    const { data, error } = await this.c
      .from("registros")
      .select("*")
      .order("atualizado_em", { ascending: false });
    if (error) throw error;
    return data.map(deBanco);
  },

  async findByMatricula(matricula) {
    const { data, error } = await this.c.rpc("aluno_obter", {
      p_matricula: normMatricula(matricula)
    });
    if (error) throw error;
    return deBanco(data);
  },

  async upsert(registro) {
    const { data, error } = await this.c.rpc("aluno_salvar", {
      p_registro: paraBanco(registro)
    });
    if (error) throw error;
    return deBanco(data);
  },

  async coordSessaoAtiva() {
    const { data } = await this.c.auth.getSession();
    return Boolean(data && data.session);
  },

  async coordLogin(senha) {
    if (!CONFIG_SUPABASE.EMAIL_COORDENADOR) {
      return { ok: false, erro: "EMAIL_COORDENADOR não configurado em js/config.js." };
    }
    const { error } = await this.c.auth.signInWithPassword({
      email: CONFIG_SUPABASE.EMAIL_COORDENADOR.trim(),
      password: senha
    });
    return error ? { ok: false, erro: explicarErro(error) } : { ok: true };
  },

  async coordLogout() { await this.c.auth.signOut(); }
};

/* ----------------------------------------------------------------------------
 *  Escolha automática do backend
 * -------------------------------------------------------------------------- */
const USAR_SUPABASE = Boolean(
  CONFIG_SUPABASE.SUPABASE_URL &&
  CONFIG_SUPABASE.SUPABASE_ANON_KEY &&
  window.supabase
);

const StorageService = USAR_SUPABASE ? SupabaseBackend : LocalBackend;
