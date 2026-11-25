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
  SUPABASE_URL: "https://albkvtgzsaojrtsyszfi.supabase.co",       // ex.: "https://abcdefghijk.supabase.co"
  SUPABASE_ANON_KEY: "sb_publishable_-5quMxP8JMitdoZDq49P3w_4fSkr6uO",  // ex.: "eyJhbGciOi..."  (Project Settings > API > anon public)

  // E-mail do usuário coordenador criado em Authentication > Users no Supabase.
  // O painel pede apenas a senha desse usuário.
  EMAIL_COORDENADOR: "gsdcerrado@gmail.com",  // ex.: "coordenacao@seudominio.com"
  BUCKET_PDFS: "ESO II_26",

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
          pergunta: "Durante uma ocorrência, um militar identifica um indivíduo que apresenta capacidade e oportunidade de causar grave dano à integridade física de terceiros, mas cuja intenção hostil ainda não está claramente demonstrada. Considerando o Triângulo da Força Letal e os critérios estabelecidos na instrução, assinale a alternativa correta.",
          alternativas: [
            "A presença simultânea de capacidade e oportunidade autoriza o emprego da força letal quando o indivíduo estiver armado, independentemente da demonstração de intenção.",
            "A ausência de intenção impede o emprego da força letal, ainda que estejam presentes capacidade e oportunidade, devendo o militar observar a evolução da ameaça.",
            "A capacidade e a oportunidade, associadas à desobediência de ordem legal, suprem a ausência de intenção, desde que o militar tenha previamente se identificado.",
            "A intenção pode ser presumida exclusivamente pela posse de arma de fogo, desde que o indivíduo esteja em distância compatível com seu emprego."
          ],
          correta: 1
        },
        {
          pergunta: "A respeito dos princípios aplicáveis ao uso da força, considere uma situação em que o emprego de determinado meio seja necessário para conter uma ameaça, mas sua utilização naquele local e momento represente risco elevado para terceiros. Conforme a ICA 125-9, assinale a alternativa correta.",
          alternativas: [
            "A conveniência prevalece sobre a necessidade sempre que o emprego da força representar risco elevado à população, ainda que não existam meios alternativos de contenção.",
            "A necessidade e a conveniência devem ser observadas conjuntamente, prevalecendo a conveniência quando houver possibilidade de dano colateral.",
            "Legalidade, necessidade e proporcionalidade devem estar sempre presentes; em caso de colisão entre necessidade e conveniência, prevalece a necessidade.",
            "A proporcionalidade admite o emprego de qualquer meio disponível, desde que o militar esteja agindo em legítima defesa, independentemente dos riscos decorrentes do local e do momento."
          ],
          correta: 2
        },
        {
          pergunta: "Durante uma intervenção, um suspeito inicialmente cooperativo passa a apresentar resistência verbal e, em seguida, avança agressivamente contra o militar, demonstrando intenção, capacidade e oportunidade de causar morte ou grave ferimento. Considerando os níveis de uso proporcional da força, assinale a alternativa correta.",
          alternativas: [
            "A progressão dos níveis deve ocorrer obrigatoriamente de forma sucessiva, sendo vedada a passagem direta da verbalização para a força letal, ainda que configurada ameaça à vida.",
            "A progressão pode ocorrer diretamente para a força letal, desde que presentes os elementos do Triângulo da Força Letal, sendo igualmente possível regredir os níveis caso o suspeito passe a cooperar.",
            "A resistência verbal autoriza o emprego imediato do controle físico, enquanto a agressividade com possível dano físico exige, necessariamente, o emprego de força letal.",
            "Uma vez iniciado o emprego de determinado nível de força, sua manutenção é obrigatória até que o suspeito esteja completamente imobilizado, mesmo que cesse a agressão."
          ],
          correta: 1
        },
        {
          pergunta: "Durante o procedimento diante de uma ameaça potencial, um indivíduo armado desobedece às ordens de identificação e continua se aproximando do posto de serviço. O militar já solicitou reforço, buscou abrigo e realizou a verbalização. Considerando a sequência prevista na instrução, assinale a alternativa correta.",
          alternativas: [
            "O militar deve realizar o último aviso, apontando a arma e mantendo o dedo fora do gatilho até observar a reação do suspeito; persistindo a ameaça com intenção, capacidade e oportunidade de causar morte ou grave ferimento, poderá empregar a força, observados os princípios aplicáveis.",
            "O militar deve efetuar disparo de advertência antes do último aviso, pois a persistência da aproximação após a verbalização caracteriza, por si só, ameaça real.",
            "O militar deve manter a arma em posição de pronto emprego, sem apontá-la, até que o indivíduo efetue o primeiro disparo ou ataque fisicamente algum integrante da equipe.",
            "O militar deve empregar obrigatoriamente a arma de fogo após o último aviso, independentemente da reação do suspeito, pois a desobediência reiterada caracteriza intenção hostil."
          ],
          correta: 0
        },
        {
          pergunta: "No âmbito do Programa de Educação da Mentalidade de Segurança Integrada (PEMSI), a Comissão responsável pelo planejamento das atividades anuais possui atribuições distribuídas entre diferentes funções. Considerando a estrutura apresentada na ICA 205-52, assinale a alternativa correta.",
          alternativas: [
            "Compete ao vice-presidente organizar as metodologias de palestras, workshops, avaliações e inspeções, enquanto o secretário substitui o presidente em caso de necessidade.",
            "Compete aos adjuntos executar diretamente as ações planejadas pela Comissão, enquanto os elos setoriais reúnem material de apoio e auxiliam na divulgação.",
            "Compete ao presidente planejar, coordenar e executar as atividades; ao vice-presidente, substituí-lo quando necessário; e aos elos setoriais, executar as ações planejadas pela Comissão.",
            "Compete ao secretário planejar e coordenar todas as atividades anuais, enquanto o presidente se restringe à aprovação das propostas elaboradas pelos adjuntos."
          ],
          correta: 2
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
          pergunta: "Durante o serviço de identificação, um militar do efetivo aproxima-se a pé do portão de acesso. O Identificador reconhece visualmente o indivíduo, mas observa comportamento agitado e um volume aparentemente suspeito. Considerando os procedimentos de triagem de pedestres, assinale a alternativa correta.",
          alternativas: [
            "O reconhecimento visual autoriza o ingresso sem apresentação de documento, independentemente das circunstâncias observadas, uma vez que a identificação prévia prevalece sobre os indícios comportamentais.",
            "O Identificador deverá solicitar documento de identificação, pois o reconhecimento visual não o exime de identificar o indivíduo diante de situação suspeita.",
            "O indivíduo deverá ser encaminhado obrigatoriamente à Central de Visitantes, pois qualquer comportamento suspeito descaracteriza o reconhecimento como integrante do efetivo.",
            "O ingresso poderá ser autorizado mediante confirmação verbal do posto de serviço, sendo dispensável a identificação documental quando houver reconhecimento visual prévio."
          ],
          correta: 1
        },
        {
          pergunta: "Um veículo particular devidamente cadastrado aproxima-se do portão da OM. O condutor, entretanto, não é reconhecido pelo Identificador, embora apresente o adesivo identificador e o adesivo de controle anual válidos. No interior do veículo encontram-se dois militares e um passageiro civil sem vínculo com o efetivo. Nesse caso, o Identificador deverá:",
          alternativas: [
            "Permitir o ingresso, uma vez que a regularidade dos adesivos comprova a autorização do veículo e se estende automaticamente a todos os seus ocupantes.",
            "Solicitar a identificação apenas do condutor, registrando os dados do veículo e permitindo o ingresso dos demais ocupantes mediante apresentação dos respectivos crachás no destino.",
            "Identificar o condutor e todos os ocupantes, registrar os dados e encaminhar à Central de Visitantes aquele que não pertence ao efetivo.",
            "Encaminhar obrigatoriamente todos os ocupantes à Central de Visitantes, pois o não reconhecimento do condutor invalida a credencial do veículo."
          ],
          correta: 2
        },
        {
          pergunta: "Um militar do efetivo apresenta-se à portaria, em março, conduzindo veículo particular cadastrado, cujo adesivo identificador permanece válido, mas cujo adesivo de controle anual corresponde ao ano anterior. Considerando os procedimentos previstos para a atualização anual dos adesivos, assinale a alternativa correta.",
          alternativas: [
            "O militar poderá ingressar normalmente, pois o adesivo identificador permanece válido e a atualização do controle anual somente será obrigatória após o encerramento do primeiro trimestre.",
            "O veículo deverá ser identificado na condição de visitante e encaminhado à Central de Visitantes, devendo permanecer submetido a esse procedimento até a atualização do adesivo anual.",
            "O Identificador deverá recolher o adesivo vencido e substituí-lo por um adesivo provisório, mantendo a condição de veículo cadastrado até a regularização junto ao setor de credenciamento.",
            "O ingresso poderá ser autorizado mediante apresentação da identidade militar e do documento do veículo, uma vez que a condição de integrante do efetivo prevalece sobre a validade do adesivo anual."
          ],
          correta: 1
        },
        {
          pergunta: "Às 23h, um caminhão baú de uma empresa prestadora de serviços apresenta-se à portaria para realizar uma entrega. O motorista informa que possui autorização do setor destinatário, mas não apresenta autorização prévia do Comandante da OM. Considerando os procedimentos previstos para o período entre 22h e 06h, bem como as regras de acesso de veículos de entrega, assinale a alternativa correta.",
          alternativas: [
            "O ingresso poderá ser autorizado mediante confirmação do setor destinatário, desde que o caminhão seja submetido à inspeção do compartimento de carga e todos os ocupantes sejam identificados.",
            "O caminhão deverá ser encaminhado à Central de Visitantes, onde permanecerá aguardando autorização do Oficial de Dia, sendo dispensada a autorização do Comandante quando se tratar de entrega previamente solicitada.",
            "O motorista deverá ser orientado a retornar durante o horário de expediente para realizar a entrega, salvo mediante autorização do Comandante; no período noturno, os portões devem permanecer trancados e veículos e volumes devem ser inspecionados.",
            "O ingresso poderá ser autorizado pelo Identificador, desde que o compartimento de carga seja inspecionado na entrada e na saída, uma vez que essa inspeção constitui requisito suficiente para o acesso de caminhões baú."
          ],
          correta: 2
        },
        {
          pergunta: "Uma Organização Militar recebe dois estrangeiros para atividades institucionais: o primeiro permanecerá por 12 dias e o segundo por 20 dias. Considerando as regras específicas de identificação e circulação de estrangeiros, assinale a alternativa correta.",
          alternativas: [
            "Ambos deverão receber crachá não personalizado com a inscrição ESTRANGEIRO, diferenciando-se apenas pela validade da credencial concedida.",
            "O primeiro receberá crachá não personalizado com a inscrição ESTRANGEIRO, enquanto o segundo receberá crachá personalizado, com a inscrição ESTRANGEIRO no campo Cargo/Função; ambos deverão permanecer acompanhados durante todo o trânsito no interior da OM.",
            "O primeiro receberá crachá personalizado, enquanto o segundo receberá crachá não personalizado, pois a permanência superior a 15 dias dispensa a identificação individualizada.",
            "Ambos deverão receber crachá personalizado, com a inscrição ESTRANGEIRO no campo Cargo/Função, sendo obrigatório o acompanhamento apenas durante os primeiros 15 dias de permanência."
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
