/**
 * ============================================================================
 *  LÓGICA DA APLICAÇÃO (telas do aluno e do coordenador)
 * ============================================================================
 *  Persistência: sempre via StorageService (js/storage.js).
 *  Conteúdo do curso: CONFIG_CURSO (js/config.js).
 */
const SESSION_KEY = "ead_militar_sessao_ativa_v1";

// Estado global da UI
let alunoAtual = null;
let moduloSlideAbertoId = null;
let slideIndexAtual = 0;
let moduloProvaAbertoId = null;
let filtroCoordAtual = "TODOS";
let coordAutenticado = false;
let registrosCoord = []; // cópia local dos registros para filtrar/buscar sem nova consulta

// Inicialização ao carregar página
document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("header-course-title").textContent = CONFIG_CURSO.tituloCurso;

  try {
    await StorageService.init();

    if (StorageService.nome === "local") {
      showToast("Modo demonstração: dados salvos apenas neste navegador. Configure o Supabase em js/config.js.", "warning");
    }

    // Retoma sessão do aluno, se houver
    const matriculaSalva = localStorage.getItem(SESSION_KEY);
    if (matriculaSalva) {
      const reg = await StorageService.findByMatricula(matriculaSalva);
      if (reg) {
        alunoAtual = reg;
        renderPortalAluno();
      }
    }

    // Retoma sessão do coordenador (Supabase mantém o login após F5)
    if (await StorageService.coordSessaoAtiva()) {
      coordAutenticado = true;
      mostrarDashboardCoord();
    }
  } catch (err) {
    tratarErro(err, "Não foi possível conectar ao banco de dados.");
  }
});

// Tratamento padrão de erros de rede/banco
function tratarErro(err, mensagem) {
  console.error(err);
  showToast(mensagem || "Ocorreu um erro. Tente novamente.", "error");
}

// Escapa texto digitado pelo usuário antes de colocar em innerHTML (evita injeção de HTML/XSS)
function esc(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

// Aceita data ISO (Supabase) ou texto antigo "dd/mm/aaaa hh:mm" e devolve texto legível
function fmtData(valor) {
  if (!valor) return "";
  if (!/^\d{4}-\d{2}-\d{2}T/.test(valor)) return valor;
  const d = new Date(valor);
  const pad = n => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// Notificação Toast amigável (sem alert)
function showToast(mensagem, tipo = "info") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  const cores = {
    success: "bg-emerald-900 border-emerald-600 text-white",
    error: "bg-rose-900 border-rose-600 text-white",
    warning: "bg-amber-900 border-amber-500 text-white",
    info: "bg-olive-900 border-ochre-500 text-white"
  };
  toast.className = `pointer-events-auto rounded-lg border-l-4 px-4 py-3 shadow-lg text-xs sm:text-sm font-medium transition-all duration-300 ${cores[tipo] || cores.info}`;
  toast.textContent = mensagem;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }, 3600);
}

// Alternar entre Portal do Aluno e Painel do Coordenador
function switchView(view) {
  const viewAluno = document.getElementById("view-aluno");
  const viewCoord = document.getElementById("view-coordenador");
  const btnAluno = document.getElementById("btn-nav-aluno");
  const btnCoord = document.getElementById("btn-nav-coord");

  if (view === "aluno") {
    viewAluno.classList.remove("hidden");
    viewCoord.classList.add("hidden");
    btnAluno.className = "px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 bg-ochre-500 text-olive-950 shadow-sm cursor-pointer";
    btnCoord.className = "px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 text-olive-200 hover:text-white cursor-pointer";
  } else {
    viewAluno.classList.add("hidden");
    viewCoord.classList.remove("hidden");
    btnCoord.className = "px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 bg-ochre-500 text-olive-950 shadow-sm cursor-pointer";
    btnAluno.className = "px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 text-olive-200 hover:text-white cursor-pointer";
    if (coordAutenticado) {
      renderPainelCoordenador();
    }
  }
}

// =========================================================================
// FLUXO DO PORTAL DO ALUNO
// =========================================================================
async function handleAlunoLogin(event) {
  event.preventDefault();
  const posto = document.getElementById("campo-posto").value.trim();
  const nomeGuerra = document.getElementById("campo-guerra").value.trim().toUpperCase();
  const nomeCompleto = document.getElementById("campo-nome").value.trim();
  const matricula = document.getElementById("campo-matricula").value.trim().toUpperCase();
  const secao = document.getElementById("campo-secao").value.trim();

  if (!posto || !nomeGuerra || !nomeCompleto || !matricula || !secao) {
    showToast("Preencha todos os campos obrigatórios.", "warning");
    return;
  }

  let existente;
  try {
    existente = await StorageService.findByMatricula(matricula);
  } catch (err) {
    return tratarErro(err, "Falha ao consultar o banco de dados. Verifique sua conexão.");
  }
  if (existente) {
    // Atualiza dados cadastrais mantendo progresso existente
    existente.posto = posto;
    existente.nomeGuerra = nomeGuerra;
    existente.nomeCompleto = nomeCompleto;
    existente.secao = secao;
    alunoAtual = existente;
    showToast(`Bem-vindo de volta, ${posto} ${nomeGuerra}! Progresso carregado.`, "success");
  } else {
    alunoAtual = {
      matricula,
      posto,
      nomeGuerra,
      nomeCompleto,
      secao,
      slidesVistos: { m1: false, m2: false, m3: false, m4: false },
      notas: { m1: null, m2: null, m3: null, m4: null },
      dataConclusao: null
    };
    showToast(`Identificação registrada. Bons estudos, ${posto} ${nomeGuerra}!`, "success");
  }

  try {
    await StorageService.upsert(alunoAtual);
  } catch (err) {
    alunoAtual = null;
    return tratarErro(err, "Não foi possível salvar sua identificação. Tente novamente.");
  }
  localStorage.setItem(SESSION_KEY, alunoAtual.matricula);
  renderPortalAluno();
}

function logoutAluno() {
  alunoAtual = null;
  localStorage.removeItem(SESSION_KEY);
  document.getElementById("aluno-dashboard-box").classList.add("hidden");
  document.getElementById("aluno-login-box").classList.remove("hidden");
  document.getElementById("form-identificacao").reset();
}

function calcularEstatisticasAluno(reg) {
  const ids = ["m1", "m2", "m3", "m4"];
  const slidesCount = ids.filter(id => reg.slidesVistos[id]).length;
  const concluidosCount = ids.filter(id => reg.notas[id] !== null && reg.notas[id] !== undefined).length;
  const totalAcertos = ids.reduce((acc, id) => acc + (typeof reg.notas[id] === "number" ? reg.notas[id] : 0), 0);
  const totalQuestoes = CONFIG_CURSO.modulos.length * 5; // 20 questões
  const percentual = Math.round((totalAcertos / totalQuestoes) * 100);

  let situacao = "EM ANDAMENTO";
  if (concluidosCount === 4) {
    situacao = percentual >= CONFIG_CURSO.notaMinimaGlobalPercentual ? "APROVADO" : "REPROVADO";
  }

  return {
    slidesCount,
    concluidosCount,
    totalAcertos,
    totalQuestoes,
    percentual,
    situacao
  };
}

function renderPortalAluno() {
  if (!alunoAtual) return;

  document.getElementById("aluno-login-box").classList.add("hidden");
  document.getElementById("aluno-dashboard-box").classList.remove("hidden");

  document.getElementById("titulo-militar-ativo").textContent = `${alunoAtual.posto} ${alunoAtual.nomeGuerra}`;
  document.getElementById("subtitulo-militar-ativo").textContent = `${alunoAtual.nomeCompleto} • ${alunoAtual.secao}`;
  document.getElementById("badge-matricula-ativa").textContent = `SARAM/Matrícula: ${alunoAtual.matricula}`;

  const stats = calcularEstatisticasAluno(alunoAtual);
  document.getElementById("texto-progresso-modulos").textContent = `${stats.concluidosCount}/4 Módulos`;
  document.getElementById("barra-progresso-modulos").style.width = `${(stats.concluidosCount / 4) * 100}%`;

  // Renderizar Resultado Final se os 4 módulos estiverem concluídos
  const cardResultado = document.getElementById("card-resultado-final");
  if (stats.concluidosCount === 4) {
    const aprovado = stats.situacao === "APROVADO";
    const codigoAutenticacao = `CERT-${alunoAtual.matricula.replace(/[^A-Z0-9]/g, "")}-${stats.totalAcertos}20`;

    cardResultado.classList.remove("hidden");
    cardResultado.innerHTML = `
      <div id="print-certificate-area" class="rounded-xl border-2 ${aprovado ? 'border-emerald-600 bg-emerald-50/70' : 'border-rose-600 bg-rose-50/70'} p-6 shadow-sm">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-2">
            <div class="flex items-center gap-2.5">
              <span class="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${aprovado ? 'bg-emerald-700 text-white' : 'bg-rose-700 text-white'}">
                ${stats.situacao}
              </span>
              <span class="text-xs font-mono text-stone-600">
                Concluído em: ${fmtData(alunoAtual.dataConclusao) || '-'}
              </span>
            </div>
            <h3 class="text-xl sm:text-2xl font-extrabold ${aprovado ? 'text-emerald-950' : 'text-rose-950'}">
              Aproveitamento Global: ${stats.percentual}% (${stats.totalAcertos} de ${stats.totalQuestoes} questões)
            </h3>
            <p class="text-xs sm:text-sm ${aprovado ? 'text-emerald-900' : 'text-rose-900'} max-w-2xl">
              ${aprovado
                ? `Parabéns, ${esc(alunoAtual.posto)} ${esc(alunoAtual.nomeGuerra)}! Você atingiu o índice mínimo exigido (50%) e está apto para publicação de conclusão do curso.`
                : `Atenção, ${esc(alunoAtual.posto)} ${esc(alunoAtual.nomeGuerra)}. Seu aproveitamento ficou abaixo do mínimo de 50% (10 acertos). Revise os slides e realize uma nova tentativa.`
              }
            </p>
            ${aprovado ? `<p class="text-[11px] font-mono text-emerald-800 pt-1">Código de Autenticação: <strong>${codigoAutenticacao}</strong></p>` : ''}
          </div>

          <div class="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 no-print">
            ${aprovado ? `
              <button onclick="window.print()"
                class="px-5 py-3 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm flex items-center justify-center gap-2 cursor-pointer">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Imprimir Comprovante
              </button>
            ` : `
              <button onclick="reiniciarCursoAluno()"
                class="px-5 py-3 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-xs sm:text-sm font-bold shadow-sm flex items-center justify-center gap-2 cursor-pointer">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refazer Curso (Nova Tentativa)
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  } else {
    cardResultado.classList.add("hidden");
    cardResultado.innerHTML = "";
  }

  // Renderizar Grid dos 4 Módulos
  const grid = document.getElementById("grid-modulos");
  grid.innerHTML = CONFIG_CURSO.modulos.map(mod => {
    const slideVisto = Boolean(alunoAtual.slidesVistos[mod.id]);
    const notaModulo = alunoAtual.notas[mod.id];
    const provaConcluida = typeof notaModulo === "number";

    let statusBadge = `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-600 border border-stone-200">1. Pendente Leitura</span>`;
    if (provaConcluida) {
      statusBadge = `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Concluído • ${notaModulo}/5 acertos</span>`;
    } else if (slideVisto) {
      statusBadge = `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-ochre-100 text-ochre-800 border border-ochre-200">2. Slide Visualizado • Prova Liberada</span>`;
    }

    return `
      <div class="bg-white rounded-xl border ${provaConcluida ? 'border-emerald-300' : 'border-stone-200'} p-5 shadow-sm flex flex-col justify-between gap-5">
        <div class="space-y-2.5">
          <div class="flex items-center justify-between gap-2">
            <span class="text-xs font-extrabold uppercase tracking-wider text-olive-700">
              Matéria 0${mod.numero}
            </span>
            ${statusBadge}
          </div>
          <h4 class="text-base font-bold text-stone-900 leading-snug">
            ${mod.titulo}
          </h4>
          <p class="text-xs text-stone-600 leading-relaxed">
            ${mod.descricao}
          </p>
        </div>

        <div class="pt-3 border-t border-stone-100 flex flex-col sm:flex-row gap-2.5">
          <!-- Botão Abrir Slides -->
          <button onclick="abrirModalSlides('${mod.id}')"
            class="flex-1 px-3.5 py-2.5 rounded-lg border ${slideVisto ? 'border-olive-300 bg-olive-50 text-olive-900' : 'border-ochre-500 bg-ochre-500 text-olive-950 font-bold'} hover:opacity-90 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            ${slideVisto ? 'Rever Apresentação' : 'Abrir Apresentação / Slides'}
          </button>

          <!-- Botão Avaliação (Bloqueado até abrir slides) -->
          <button onclick="abrirModalProva('${mod.id}')" ${!slideVisto ? 'disabled' : ''}
            title="${!slideVisto ? 'Abra e confirme a leitura dos slides primeiro' : 'Iniciar avaliação de 5 questões'}"
            class="flex-1 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5
            ${!slideVisto
              ? 'bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed'
              : provaConcluida
                ? 'bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer'
                : 'bg-olive-800 hover:bg-olive-700 text-white shadow-sm cursor-pointer'
            }">
            ${!slideVisto ? `
              <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Bloqueado (Leia o Slide)
            ` : provaConcluida ? `
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Nota: ${notaModulo}/5 (Refazer)
            ` : `
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Iniciar Avaliação (5 Questões)
            `}
          </button>
        </div>
      </div>
    `;
  }).join("");
}

async function reiniciarCursoAluno() {
  if (!alunoAtual) return;
  alunoAtual.notas = { m1: null, m2: null, m3: null, m4: null };
  alunoAtual.dataConclusao = null;
  try { await StorageService.upsert(alunoAtual); }
  catch (err) { return tratarErro(err, "Não foi possível salvar. Tente novamente."); }
  renderPortalAluno();
  showToast("Avaliações zeradas para nova tentativa. Seus slides permanecem liberados.", "info");
}

// =========================================================================
// MODAL DE SLIDES / PDF
// =========================================================================
function abrirModalSlides(moduloId) {
  const mod = CONFIG_CURSO.modulos.find(m => m.id === moduloId);
  if (!mod) return;

  moduloSlideAbertoId = moduloId;
  slideIndexAtual = 0;

  document.getElementById("modal-slide-badge").textContent = `Matéria 0${mod.numero} • Material Didático`;
  document.getElementById("modal-slide-titulo").textContent = mod.titulo;
  document.getElementById("modal-slides").classList.remove("hidden");

  renderConteudoSlide();
}

function fecharModalSlides() {
  document.getElementById("modal-slides").classList.add("hidden");
  moduloSlideAbertoId = null;
}

function navegarSlide(delta) {
  const mod = CONFIG_CURSO.modulos.find(m => m.id === moduloSlideAbertoId);
  if (!mod) return;
  const total = mod.slidesResumo.length;
  slideIndexAtual = Math.max(0, Math.min(total - 1, slideIndexAtual + delta));
  renderConteudoSlide();
}

function renderConteudoSlide() {
  const mod = CONFIG_CURSO.modulos.find(m => m.id === moduloSlideAbertoId);
  if (!mod) return;

  const corpo = document.getElementById("modal-slide-corpo");
  const navControls = document.getElementById("slide-nav-controls");

  // Se o coordenador configurou um link de PDF real no CONFIG_CURSO, exibe o PDF embutido
  if (mod.pdfUrl && mod.pdfUrl.trim() !== "") {
    navControls.classList.add("hidden");
    corpo.innerHTML = `
      <div class="w-full h-[62vh] bg-white rounded-xl border border-stone-300 overflow-hidden flex flex-col">
        <iframe src="${mod.pdfUrl}" class="w-full flex-1" title="Apresentação ${mod.titulo}"></iframe>
        <div class="bg-stone-50 px-4 py-2 border-t border-stone-200 text-xs flex justify-between items-center">
          <span class="text-stone-600">Caso o PDF não carregue no navegador, abra em nova guia:</span>
          <a href="${mod.pdfUrl}" target="_blank" rel="noopener noreferrer" class="text-olive-800 font-bold underline">Abrir PDF Externo</a>
        </div>
      </div>
    `;
    return;
  }

  // Caso contrário, exibe o visualizador de slides interativos de instrução
  navControls.classList.remove("hidden");
  const total = mod.slidesResumo.length;
  const slide = mod.slidesResumo[slideIndexAtual];

  document.getElementById("indicador-slide-atual").textContent = `Slide ${slideIndexAtual + 1} de ${total}`;
  document.getElementById("btn-slide-prev").disabled = slideIndexAtual === 0;
  document.getElementById("btn-slide-next").disabled = slideIndexAtual === total - 1;

  corpo.innerHTML = `
    <div class="bg-white rounded-xl border border-stone-300 shadow-sm overflow-hidden min-h-[340px] flex flex-col justify-between">
      <div class="bg-olive-800 px-6 py-4 text-white flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-ochre-300">
          Apresentação Instrucional • Slide ${slideIndexAtual + 1}/${total}
        </span>
        <span class="text-[11px] bg-olive-950/60 px-2.5 py-0.5 rounded text-olive-200">
          ${mod.titulo}
        </span>
      </div>

      <div class="p-6 sm:p-8 flex-1 flex flex-col justify-center space-y-5">
        <h4 class="text-lg sm:text-xl font-extrabold text-olive-900 border-l-4 border-ochre-500 pl-3.5">
          ${slide.titulo}
        </h4>
        <ul class="space-y-3">
          ${slide.topicos.map(t => `
            <li class="flex items-start gap-3 text-sm sm:text-base text-stone-700 leading-relaxed">
              <span class="w-2 h-2 rounded-full bg-olive-700 mt-2 shrink-0"></span>
              <span>${t}</span>
            </li>
          `).join("")}
        </ul>
      </div>

      <div class="bg-stone-50 px-6 py-3 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
        <span>Seção de Instrução e Doutrina</span>
        <span>Navegue pelos slides e clique em "Confirmar Leitura" abaixo</span>
      </div>
    </div>
  `;
}

async function confirmarLeituraModulo() {
  if (!alunoAtual || !moduloSlideAbertoId) return;
  alunoAtual.slidesVistos[moduloSlideAbertoId] = true;
  try { await StorageService.upsert(alunoAtual); }
  catch (err) {
    alunoAtual.slidesVistos[moduloSlideAbertoId] = false;
    return tratarErro(err, "Não foi possível registrar a leitura. Tente novamente.");
  }

  const mod = CONFIG_CURSO.modulos.find(m => m.id === moduloSlideAbertoId);
  fecharModalSlides();
  renderPortalAluno();
  showToast(`Leitura confirmada! Avaliação de "${mod.titulo}" desbloqueada.`, "success");
}

// =========================================================================
// MODAL DE AVALIAÇÃO (5 QUESTÕES)
// =========================================================================
function abrirModalProva(moduloId) {
  if (!alunoAtual) return;
  if (!alunoAtual.slidesVistos[moduloId]) {
    showToast("Você precisa abrir e confirmar a leitura dos slides antes de fazer a avaliação.", "warning");
    return;
  }

  const mod = CONFIG_CURSO.modulos.find(m => m.id === moduloId);
  if (!mod) return;

  moduloProvaAbertoId = moduloId;
  document.getElementById("modal-prova-badge").textContent = `Avaliação da Matéria 0${mod.numero} • 5 Questões`;
  document.getElementById("modal-prova-titulo").textContent = mod.titulo;

  const form = document.getElementById("form-avaliacao-modulo");
  form.innerHTML = mod.questoes.map((q, qIdx) => `
    <div class="bg-white rounded-xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-3">
      <p class="text-sm font-bold text-stone-900 leading-snug">
        <span class="inline-block bg-olive-800 text-white text-xs px-2 py-0.5 rounded mr-1.5">Q${qIdx + 1}</span>
        ${q.pergunta}
      </p>
      <div class="space-y-2 pt-1">
        ${q.alternativas.map((alt, aIdx) => `
          <label class="flex items-start gap-3 p-3 rounded-lg border border-stone-200 hover:bg-olive-50/70 hover:border-olive-300 cursor-pointer transition-colors">
            <input type="radio" name="questao_${qIdx}" value="${aIdx}" required
              class="mt-0.5 text-olive-800 focus:ring-olive-700" />
            <span class="text-xs sm:text-sm text-stone-700">${alt}</span>
          </label>
        `).join("")}
      </div>
    </div>
  `).join("");

  document.getElementById("modal-prova").classList.remove("hidden");
}

function fecharModalProva() {
  document.getElementById("modal-prova").classList.add("hidden");
  moduloProvaAbertoId = null;
}

async function submeterAvaliacaoModulo(event) {
  event.preventDefault();
  if (!alunoAtual || !moduloProvaAbertoId) return;

  const mod = CONFIG_CURSO.modulos.find(m => m.id === moduloProvaAbertoId);
  if (!mod) return;

  const formData = new FormData(event.target);
  let acertos = 0;

  mod.questoes.forEach((q, qIdx) => {
    const resp = parseInt(formData.get(`questao_${qIdx}`), 10);
    if (resp === q.correta) {
      acertos++;
    }
  });

  const notaAnterior = alunoAtual.notas[moduloProvaAbertoId];
  const dataAnterior = alunoAtual.dataConclusao;
  alunoAtual.notas[moduloProvaAbertoId] = acertos;

  // Se todos os 4 módulos foram respondidos, grava data/hora de conclusão
  const stats = calcularEstatisticasAluno(alunoAtual);
  if (stats.concluidosCount === 4) {
    alunoAtual.dataConclusao = new Date().toISOString();
  }

  try { await StorageService.upsert(alunoAtual); }
  catch (err) {
    alunoAtual.notas[moduloProvaAbertoId] = notaAnterior;
    alunoAtual.dataConclusao = dataAnterior;
    return tratarErro(err, "Não foi possível salvar sua avaliação. Tente novamente.");
  }
  fecharModalProva();
  renderPortalAluno();

  showToast(`Avaliação registrada: você acertou ${acertos} de 5 questões nesta matéria.`, "success");
}

// =========================================================================
// PAINEL DO COORDENADOR
// =========================================================================
async function handleCoordLogin(event) {
  event.preventDefault();
  const senha = document.getElementById("campo-senha-coord").value;
  try {
    const res = await StorageService.coordLogin(senha);
    if (res.ok) {
      coordAutenticado = true;
      mostrarDashboardCoord();
      showToast("Acesso administrativo liberado.", "success");
    } else {
      showToast(res.erro, "error");
    }
  } catch (err) {
    tratarErro(err, "Falha ao autenticar. Verifique sua conexão.");
  }
}

function mostrarDashboardCoord() {
  document.getElementById("coord-auth-box").classList.add("hidden");
  document.getElementById("coord-dashboard-box").classList.remove("hidden");
  renderPainelCoordenador();
}

async function logoutCoord() {
  try { await StorageService.coordLogout(); } catch (err) { console.error(err); }
  coordAutenticado = false;
  registrosCoord = [];
  document.getElementById("campo-senha-coord").value = "";
  document.getElementById("coord-dashboard-box").classList.add("hidden");
  document.getElementById("coord-auth-box").classList.remove("hidden");
}

function setFiltroCoord(filtro) {
  filtroCoordAtual = filtro;
  document.querySelectorAll(".filtro-btn").forEach(btn => {
    btn.className = "filtro-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 text-stone-700 hover:bg-stone-200 cursor-pointer";
  });
  const ativo = document.getElementById(`filtro-${filtro}`);
  if (ativo) {
    ativo.className = "filtro-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-olive-800 text-white cursor-pointer";
  }
  renderTabelaCoord();
}

async function renderPainelCoordenador() {
  try {
    registrosCoord = await StorageService.getAll();
  } catch (err) {
    return tratarErro(err, "Não foi possível carregar os registros. Faça login novamente.");
  }
  const todos = registrosCoord;
  let aprovados = 0;
  let reprovados = 0;
  let andamento = 0;

  todos.forEach(reg => {
    const st = calcularEstatisticasAluno(reg);
    if (st.situacao === "APROVADO") aprovados++;
    else if (st.situacao === "REPROVADO") reprovados++;
    else andamento++;
  });

  document.getElementById("kpi-total").textContent = todos.length;
  document.getElementById("kpi-aprovados").textContent = aprovados;
  document.getElementById("kpi-reprovados").textContent = reprovados;
  document.getElementById("kpi-andamento").textContent = andamento;

  renderTabelaCoord();
}

function renderTabelaCoord() {
  const todos = registrosCoord;
  const termoBusca = (document.getElementById("busca-coord")?.value || "").trim().toLowerCase();
  const tbody = document.getElementById("tbody-coordenador");

  const filtrados = todos.filter(reg => {
    const st = calcularEstatisticasAluno(reg);
    const matchSituacao = filtroCoordAtual === "TODOS" || st.situacao === filtroCoordAtual;
    const textoRegistro = `${reg.posto} ${reg.nomeGuerra} ${reg.nomeCompleto} ${reg.matricula} ${reg.secao}`.toLowerCase();
    const matchBusca = !termoBusca || textoRegistro.includes(termoBusca);
    return matchSituacao && matchBusca;
  });

  if (filtrados.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="12" class="py-8 px-4 text-center text-sm text-stone-500">
          Nenhum registro encontrado para os filtros selecionados.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtrados.map(reg => {
    const st = calcularEstatisticasAluno(reg);
    const fmtNota = n => (typeof n === "number" ? `${n}/5` : "-");

    let badgeSituacao = `<span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-stone-100 text-stone-700 border border-stone-300">EM ANDAMENTO</span>`;
    if (st.situacao === "APROVADO") {
      badgeSituacao = `<span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">APROVADO</span>`;
    } else if (st.situacao === "REPROVADO") {
      badgeSituacao = `<span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-300">REPROVADO</span>`;
    }

    return `
      <tr class="hover:bg-stone-50 transition-colors">
        <td class="py-3 px-4 font-bold text-stone-900 whitespace-nowrap">${esc(reg.posto)}</td>
        <td class="py-3 px-4">
          <div class="font-bold text-olive-900">${esc(reg.nomeGuerra)}</div>
          <div class="text-xs text-stone-500">${esc(reg.nomeCompleto)}</div>
        </td>
        <td class="py-3 px-4">
          <div class="font-mono text-xs text-stone-800">${esc(reg.matricula)}</div>
          <div class="text-[11px] text-stone-500">${esc(reg.secao)}</div>
        </td>
        <td class="py-3 px-4 text-center font-semibold text-stone-700">${st.slidesCount}/4</td>
        <td class="py-3 px-4 text-center text-stone-700">${fmtNota(reg.notas.m1)}</td>
        <td class="py-3 px-4 text-center text-stone-700">${fmtNota(reg.notas.m2)}</td>
        <td class="py-3 px-4 text-center text-stone-700">${fmtNota(reg.notas.m3)}</td>
        <td class="py-3 px-4 text-center text-stone-700">${fmtNota(reg.notas.m4)}</td>
        <td class="py-3 px-4 text-center font-bold text-stone-900">${st.totalAcertos}/20</td>
        <td class="py-3 px-4 text-center font-extrabold ${st.situacao === 'APROVADO' ? 'text-emerald-700' : st.situacao === 'REPROVADO' ? 'text-rose-700' : 'text-stone-600'}">
          ${st.concluidosCount === 4 ? st.percentual + '%' : '-'}
        </td>
        <td class="py-3 px-4 text-center whitespace-nowrap">${badgeSituacao}</td>
        <td class="py-3 px-4 text-xs text-stone-500 whitespace-nowrap">${fmtData(reg.dataConclusao) || 'Em curso'}</td>
      </tr>
    `;
  }).join("");
}

// =========================================================================
// EXPORTAÇÃO CSV (EXCEL PT-BR) E LISTA PARA BOLETIM
// =========================================================================
function exportarCSV() {
  const todos = registrosCoord;
  const cabecalho = [
    "Posto/Grad",
    "Nome de Guerra",
    "Nome Completo",
    "SARAM/Matricula",
    "Esquadrao/Secao",
    "Slides Abertos",
    "M1 (0-5)",
    "M2 (0-5)",
    "M3 (0-5)",
    "M4 (0-5)",
    "Total Acertos (0-20)",
    "Aproveitamento (%)",
    "Situacao",
    "Data Conclusao"
  ];

  const linhas = todos.map(reg => {
    const st = calcularEstatisticasAluno(reg);
    return [
      reg.posto,
      reg.nomeGuerra,
      reg.nomeCompleto,
      reg.matricula,
      reg.secao,
      `${st.slidesCount}/4`,
      reg.notas.m1 ?? "",
      reg.notas.m2 ?? "",
      reg.notas.m3 ?? "",
      reg.notas.m4 ?? "",
      st.totalAcertos,
      st.concluidosCount === 4 ? `${st.percentual}%` : "Em andamento",
      st.situacao,
      fmtData(reg.dataConclusao)
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(";");
  });

  // BOM UTF-8 (\uFEFF) garante acentuação perfeita ao abrir direto no Microsoft Excel
  const csvContent = "\uFEFF" + [cabecalho.join(";"), ...linhas].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `relatorio-instrucao-militar-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast("Arquivo CSV exportado com sucesso!", "success");
}

function abrirModalBoletim() {
  const todos = registrosCoord;
  const aprovados = todos.filter(reg => calcularEstatisticasAluno(reg).situacao === "APROVADO");

  const dataHoje = new Date().toLocaleDateString("pt-BR");
  let texto = `PUBLICAÇÃO DE CONCLUSÃO DE INSTRUÇÃO REMOTA\n`;
  texto += `CURSO: ${CONFIG_CURSO.tituloCurso.toUpperCase()}\n`;
  texto += `DATA DE APURAÇÃO: ${dataHoje}\n`;
  texto += `CRITÉRIO: APROVEITAMENTO GERAL MÍNIMO DE 50% (10/20 QUESTÕES)\n`;
  texto += `--------------------------------------------------------------------\n\n`;

  if (aprovados.length === 0) {
    texto += `Nenhum militar concluiu com aproveitamento mínimo até o presente momento.\n`;
  } else {
    texto += `Concluíram com aproveitamento satisfatório (APROVADOS) os seguintes militares:\n\n`;
    aprovados.forEach((reg, idx) => {
      const st = calcularEstatisticasAluno(reg);
      texto += `${String(idx + 1).padStart(2, "0")}. ${reg.posto} ${reg.nomeCompleto} (${reg.nomeGuerra}) - SARAM/Matrícula: ${reg.matricula} - ${reg.secao} - Aproveitamento: ${st.percentual}% (${st.totalAcertos}/20) - Concluído em: ${fmtData(reg.dataConclusao)}\n`;
    });
  }

  document.getElementById("texto-boletim-gerado").value = texto;
  document.getElementById("modal-boletim").classList.remove("hidden");
}

function fecharModalBoletim() {
  document.getElementById("modal-boletim").classList.add("hidden");
}

function copiarTextoBoletim() {
  const textarea = document.getElementById("texto-boletim-gerado");
  textarea.select();
  textarea.setSelectionRange(0, 99999);
  document.execCommand("copy");
  showToast("Texto oficial copiado para a área de transferência!", "success");
}
