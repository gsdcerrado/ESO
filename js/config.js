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
      pdfUrl: "https://albkvtgzsaojrtsyszfi.supabase.co/storage/v1/object/sign/ESO%20II_26/Modulo3.pdf?token=eyJraWQiOiJkZDcwZTk5NS1iNDkwLTQxNjItODYyNy1hYTQ5MTA4YjgwMzgiLCJhbGciOiJFUzI1NiJ9.eyJ1cmwiOiJFU08gSUlfMjYvTW9kdWxvMy5wZGYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzk1NzE2Mjk2LCJleHAiOjE4ODIxMTYyOTZ9.0wKcx9_OggeAeRbjmuDSYJUddo5vTl7JlAI8M_usaL3bjHr5odLrqb5lyd9TdidITv2sP_E1Nu93p5u9jH9ntA",
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
          pergunta: "Durante o serviço, um operador recebe um equipamento rádio e precisa verificar seu funcionamento. Considerando os procedimentos de operação e segurança das comunicações, assinale a alternativa correta.",
          alternativas: [
            "Deve aguardar a rede ficar livre, posicionar-se a cinco a dez centímetros do microfone e chamar a Central de Comunicações para verificar a clareza e a intensidade dos sinais. Mensagens sigilosas exigem criptografia, ainda que seja empregado o Código Q.",
            "Deve chamar diretamente a estação mais próxima, informar seu nome e solicitar a confirmação da potência do equipamento. O Código Q pode substituir a criptografia quando a mensagem for curta.",
            "Deve realizar o teste transmitindo uma mensagem geral, preferencialmente em potência máxima, para verificar o alcance do equipamento. A autenticação das estações pode ser dispensada quando os indicativos forem conhecidos.",
            "Deve solicitar à Central de Comunicações a liberação de uma frequência alternativa antes de qualquer transmissão. A distância entre a boca e o microfone deve ser superior a dez centímetros para evitar interferências."
          ],
          correta: 0
        },
        {
          pergunta: "Uma equipe identifica interferência deliberada nas comunicações rádio durante uma operação. Considerando as orientações do módulo, qual conduta está de acordo com o procedimento previsto?",
          alternativas: [
            "Interromper imediatamente todas as transmissões, alterar a frequência sem comunicação à chefia e aguardar a normalização do sinal para relatar a ocorrência.",
            "Procurar a fonte da interferência e continuar transmitindo, salvo ordem em contrário, reportando à chefia a data e hora, as frequências utilizadas, o tipo e a magnitude da interferência e a estação afetada.",
            "Retirar a antena do equipamento e, caso a interferência diminua, classificá-la como gerada no próprio transceptor; caso permaneça, classificá-la como externa.",
            "Manter as transmissões normalmente, evitando comunicar a ocorrência à chefia até que seja possível identificar com precisão o responsável pela interferência."
          ],
          correta: 1
        },
        {
          pergunta: "Sobre o Sistema Pacificador, suas atribuições e regras de utilização, assinale a alternativa correta.",
          alternativas: [
            "O aplicativo Pacificador Móvel pode ser instalado em dispositivos particulares, desde que o usuário mantenha suas credenciais sob sigilo e esteja vinculado a uma operação de Segurança e Defesa.",
            "O COp Treinamento é destinado ao registro de incidentes reais e simulados, sendo os registros reais preservados para consulta posterior e os simulados excluídos ao término do exercício.",
            "O gerenciamento local do sistema é atribuído à SOP-02 da USEGDEF, responsável por cadastrar e instruir usuários; as credenciais são pessoais e não podem ser utilizadas por terceiros.",
            "A criação de Centros de Operações e a atualização de usuários devem ser solicitadas diretamente pelos operadores ao COMPREP, sem intermediação da Seção de Operações da USEGDEF."
          ],
          correta: 2
        },
        {
          pergunta: "Durante a inspeção de uma viatura operacional, o motorista identifica desgaste nos freios, nível inadequado de óleo do motor e falha em uma das luzes de sinalização. Considerando o check list e as orientações de manutenção, assinale a alternativa correta.",
          alternativas: [
            "O motorista deve registrar apenas as falhas que comprometam imediatamente a mobilidade da viatura, pois itens de sinalização e fluidos são verificados exclusivamente pela Unidade Apoiadora.",
            "O desgaste dos freios e o nível de óleo são itens de manutenção corretiva, cuja verificação deve ocorrer apenas durante as revisões previstas pelo fabricante; a falha de sinalização pode ser corrigida pelo motorista sem registro.",
            "O check list deve contemplar fluidos, motor, elétrica, iluminação, sinalização, cabine e rodagem, além do estado geral e da limpeza. A manutenção deve ser coordenada com a Unidade Apoiadora, respeitando-se os prazos do fabricante e evitando o emprego de viatura que necessite de manutenção corretiva.",
            "A manutenção de primeiro escalão compreende a substituição de componentes elétricos e a recuperação dos sistemas de freio, enquanto a manutenção corretiva se limita à remoção de impurezas, calibragem e verificação de vazamentos."
          ],
          correta: 2
        },
        {
          pergunta: "Em relação aos sistemas de redundância da comunicação rádio e aos tipos de equipamentos, assinale a alternativa correta.",
          alternativas: [
            "Os rádios fixos são empregados nas estações controladoras e apresentam bom alcance devido à maior potência; os portáteis do tipo manpack são transportados em mochilas por patrulhas a pé; e os repetidores utilizam dois transceptores para ampliar a potência e eliminar áreas de sombra.",
            "Os rádios ultraportáteis (HT) são destinados exclusivamente às estações controladoras, enquanto os equipamentos manpack são empregados nas equipes de reação e nos postos fixos, por apresentarem potência aproximada de cinco watts.",
            "A telefonia de campanha constitui o primeiro nível de redundância, seguida pelos sinais e gestos, celulares e telefonia convencional. A reserva técnica deve corresponder a 20% apenas dos equipamentos rádio, sem incluir acessórios.",
            "Os repetidores são equipamentos compostos por um único transceptor, instalados em locais baixos para reduzir a propagação do sinal para áreas externas à operação. Sua principal finalidade é substituir a rede rádio em caso de falha."
          ],
          correta: 0
        }
      ]
    },
    {
      id: "m4",
      numero: 4,
      titulo: "Gerenciamento de Crises, Prevenção a Ataques Terroristas e Prevenção de Acidentes com Armamentos",
      descricao: "Contenção e isolamento em crises, identificação de ameaças explosivas/terroristas e as 4 regras de ouro do armamento.",
      pdfUrl: "https://albkvtgzsaojrtsyszfi.supabase.co/storage/v1/object/sign/ESO%20II_26/Modulo4.pdf?token=eyJraWQiOiJkZDcwZTk5NS1iNDkwLTQxNjItODYyNy1hYTQ5MTA4YjgwMzgiLCJhbGciOiJFUzI1NiJ9.eyJ1cmwiOiJFU08gSUlfMjYvTW9kdWxvNC5wZGYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzk1NzE2MzY3LCJleHAiOjE4ODIxMTYzNjd9.ZJYbEsAfer9wTrVR_2cu5oxf_jj0KGFa3ccO-c_mEF2-PCBE_5VZahCB4d5LpNED3BN4rPj7eMNssvpbqil3Rw",
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
          pergunta: "Durante uma atividade de vigilância, a Equipe de Serviço identifica um indivíduo que, em dias consecutivos, fotografa as instalações da OM, observa os horários de rendição dos postos e realiza perguntas sobre a estrutura operacional e o armamento empregado pelos militares. Considerando as etapas de preparação de um ato hostil, assinale a alternativa correta.",
          alternativas: [
            "A observação das instalações caracteriza monitoramento, enquanto as perguntas sobre armamento caracterizam necessariamente revisão dos planos, uma vez que envolvem a obtenção de informações operacionais.",
            "A fotografia das instalações caracteriza vigilância; a obtenção de informações sobre a rotina e o armamento caracteriza monitoramento; e a observação dos horários de rendição pode subsidiar a revisão dos planos.",
            "As condutas descritas caracterizam exclusivamente vigilância, pois monitoramento pressupõe acesso não autorizado a documentos ou sistemas internos da Organização Militar.",
            "A revisão dos planos corresponde ao pré-posicionamento de pessoal e equipamentos no terreno, enquanto o monitoramento se restringe à observação física dos postos de serviço."
          ],
          correta: 1
        },
        {
          pergunta: "Durante uma ocorrência, um criminoso armado mantém um refém no interior de uma instalação militar. Simultaneamente, a Equipe de Serviço avalia a possibilidade de intervenção, mas conclui que não dispõe de capacitação técnica e meios suficientes para solucionar a situação com segurança. Considerando a classificação dos graus de crise e os critérios de decisão, assinale a alternativa correta.",
          alternativas: [
            "A ocorrência caracteriza crise de Grau 1, pois o risco imediato está concentrado na integridade física do causador e do refém; a Equipe deverá intervir antes da chegada de tropas especializadas para evitar o agravamento da situação.",
            "A ocorrência caracteriza crise de Grau 2, classificada como de altíssimo risco; diante da ausência de condições para uma solução segura, a Equipe deverá realizar o cerco do ponto crítico, se possível.",
            "A ocorrência caracteriza crise de Grau 3, pois toda situação envolvendo reféns constitui crise extraordinária; a Equipe deverá realizar a contenção e o isolamento, independentemente de sua capacidade técnica.",
            "A ocorrência caracteriza crise de Grau 4, pois a possibilidade de dano a inocentes ultrapassa os limites físicos do local; a decisão de intervenção deverá considerar exclusivamente a aceitabilidade legal."
          ],
          correta: 1
        },
        {
          pergunta: "Em uma crise de segurança, o Comandante da OM determina a constituição do Gabinete de Crise e o estabelecimento de um perímetro de segurança. Considerando as duas linhas de isolamento previstas na apresentação, assinale a alternativa correta.",
          alternativas: [
            "A primeira linha, denominada isolamento, impede a entrada de pessoas e de apoio externo, enquanto a segunda linha, denominada contenção, impede que os causadores ampliem sua área de domínio ou obtenham recursos.",
            "A primeira linha, denominada contenção, busca impedir a ampliação da área de domínio dos causadores, enquanto a segunda linha, denominada isolamento, envolve a primeira e restringe a entrada de pessoas e o apoio externo.",
            "A primeira linha, denominada contenção, destina-se exclusivamente a impedir a fuga dos causadores, enquanto a segunda linha, denominada isolamento, permite a circulação de pessoas não envolvidas, desde que autorizadas pelo negociador.",
            "A primeira linha, denominada isolamento, direciona as comunicações ao negociador, enquanto a segunda linha, denominada contenção, impede a divulgação de imagens pela imprensa e restringe o acesso de equipes especializadas."
          ],
          correta: 1
        },
        {
          pergunta: "A Equipe de Serviço recebe uma ligação telefônica anônima informando a existência de um artefato explosivo no interior da OM. O interlocutor demonstra nervosismo, utiliza linguagem pouco natural e não fornece informações técnicas sobre o suposto dispositivo. Considerando os procedimentos previstos para ameaças e suspeitas de bomba, assinale a alternativa correta.",
          alternativas: [
            "A ameaça deverá ser imediatamente classificada como falsa, pois a ausência de informações técnicas e o comportamento atípico do interlocutor são suficientes para afastar a possibilidade de existência de artefato explosivo.",
            "O militar deverá manter-se interessado e tranquilo, observar características da voz, ruídos de fundo e linguagem, registrar as informações no formulário próprio e encaminhá-las para avaliação; a decisão de evacuação compete ao Gabinete de Crise.",
            "A Equipe de Serviço deverá determinar a evacuação total da OM e, posteriormente, realizar a busca pelo artefato, uma vez que a existência de ameaça telefônica torna obrigatória a retirada de todo o efetivo.",
            "A ameaça somente poderá ser considerada real após a localização visual do artefato, cabendo à Equipe de Serviço verificar sua existência mediante inspeção do local indicado pelo interlocutor."
          ],
          correta: 1
        },
        {
          pergunta: "Durante o serviço de guarda, um soldado do terço de descanso recolhe-se ao alojamento portando sua pistola, cujo carregador permanece municiado, mas sem cartucho na câmara. Considerando os procedimentos de recolhimento do armamento e as condições de emprego da arma, assinale a alternativa correta.",
          alternativas: [
            "O procedimento está correto, pois a condição de arma alimentada exige apenas o carregador municiado inserido, sendo permitido ao militar permanecer armado no alojamento durante o período de descanso.",
            "O procedimento está incorreto, pois os soldados não podem ingressar armados nos alojamentos; o armamento deve ser entregue aberto e sem carregador ao graduado de serviço armado, enquanto o carregador municiado pode permanecer com o militar.",
            "O procedimento está incorreto, pois a condição de arma carregada corresponde àquela em que o carregador municiado está inserido, independentemente da presença de cartucho na câmara; o militar deverá entregar a arma descarregada e o carregador desmuniciado.",
            "O procedimento está correto desde que o Comandante da Guarda tenha autorizado previamente o recolhimento ao alojamento, pois a restrição ao porte de armamento se aplica exclusivamente ao terço de prontidão."
          ],
          correta: 1
        }
      ]
    }
  ]
};
