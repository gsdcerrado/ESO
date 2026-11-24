/**
 * ============================================================================
 *  CONFIGURAÇÃO DO PROJETO  (único arquivo que você precisa editar)
 * ============================================================================
 *
 *  1) CONFIG_SUPABASE  -> conexão com o banco de dados (veja o README.md)
 *  2) CONFIG_CURSO     -> módulos, slides, PDFs e questões das provas
 *
 *  Se SUPABASE_URL / SUPABASE_ANON_KEY ficarem vazios, o sistema roda em
 *  MODO LOCAL (dados só no navegador, com alunos de exemplo) - ótimo para testar.
 *
 *  A chave "anon" do Supabase PODE ficar pública: quem protege os dados é o
 *  RLS configurado em supabase/schema.sql. NUNCA coloque a chave "service_role" aqui.
 */
const CONFIG_SUPABASE = {
  SUPABASE_URL: "https://albkvtgzsaojrtsyszfi.supabase.co/rest/v1/",       // ex.: "https://abcdefghijk.supabase.co"
  SUPABASE_ANON_KEY: "sb_publishable_-5quMxP8JMitdoZDq49P3w_4fSkr6uO",  // ex.: "eyJhbGciOi..."  (Project Settings > API > anon public)

  // E-mail do usuário coordenador criado em Authentication > Users no Supabase.
  // O painel pede apenas a senha desse usuário.
  EMAIL_COORDENADOR: "gsdcerrado@gmail.com",  // ex.: "coordenacao@seudominio.com"

  // Usada SOMENTE no modo local (sem Supabase), para demonstração.
  SENHA_COORDENADOR_LOCAL: "CerradoBrasil"
};

const CONFIG_CURSO = {
  tituloCurso: "Instrução de Manutenção e Segurança Operacional",
  subtituloUnidade: "Plataforma de Ensino Remoto • Seção de Instrução e Doutrina",
  notaMinimaGlobalPercentual: 50, // Mínimo de 50% no aproveitamento geral (10 de 20 questões)
  modulos: [
    {
      id: "m1",
      numero: 1,
      titulo: "Uso Proporcional da Força e Mentalidade de Segurança",
      descricao: "Doutrina de emprego escalonado, legalidade, necessidade, proporcionalidade e postura preventiva de serviço.",
      pdfUrl: "https://albkvtgzsaojrtsyszfi.supabase.co/storage/v1/object/sign/ESO%20II_26/Modulo1.pdf?token=eyJraWQiOiJkZDcwZTk5NS1iNDkwLTQxNjItODYyNy1hYTQ5MTA4YjgwMzgiLCJhbGciOiJFUzI1NiJ9.eyJ1cmwiOiJFU08gSUlfMjYvTW9kdWxvMS5wZGYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzk1NTM4MjQwLCJleHAiOjE4ODE5MzgyNDB9.yVzFRgrhJ3aDnmo4Itkrv51OFIVPE_svKGZdcE8grxMpZB0G5eQVHn5RJmCfoNKij4j8tLBUb43VAeaK2rJUyg", // Exemplo: "https://seu-projeto.supabase.co/storage/v1/object/public/slides/modulo1.pdf", // Exemplo: "https://seu-projeto.supabase.co/storage/v1/object/public/slides/modulo1.pdf"
      questoes: [
        {
          pergunta: "Qual princípio determina que o nível de força empregado pelo militar deve ser compatível com a gravidade da ameaça enfrentada?",
          alternativas: [
            "Princípio da Celeridade",
            "Princípio da Proporcionalidade",
            "Princípio da Hierarquia Absoluta",
            "Princípio da Impessoalidade"
          ],
          correta: 1
        },
        {
          pergunta: "No escalonamento do uso da força, qual recurso antecede o emprego de técnicas de controle físico ou instrumentos de menor potencial ofensivo?",
          alternativas: [
            "Disparo de advertência",
            "Uso imediato de algemas",
            "Presença ostensiva e verbalização clara",
            "Isolamento perimetral externo"
          ],
          correta: 2
        },
        {
          pergunta: "Sobre a mentalidade de segurança durante o serviço de escala, é correto afirmar que o militar deve:",
          alternativas: [
            "Permanecer em estado de relaxamento total em postos internos",
            "Manter consciência situacional constante e atenção às mãos de pessoas abordadas",
            "Confiar exclusivamente no monitoramento eletrônico da guarda",
            "Desativar travas de segurança do equipamento durante rondas rotineiras"
          ],
          correta: 1
        },
        {
          pergunta: "O emprego de arma de fogo somente é legítimo em situações extremas de:",
          alternativas: [
            "Desobediência verbal simples sem risco físico",
            "Fuga de indivíduo desarmado que não oferece risco à vida",
            "Legítima defesa própria ou de terceiros contra perigo atual ou iminente de morte ou lesão grave",
            "Perturbação sonora nas imediações da organização militar"
          ],
          correta: 2
        },
        {
          pergunta: "A manutenção da mentalidade de segurança após uma ocorrência exige:",
          alternativas: [
            "Inspeção imediata do equipamento, conferência de munições e relato fiel dos fatos",
            "Dispensa do registro em livro de partes se não houver disparo",
            "Guarda do armamento sem verificação de integridade",
            "Substituição automática de toda a equipe de serviço"
          ],
          correta: 0
        }
      ]
    },
    {
      id: "m2",
      numero: 2,
      titulo: "Controle de Acesso, Pedestres e Veículos",
      descricao: "Procedimentos de identificação, triagem em portões e corpos da guarda, revista veicular e controle de visitantes.",
      pdfUrl: "https://albkvtgzsaojrtsyszfi.supabase.co/storage/v1/object/sign/ESO%20II_26/Modulo2.pdf?token=eyJraWQiOiJkZDcwZTk5NS1iNDkwLTQxNjItODYyNy1hYTQ5MTA4YjgwMzgiLCJhbGciOiJFUzI1NiJ9.eyJ1cmwiOiJFU08gSUlfMjYvTW9kdWxvMi5wZGYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzk1NTM4MzI4LCJleHAiOjE4ODE5MzgzMjh9.XuotILUJqgTa1Ww_289BBBNs5erTiAeaccWOkuwd0Oxf7wt6kxRvPs-QfoRXEWt5Hm6t5_ywZZt7PW5H714dNg",
      questoes: [
        {
          pergunta: "Qual é a primeira medida obrigatória antes de autorizar a entrada de um visitante civil na Organização Militar?",
          alternativas: [
            "Liberar o acesso mediante palavra verbal de conhecimento",
            "Exigir documento de identificação oficial com foto, registrar a entrada e fornecer crachá visível",
            "Permitir circulação livre até que o setor de destino o localize",
            "Reter o aparelho celular e liberar sem registro"
          ],
          correta: 1
        },
        {
          pergunta: "Durante o controle noturno de veículos no portão principal, o procedimento padrão inclui:",
          alternativas: [
            "Manter os faróis altos do veículo ligados para iluminar a guarita",
            "Solicitar a redução dos faróis, abertura dos vidros e identificação de todos os ocupantes",
            "Dispensar conferência de ocupantes traseiros em veículos particulares",
            "Realizar a abordagem posicionando-se diretamente à frente do para-choque"
          ],
          correta: 1
        },
        {
          pergunta: "Para inspeção de veículos de entrega ou sem credenciamento permanente, qual item deve ser verificado com atenção?",
          alternativas: [
            "Apenas o documento do condutor",
            "Compartimento de carga, porta-malas e parte inferior do chassi (com espelho de inspeção)",
            "Exclusivamente o nível de combustível do veículo",
            "Somente a placa dianteira do automóvel"
          ],
          correta: 1
        },
        {
          pergunta: "O uso do crachá de identificação por visitantes e prestadores de serviço deve ocorrer:",
          alternativas: [
            "Apenas no momento da entrada na guarita",
            "Guardado no bolso para evitar extravio",
            "Em local visível na parte superior do tronco durante toda a permanência na unidade",
            "Somente quando solicitado por oficial de dia"
          ],
          correta: 2
        },
        {
          pergunta: "Ao detectar um objeto proibido ou suspeito na bagagem de um visitante durante a triagem, a equipe de guarda deve:",
          alternativas: [
            "Ignorar caso o visitante alegue esquecimento",
            "Impedir o ingresso, manter distância segura, acionar o Comandante da Guarda/Oficial de Dia e seguir o protocolo de segurança",
            "Confiscar o objeto sem registro e liberar o visitante",
            "Abrir imediatamente o volume sem equipamento ou supervisão"
          ],
          correta: 1
        }
      ]
    },
    {
      id: "m3",
      numero: 3,
      titulo: "Comunicação Rádio e Uso de Viaturas Operacionais",
      descricao: "Disciplina de rede rádio, código Q, alfabeto fonético, inspeção de 1º escalão em viaturas e direção defensiva.",
      pdfUrl: "",
      slidesResumo: [
        {
          titulo: "1. Disciplina na Rede Rádio e Código Q",
          topicos: [
            "Mensagens curtas, objetivas e impessoais; escutar antes de transmitir para não cortar comunicações prioritárias.",
            "Uso padronizado do Alfabeto Fonético Internacional e Códigos Q essenciais (QAP, QSL, QTH, QTR, QTI, QRR).",
            "Cuidados com a bateria, antena e sigilo operacional (evitar nomes completos ou detalhes sensíveis em canal aberto)."
          ]
        },
        {
          titulo: "2. Manutenção Preventiva de 1º Escalão em Viaturas",
          topicos: [
            "Checklist obrigatório antes de assumir a viatura: níveis de óleo, líquido de arrefecimento, freios e calibragem dos pneus.",
            "Verificação do sistema elétrico, sinalizadores luminosos (giroflex), sirene, limpadores e equipamentos obrigatórios (estepe, macaco, extintor).",
            "Registro imediato de qualquer avaria ou alteração na Ficha de Controle de Viatura."
          ]
        },
        {
          titulo: "3. Condução Segura de Viaturas Operacionais",
          topicos: [
            "Respeito às normas do Código de Trânsito Brasileiro; sinais sonoros e luminosos não isentam o motorista do dever de cautela.",
            "Uso obrigatório do cinto de segurança por todos os ocupantes da viatura.",
            "Manobra de marcha à ré sempre auxiliada pelo auxiliar/patrulheiro desembarcado em locais restritos."
          ]
        }
      ],
      questoes: [
        {
          pergunta: "Na comunicação rádio operacional, qual o significado correto dos códigos 'QTH' e 'QSL'?",
          alternativas: [
            "QTH = Localização / Endereço; QSL = Entendido / Confirmado",
            "QTH = Emergência médica; QSL = Aguardar na frequência",
            "QTH = Fim de transmissão; QSL = Solicito reforço imediato",
            "QTH = Abastecimento; QSL = Interferência na rede"
          ],
          correta: 0
        },
        {
          pergunta: "Antes de iniciar o deslocamento com uma viatura operacional, a manutenção de 1º escalão realizada pelo motorista exige verificar:",
          alternativas: [
            "Apenas se há combustível suficiente para o turno",
            "Níveis de óleo e água, calibragem dos pneus, luzes, freios, sinalizadores e itens obrigatórios",
            "Somente a limpeza interna da cabine",
            "Exclusivamente a pressão do pneu sobressalente"
          ],
          correta: 1
        },
        {
          pergunta: "Sobre a disciplina de rede rádio, qual conduta compromete a eficiência operacional?",
          alternativas: [
            "Pressionar o PTT, aguardar 1 segundo e falar com clareza",
            "Utilizar o alfabeto fonético para soletrar placas ou siglas",
            "Transmitir mensagens longas, usar gírias ou sobrepor outra estação já modulando",
            "Informar alteração de QTH à central de operações"
          ],
          correta: 2
        },
        {
          pergunta: "Em deslocamento de urgência com sinais luminosos e sonoros acionados, o condutor da viatura deve:",
          alternativas: [
            "Cruzar sinais vermelhos em alta velocidade sem reduzir",
            "Reduzir a velocidade nos cruzamentos, certificar-se de que os demais veículos cederam passagem e manter direção defensiva",
            "Dispensar o uso do cinto de segurança para agilizar o desembarque",
            "Trafegar na contramão sem visibilidade"
          ],
          correta: 1
        },
        {
          pergunta: "Ao realizar manobra de marcha à ré com viatura em pátios internos ou áreas de visibilidade reduzida, deve-se:",
          alternativas: [
            "Confiar apenas no retrovisor interno",
            "Desembarcar o auxiliar de viatura para balizar a manobra em ponto visível ao motorista",
            "Acelerar rapidamente para concluir a manobra",
            "Desligar os faróis para evitar reflexo"
          ],
          correta: 1
        }
      ]
    },
    {
      id: "m4",
      numero: 4,
      titulo: "Gerenciamento de Crises, Prevenção a Ataques Terroristas e Prevenção de Acidentes com Armamentos",
      descricao: "Contenção e isolamento em crises, identificação de ameaças explosivas/terroristas e as 4 regras de ouro do armamento.",
      pdfUrl: "",
      slidesResumo: [
        {
          titulo: "1. Primeiras Ações no Gerenciamento de Crises",
          topicos: [
            "Critérios de ação: Necessidade, Validade do Risco e Aceitabilidade.",
            "Primeiras medidas do primeiro interventor: Conter a ameaça, Isolar o perímetro e Solicitar apoio especializado (não negociar sem capacitação).",
            "Preservação de vidas como objetivo absoluto da operação."
          ]
        },
        {
          titulo: "2. Prevenção e Resposta a Ameaças Terroristas / Artefatos",
          topicos: [
            "Identificação de pacotes abandonados, veículos suspeitos ou comportamentos de reconhecimento hostil.",
            "Regra dos 4 'Nãos' diante de artefato suspeito: NÃO tocar, NÃO mover, NÃO abrir e NÃO usar rádio/celular próximo ao objeto.",
            "Evacuação ordenada e estabelecimento de perímetro de segurança amplo."
          ]
        },
        {
          titulo: "3. Prevenção de Acidentes com Armamentos (Regras de Ouro)",
          topicos: [
            "1ª Regra: Trate toda arma como se estivesse sempre carregada.",
            "2ª Regra: Nunca aponte o cano da arma para nada que não pretenda destruir.",
            "3ª Regra: Mantenha o dedo fora do gatilho até que o alvo esteja visado e haja decisão de disparo.",
            "4ª Regra: Tenha absoluta certeza do seu alvo e do que está atrás dele; realize inspeção física e visual da câmara na passagem de serviço."
          ]
        }
      ],
      questoes: [
        {
          pergunta: "Ao identificar um pacote abandonado e suspeito de conter artefato explosivo nas dependências da unidade, qual é a conduta imediata correta?",
          alternativas: [
            "Abrir cuidadosamente o pacote para confirmar o conteúdo",
            "Transportar o objeto para uma área aberta afastada",
            "Não tocar, não mover, evacuar a área, isolar o perímetro e acionar a equipe especializada (sem usar rádio próximo ao objeto)",
            "Jogar água sobre o pacote para neutralizar eventual circuito"
          ],
          correta: 2
        },
        {
          pergunta: "No gerenciamento de crises, quais são as três medidas imediatas do primeiro militar que chega ao local da ocorrência?",
          alternativas: [
            "Invadir o recinto, apreender objetos e liberar a imprensa",
            "Conter a crise, isolar o perímetro e solicitar apoio do escalão superior / equipe especializada",
            "Iniciar negociação tática avançada sozinho",
            "Aguardar o encerramento espontâneo sem intervir"
          ],
          correta: 1
        },
        {
          pergunta: "Qual das alternativas apresenta corretamente uma das Regras Fundamentais de Segurança no manuseio de armamentos?",
          alternativas: [
            "O dedo deve permanecer apoiado no gatilho sempre que a arma estiver fora do coldre",
            "Após retirar o carregador, a arma pode ser apontada livremente pois já está desmuniciada",
            "Trate toda arma como se estivesse carregada e mantenha o dedo fora do gatilho até o momento efetivo do disparo",
            "A conferência visual da câmara dispensa a verificação tátil em ambiente pouco iluminado"
          ],
          correta: 2
        },
        {
          pergunta: "Durante a passagem de serviço e recebimento de armamento na reserva/guarda, o militar deve:",
          alternativas: [
            "Apenas assinar a cautela confiando na conferência do militar anterior",
            "Executar o procedimento de inspeção de segurança em local apropriado (caixa de areia), retirando carregador e verificando câmara aberta",
            "Acionar o gatilho para testar o percussor antes de retirar o carregador",
            "Realizar a limpeza com munição próxima à bancada"
          ],
          correta: 1
        },
        {
          pergunta: "Na prevenção a ataques terroristas e sabotagem em instalações militares, considera-se indicador de alerta:",
          alternativas: [
            "Indivíduos fotografando pontos sensíveis, cercas, guaritas ou rotinas de troca de guarda sem autorização",
            "Militares fardados realizando inspeção de rotina no perímetro",
            "Viaturas oficiais devidamente identificadas em deslocamento programado",
            "Manutenção agendada de iluminação perimetral"
          ],
          correta: 0
        }
      ]
    }
  ]
};
