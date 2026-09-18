/* ==========================================================================
   INOVE MECÂNICA — CONFIGURAÇÃO CENTRALIZADA
   --------------------------------------------------------------------------
   Edite este arquivo para atualizar TODAS as informações do site em um único
   lugar: contatos, textos institucionais, serviços, portfólio, antes/depois,
   diferenciais, processo, estatísticas, galerias e equipe.

   REGRA: NÃO invente informações da empresa. Use [INSERIR ...] quando o dado
   real ainda não tiver sido fornecido.
   ========================================================================== */

const CONFIG = {

  /* ------------------------------------------------------------------
     IDENTIDADE
     ------------------------------------------------------------------ */
  empresa: "INOVE Mecânica",
  logoNome: "INOVE",
  subtitulo: "Mecânica",
  tagline: "Mecânica Automotiva",
  slogan: "Precisão, confiança e cuidado com o seu veículo.",
  tituloDocumento: "INOVE Mecânica | Oficina e Serviços Automotivos",
  metaDescricao: "INOVE Mecânica. Oficina mecânica automotiva com diagnóstico cuidadoso, manutenção preventiva e corretiva, transparência e atendimento profissional.",

  /* ------------------------------------------------------------------
     CONTATO  —  WhatsApp no formato 55 + DDD + número (somente dígitos)
     Ex.: "5541999999999"
     ------------------------------------------------------------------ */
  whatsapp: "5541987835191",
  telefone: "(41) 98783-5191",
  email: "",

  /* ------------------------------------------------------------------
     LOCALIZAÇÃO
     ------------------------------------------------------------------ */
  cidade: "Curitiba - PR",
  endereco: "Av. Anita Garibaldi, 3487 - Juvevê",
  atendimento: "Curitiba e Região",
  // Coordenadas opcionais (latitude/longitude) para exibir o mapa. Ex.: { lat: -25.42, lng: -49.27 }
  coordenadas: { lat: -25.3824739, lng: -49.261813 },
  horario: "Seg a Sex: 08:00 às 18:00",

  /* ------------------------------------------------------------------
     REDES SOCIAIS (URLs completas ou vazio)
     ------------------------------------------------------------------ */
  instagram: "https://www.instagram.com/autoi9cwbmecanica/",
  facebook: "https://www.facebook.com/people/Auto-Inove/61550746347921/",

  /* ------------------------------------------------------------------
     MENSAGENS DO WHATSAPP
     ------------------------------------------------------------------ */
  mensagemPadrao: "Olá, INOVE Mecânica! Gostaria de solicitar um orçamento.",

  /* ------------------------------------------------------------------
     TEXTO INSTITUCIONAL (SOBRE)
     Substitua os marcadores [INSERIR ...] pelas informações reais.
     ------------------------------------------------------------------ */
  sobreTitulo: "Cuidado técnico com o seu veículo",
  sobreTexto: [
    "[INSERIR HISTÓRIA DA INOVE]",
    "[INSERIR DIFERENCIAL]",
    "[INSERIR CIDADE] — [INSERIR EXPERIÊNCIA]"
  ],
  sobreDestaques: [
    "Atenção aos detalhes",
    "Diagnóstico cuidadoso",
    "Transparência no atendimento",
    "Organização e limpeza"
  ],
  sobreImagem: "assets/images/oficina/oficina-01.jpg",

  /* ------------------------------------------------------------------
     FRASE DE IMPACTO (após o Hero)
     ------------------------------------------------------------------ */
  impactoLinha1: "Seu carro.",
  impactoLinha2: "Nossa responsabilidade.",

  /* ------------------------------------------------------------------
     FRASE DE CONFIANÇA (seção escura)
     ------------------------------------------------------------------ */
  confiancaTitulo: "Manutenção não é apenas conserto.",
  confiancaDestaque: "É prevenção.",

  /* ------------------------------------------------------------------
     CTA FINAL
     ------------------------------------------------------------------ */
  ctaTitulo: "Seu carro precisa de atenção?",
  ctaTexto: "Fale com a INOVE e solicite uma avaliação.",
  ctaBotao: "Falar com a INOVE"
};

/* ==========================================================================
   SERVIÇOS
   --------------------------------------------------------------------------
   Estrutura: numero / titulo / descricao / icone (nome Lucide) / imagem.
   Remova ou edite itens conforme os serviços realmente oferecidos.
   ========================================================================== */

const SERVICOS = [
  {
    numero: "01",
    titulo: "Revisão Automotiva",
    descricao: "Manutenção preventiva e revisão do veículo.",
    icone: "clipboard-check",
    imagem: "assets/images/servicos/servico-revisao.jpg"
  },
  {
    numero: "02",
    titulo: "Freios",
    descricao: "Avaliação e manutenção do sistema de frenagem.",
    icone: "disc",
    imagem: "assets/images/servicos/servico-freios.jpg"
  },
  {
    numero: "03",
    titulo: "Suspensão",
    descricao: "Manutenção e avaliação do sistema de suspensão.",
    icone: "activity",
    imagem: "assets/images/servicos/servico-suspensao.jpg"
  },
  {
    numero: "04",
    titulo: "Motor",
    descricao: "Diagnóstico e manutenção do motor.",
    icone: "settings",
    imagem: "assets/images/servicos/servico-motor.jpg"
  },
  {
    numero: "05",
    titulo: "Troca de Óleo",
    descricao: "Manutenção relacionada a óleo e filtros.",
    icone: "droplets",
    imagem: "assets/images/servicos/servico-oleo.jpg"
  },
  {
    numero: "06",
    titulo: "Diagnóstico",
    descricao: "Avaliação de problemas e diagnóstico automotivo.",
    icone: "stethoscope",
    imagem: "assets/images/servicos/servico-diagnostico.jpg"
  }
];

/* ==========================================================================
   PORTFÓLIO — TRABALHOS REALIZADOS
   --------------------------------------------------------------------------
   - categoria: Motor / Freios / Suspensão / Revisão / Outros
   - imagem: capa do card       - imagens: fotos do lightbox
   - tamanho: padrao / grande / vertical / horizontal (composição editorial)
   ========================================================================== */

const PORTFOLIO = [
  {
    id: "motor-01",
    categoria: "Motor",
    titulo: "Manutenção do motor",
    descricao: "Serviço realizado na manutenção do motor. [INSERIR DESCRIÇÃO REAL]",
    imagem: "assets/images/portfolio/motor/motor-01.jpg",
    imagens: ["assets/images/portfolio/motor/motor-01.jpg"],
    tamanho: "grande"
  },
  {
    id: "motor-02",
    categoria: "Motor",
    titulo: "Diagnóstico de motor",
    descricao: "Diagnóstico e correção. [INSERIR DESCRIÇÃO REAL]",
    imagem: "assets/images/portfolio/motor/motor-02.jpg",
    imagens: [
      "assets/images/portfolio/motor/motor-02.jpg",
      "assets/images/portfolio/motor/motor-01.jpg"
    ],
    tamanho: "padrao"
  },
  {
    id: "motor-03",
    categoria: "Motor",
    titulo: "Revisão de componentes",
    descricao: "Avaliação e substituição de componentes. [INSERIR DESCRIÇÃO REAL]",
    imagem: "assets/images/portfolio/motor/motor-03.jpg",
    imagens: ["assets/images/portfolio/motor/motor-03.jpg"],
    tamanho: "vertical"
  },
  {
    id: "freios-01",
    categoria: "Freios",
    titulo: "Manutenção de freios",
    descricao: "Avaliação e manutenção do sistema de frenagem. [INSERIR DESCRIÇÃO REAL]",
    imagem: "assets/images/portfolio/freios/freios-01.jpg",
    imagens: [
      "assets/images/portfolio/freios/freios-01.jpg",
      "assets/images/portfolio/freios/freios-02.jpg"
    ],
    tamanho: "padrao"
  },
  {
    id: "freios-02",
    categoria: "Freios",
    titulo: "Substituição de pastilhas",
    descricao: "Troca de pastilhas e verificação do sistema. [INSERIR DESCRIÇÃO REAL]",
    imagem: "assets/images/portfolio/freios/freios-02.jpg",
    imagens: ["assets/images/portfolio/freios/freios-02.jpg"],
    tamanho: "horizontal"
  },
  {
    id: "suspensao-01",
    categoria: "Suspensão",
    titulo: "Manutenção da suspensão",
    descricao: "Avaliação e manutenção da suspensão. [INSERIR DESCRIÇÃO REAL]",
    imagem: "assets/images/portfolio/suspensao/suspensao-01.jpg",
    imagens: ["assets/images/portfolio/suspensao/suspensao-01.jpg"],
    tamanho: "padrao"
  },
  {
    id: "suspensao-02",
    categoria: "Suspensão",
    titulo: "Revisão de amortecedores",
    descricao: "Verificação e manutenção de amortecedores. [INSERIR DESCRIÇÃO REAL]",
    imagem: "assets/images/portfolio/suspensao/suspensao-02.jpg",
    imagens: [
      "assets/images/portfolio/suspensao/suspensao-02.jpg",
      "assets/images/portfolio/suspensao/suspensao-01.jpg"
    ],
    tamanho: "vertical"
  },
  {
    id: "revisao-01",
    categoria: "Revisão",
    titulo: "Revisão preventiva",
    descricao: "Revisão preventiva completa. [INSERIR DESCRIÇÃO REAL]",
    imagem: "assets/images/portfolio/revisao/revisao-01.jpg",
    imagens: [
      "assets/images/portfolio/revisao/revisao-01.jpg",
      "assets/images/portfolio/revisao/revisao-02.jpg"
    ],
    tamanho: "grande"
  },
  {
    id: "revisao-02",
    categoria: "Revisão",
    titulo: "Check-up do veículo",
    descricao: "Avaliação geral do veículo. [INSERIR DESCRIÇÃO REAL]",
    imagem: "assets/images/portfolio/revisao/revisao-02.jpg",
    imagens: ["assets/images/portfolio/revisao/revisao-02.jpg"],
    tamanho: "padrao"
  },
  {
    id: "revisao-03",
    categoria: "Revisão",
    titulo: "Manutenção geral",
    descricao: "Manutenção preventiva e corretiva. [INSERIR DESCRIÇÃO REAL]",
    imagem: "assets/images/portfolio/revisao/revisao-03.jpg",
    imagens: ["assets/images/portfolio/revisao/revisao-03.jpg"],
    tamanho: "horizontal"
  },
  {
    id: "revisao-04",
    categoria: "Revisão",
    titulo: "Itens revisados",
    descricao: "Conferência dos itens de segurança. [INSERIR DESCRIÇÃO REAL]",
    imagem: "assets/images/portfolio/revisao/revisao-04.jpg",
    imagens: [
      "assets/images/portfolio/revisao/revisao-04.jpg",
      "assets/images/portfolio/revisao/revisao-01.jpg"
    ],
    tamanho: "vertical"
  },
  {
    id: "outros-01",
    categoria: "Outros",
    titulo: "Serviços gerais",
    descricao: "Outros serviços automotivos. [INSERIR DESCRIÇÃO REAL]",
    imagem: "assets/images/portfolio/outros/outros-01.jpg",
    imagens: ["assets/images/portfolio/outros/outros-01.jpg"],
    tamanho: "padrao"
  },
  {
    id: "outros-02",
    categoria: "Outros",
    titulo: "Cuidados automotivos",
    descricao: "Serviços diversos de cuidado com o veículo. [INSERIR DESCRIÇÃO REAL]",
    imagem: "assets/images/portfolio/outros/outros-02.jpg",
    imagens: [
      "assets/images/portfolio/outros/outros-02.jpg",
      "assets/images/portfolio/outros/outros-03.jpg"
    ],
    tamanho: "grande"
  },
  {
    id: "outros-03",
    categoria: "Outros",
    titulo: "Atendimento especializado",
    descricao: "Atendimento técnico especializado. [INSERIR DESCRIÇÃO REAL]",
    imagem: "assets/images/portfolio/outros/outros-03.jpg",
    imagens: ["assets/images/portfolio/outros/outros-03.jpg"],
    tamanho: "padrao"
  },
  {
    id: "outros-04",
    categoria: "Outros",
    titulo: "Serviço executado",
    descricao: "Resultado do serviço executado. [INSERIR DESCRIÇÃO REAL]",
    imagem: "assets/images/portfolio/outros/outros-04.jpg",
    imagens: ["assets/images/portfolio/outros/outros-04.jpg"],
    tamanho: "horizontal"
  },
  {
    id: "outros-05",
    categoria: "Outros",
    titulo: "Manutenção de veículo",
    descricao: "Manutenção automotiva de qualidade. [INSERIR DESCRIÇÃO REAL]",
    imagem: "assets/images/portfolio/outros/outros-05.jpg",
    imagens: ["assets/images/portfolio/outros/outros-05.jpg"],
    tamanho: "vertical"
  },
  {
    id: "outros-06",
    categoria: "Outros",
    titulo: "Trabalho finalizado",
    descricao: "Trabalho automotivo finalizado. [INSERIR DESCRIÇÃO REAL]",
    imagem: "assets/images/portfolio/outros/outros-06.jpg",
    imagens: ["assets/images/portfolio/outros/outros-06.jpg"],
    tamanho: "padrao"
  },
  {
    id: "revisao-05",
    categoria: "Revisão",
    titulo: "Revisão de rotina",
    descricao: "Revisão de rotina do veículo. [INSERIR DESCRIÇÃO REAL]",
    imagem: "assets/images/portfolio/outros/outros-07.jpg",
    imagens: ["assets/images/portfolio/outros/outros-07.jpg"],
    tamanho: "padrao"
  },
  {
    id: "outros-07",
    categoria: "Outros",
    titulo: "Serviço completo",
    descricao: "Serviço automotivo completo. [INSERIR DESCRIÇÃO REAL]",
    imagem: "assets/images/portfolio/outros/outros-08.jpg",
    imagens: ["assets/images/portfolio/outros/outros-08.jpg"],
    tamanho: "horizontal"
  }
];

/* ==========================================================================
   ANTES → DEPOIS
   --------------------------------------------------------------------------
   Projetos reais: problema → solução. Substitua pelas fotos reais da empresa.
   ========================================================================== */

const ANTES_DEPOIS = [
  {
    id: "projeto-01",
    titulo: "Manutenção do motor",
    categoria: "Motor",
    antes: "assets/images/antes-depois/projeto-01/antes.jpg",
    depois: "assets/images/antes-depois/projeto-01/depois.jpg",
    descricao: "Motor com manutenção completa: diagnóstico, reparo e ajuste fino."
  },
  {
    id: "projeto-02",
    titulo: "Serviço de freios",
    categoria: "Freios",
    antes: "assets/images/antes-depois/projeto-02/antes.jpg",
    depois: "assets/images/antes-depois/projeto-02/depois.jpg",
    descricao: "Troca de discos, pastilhas e revisão completa do sistema de freios."
  },
  {
    id: "projeto-03",
    titulo: "Revisão da suspensão",
    categoria: "Suspensão",
    antes: "assets/images/antes-depois/projeto-03/antes.jpg",
    depois: "assets/images/antes-depois/projeto-03/depois.jpg",
    descricao: "Revisão da suspensão com troca de amortecedores e alinhamento."
  },
  {
    id: "projeto-04",
    titulo: "Revisão geral",
    categoria: "Revisão",
    antes: "assets/images/antes-depois/projeto-04/antes.jpg",
    depois: "assets/images/antes-depois/projeto-04/depois.jpg",
    descricao: "Revisão geral completa: inspeção, manutenção preventiva e corretiva."
  }
];

/* ==========================================================================
   DIFERENCIAIS — POR QUE ESCOLHER A INOVE
   ========================================================================== */

const DIFERENCIAIS = [
  {
    titulo: "Atendimento personalizado",
    descricao: "Cada veículo é tratado com atenção e cuidado.",
    icone: "user-check"
  },
  {
    titulo: "Diagnóstico cuidadoso",
    descricao: "Avaliação criteriosa antes de qualquer recomendação.",
    icone: "search-check"
  },
  {
    titulo: "Transparência",
    descricao: "Você é informado sobre o serviço e o orçamento.",
    icone: "eye"
  },
  {
    titulo: "Qualidade",
    descricao: "Serviço executado com capricho e atenção.",
    icone: "badge-check"
  },
  {
    titulo: "Organização",
    descricao: "Processo de trabalho limpo e organizado.",
    icone: "list-checks"
  },
  {
    titulo: "Segurança",
    descricao: "Cuidado para manter o seu veículo seguro.",
    icone: "shield-check"
  },
  {
    titulo: "Compromisso",
    descricao: "Responsabilidade com o que foi combinado.",
    icone: "handshake"
  },
  {
    titulo: "Atenção aos detalhes",
    descricao: "Otime em cada detalhe do serviço realizado.",
    icone: "zoom-in"
  }
];

/* ==========================================================================
   PROCESSO — COMO FUNCIONA
   ========================================================================== */

const PROCESSO = [
  {
    numero: "01",
    titulo: "Contato",
    descricao: "O cliente entra em contato.",
    icone: "message-circle"
  },
  {
    numero: "02",
    titulo: "Avaliação",
    descricao: "O veículo é avaliado.",
    icone: "clipboard-list"
  },
  {
    numero: "03",
    titulo: "Diagnóstico",
    descricao: "Identificação do serviço necessário.",
    icone: "stethoscope"
  },
  {
    numero: "04",
    titulo: "Orçamento",
    descricao: "Apresentação do orçamento.",
    icone: "file-text"
  },
  {
    numero: "05",
    titulo: "Serviço",
    descricao: "Execução da manutenção.",
    icone: "wrench"
  },
  {
    numero: "06",
    titulo: "Entrega",
    descricao: "Veículo pronto.",
    icone: "circle-check"
  }
];

/* ==========================================================================
   ESTATÍSTICAS
   --------------------------------------------------------------------------
   Use dados reais. Enquanto não houver números confirmados, mantenha o valor
   como "[INSERIR NÚMERO]" — o site exibirá corretamente o marcador.
   ========================================================================== */

const ESTATISTICAS = [
  { valor: "[INSERIR NÚMERO]", prefixo: "+", rotulo: "Veículos atendidos" },
  { valor: "[INSERIR NÚMERO]", prefixo: "+", rotulo: "Serviços realizados" },
  { valor: "[INSERIR NÚMERO]", prefixo: "+", rotulo: "Clientes" },
  { valor: "[INSERIR NÚMERO]", prefixo: "", sufixo: "%", rotulo: "Compromisso" }
];

/* ==========================================================================
   OFICINA — GALERIA
   ========================================================================== */

const OFICINA = [
  { imagem: "assets/images/oficina/oficina-01.jpg", titulo: "Nossa oficina" },
  { imagem: "assets/images/oficina/oficina-02.jpg", titulo: "Estrutura" },
  { imagem: "assets/images/oficina/oficina-03.jpg", titulo: "Área de trabalho" },
  { imagem: "assets/images/oficina/oficina-04.jpg", titulo: "Atendimento" },
  { imagem: "assets/images/oficina/oficina-05.jpg", titulo: "Nosso espaço" },
  { imagem: "assets/images/oficina/oficina-06.jpg", titulo: "Dia a dia" }
];

/* ==========================================================================
   EQUIPE — QUEM CUIDA DO SEU CARRO
   ========================================================================== */

const EQUIPE = {
  nome: "[INSERIR NOME]",
  funcao: "[INSERIR FUNÇÃO]",
  descricao: "[INSERIR DESCRIÇÃO]",
  foto: "assets/images/mecanicos/mecanico-01.jpg"
};