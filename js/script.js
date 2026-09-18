/* ==========================================================================
   INOVE MECÂNICA — Funcionalidades Principais
   --------------------------------------------------------------------------
   Este arquivo lê os dados de js/config.js e renderiza as seções do site,
   além de cuidar das interações: WhatsApp, formulário, antes/depois,
   portfólio com filtros e lightbox, menu mobile, scroll suave e animações.
   ========================================================================== */

/* --------------------------------------------------------------------------
   WHATSAPP CENTRALIZADO
   -------------------------------------------------------------------------- */

function obterWhatsapp() {
  return String(CONFIG.whatsapp || "").replace(/\D/g, "");
}

function semWhatsappConfigurado() {
  alert(
    "WhatsApp ainda não configurado.\n\n" +
    "Abra o arquivo js/config.js e preencha CONFIG.whatsapp " +
    "com o número no formato 55 + DDD + número (somente dígitos)."
  );
}

function gerarUrlWhatsApp(mensagem) {
  const numero = obterWhatsapp();
  if (numero.length < 10) {
    semWhatsappConfigurado();
    return "";
  }
  const texto = encodeURIComponent(mensagem);
  return "https://api.whatsapp.com/send?phone=" + numero + "&text=" + texto;
}

function abrirWhatsApp(mensagem) {
  const url = gerarUrlWhatsApp(mensagem);
  if (url) window.open(url, "_blank", "noopener");
}

function mensagemDoBotao(botao) {
  const tipo = (botao.getAttribute("data-mensagem") || "padrao").trim();
  if (tipo === "padrao") return CONFIG.mensagemPadrao;
  const chave = "mensagem" + tipo.charAt(0).toUpperCase() + tipo.slice(1);
  return CONFIG[chave] || CONFIG.mensagemPadrao;
}

/* --------------------------------------------------------------------------
   LIGHTBOX REUTILIZÁVEL (portfólio e oficina)
   -------------------------------------------------------------------------- */

const Lightbox = (function () {
  let obra = null;
  let fotoAtiva = 0;
  let overlay = null;

  function fotosDaObra(item) {
    return (item.imagens && item.imagens.length) ? item.imagens.slice() : [item.imagem];
  }

  function atualizar() {
    if (!obra || !overlay) return;
    const fotos = fotosDaObra(obra);
    const imgEl = overlay.querySelector(".lightbox-img");
    const counter = overlay.querySelector(".lightbox-counter");

    imgEl.src = fotos[fotoAtiva];
    imgEl.alt = obra.titulo + " — foto " + (fotoAtiva + 1) + " de " + fotos.length;
    overlay.querySelector(".lightbox-cat").textContent = obra.categoria || "";
    overlay.querySelector(".lightbox-title").textContent = obra.titulo;
    overlay.querySelector(".lightbox-desc").textContent = obra.descricao || "";
    counter.textContent = fotos.length > 1 ? (fotoAtiva + 1) + " / " + fotos.length : "";
    overlay.classList.toggle("has-single", fotos.length <= 1);

    const thumbs = overlay.querySelector(".lightbox-thumbs");
    thumbs.innerHTML = "";
    if (fotos.length > 1) {
      fotos.forEach(function (src, fi) {
        const t = document.createElement("button");
        t.type = "button";
        t.className = "lightbox-thumb" + (fi === fotoAtiva ? " active" : "");
        t.setAttribute("aria-label", "Ir para a foto " + (fi + 1));
        const thumb = document.createElement("img");
        thumb.src = src;
        thumb.alt = "";
        thumb.loading = "lazy";
        t.appendChild(thumb);
        t.addEventListener("click", function () {
          fotoAtiva = fi;
          atualizar();
        });
        thumbs.appendChild(t);
      });
    }

    if (window.lucide) window.lucide.createIcons();
  }

  function abrir(item) {
    obra = item;
    fotoAtiva = 0;
    atualizar();
    overlay.classList.add("open");
    document.body.classList.add("no-scroll");
  }

  function fechar() {
    overlay.classList.remove("open");
    document.body.classList.remove("no-scroll");
  }

  function anterior() {
    const fotos = fotosDaObra(obra);
    if (!obra || fotos.length <= 1) return;
    fotoAtiva = (fotoAtiva - 1 + fotos.length) % fotos.length;
    atualizar();
  }

  function proxima() {
    const fotos = fotosDaObra(obra);
    if (!obra || fotos.length <= 1) return;
    fotoAtiva = (fotoAtiva + 1) % fotos.length;
    atualizar();
  }

  function inicializar() {
    overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Fotos do trabalho");
    overlay.innerHTML =
      '<button class="lightbox-close" aria-label="Fechar"><i data-lucide="x"></i></button>' +
      '<div class="lightbox-counter"></div>' +
      '<button class="lightbox-arrow prev" aria-label="Foto anterior"><i data-lucide="chevron-left"></i></button>' +
      '<button class="lightbox-arrow next" aria-label="Próxima foto"><i data-lucide="chevron-right"></i></button>' +
      '<figure class="lightbox-figure">' +
        '<img class="lightbox-img" src="" alt="">' +
        '<figcaption>' +
          '<span class="lightbox-cat"></span>' +
          '<h3 class="lightbox-title"></h3>' +
          '<p class="lightbox-desc"></p>' +
        '</figcaption>' +
      '</figure>' +
      '<div class="lightbox-thumbs"></div>';
    document.body.appendChild(overlay);

    overlay.querySelector(".lightbox-close").addEventListener("click", fechar);
    overlay.querySelector(".lightbox-arrow.prev").addEventListener("click", anterior);
    overlay.querySelector(".lightbox-arrow.next").addEventListener("click", proxima);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) fechar();
    });

    overlay.addEventListener("touchstart", function (e) {
      overlay._touchX = e.touches[0].clientX;
    }, { passive: true });

    overlay.addEventListener("touchend", function (e) {
      const diff = e.changedTouches[0].clientX - overlay._touchX;
      if (Math.abs(diff) > 45) {
        if (diff < 0) proxima();
        else anterior();
      }
    }, { passive: true });

    document.addEventListener("keydown", function (e) {
      if (!overlay.classList.contains("open")) return;
      if (e.key === "Escape") { fechar(); e.preventDefault(); }
      else if (e.key === "ArrowLeft") { anterior(); e.preventDefault(); }
      else if (e.key === "ArrowRight") { proxima(); e.preventDefault(); }
    });

    if (window.lucide) window.lucide.createIcons();
  }

  return { inicializar: inicializar, abrir: abrir, fechar: fechar };
})();

/* --------------------------------------------------------------------------
   APLICAÇÃO DA CONFIGURAÇÃO CENTRALIZADA
   -------------------------------------------------------------------------- */

function preencherSe(id, valor) {
  const el = document.getElementById(id);
  if (el && valor) el.textContent = valor;
}

function ehPlaceholder(valor) {
  return !valor || String(valor).indexOf("[INSERIR") === 0;
}

function aplicarConfiguracao() {
  if (CONFIG.tituloDocumento) document.title = CONFIG.tituloDocumento;

  preencherSe("hero-subtitulo", CONFIG.slogan);
  preencherSe("slogan-footer", CONFIG.slogan);
  preencherSe("copyright-nome", CONFIG.empresa);
  preencherSe("impacto-linha-1", CONFIG.impactoLinha1);
  preencherSe("impacto-linha-2", CONFIG.impactoLinha2);
  preencherSe("confianca-titulo", CONFIG.confiancaTitulo);
  preencherSe("confianca-destaque", CONFIG.confiancaDestaque);

  // Sobre
  preencherSe("sobre-titulo", CONFIG.sobreTitulo);
  preencherSe("about-badge-texto", CONFIG.sobreTitulo);
  if (CONFIG.sobreTexto && CONFIG.sobreTexto.length) {
    preencherSe("sobre-texto-1", CONFIG.sobreTexto[0]);
    preencherSe("sobre-texto-2", CONFIG.sobreTexto[1]);
    preencherSe("sobre-texto-3", CONFIG.sobreTexto[2]);
  }
  const destaques = document.getElementById("sobre-destaques");
  if (destaques && CONFIG.sobreDestaques && CONFIG.sobreDestaques.length) {
    destaques.innerHTML = CONFIG.sobreDestaques.map(function (texto) {
      return "<li>" + texto + "</li>";
    }).join("");
  }

  // Contato e localização
  preencherSe("contato-horario", CONFIG.horario);
  preencherSe("contato-endereco", CONFIG.endereco);
  preencherSe("local-endereco", CONFIG.endereco);
  preencherSe("local-horario", CONFIG.horario);

  const footerEndereco = document.getElementById("footer-endereco");
  if (footerEndereco && !ehPlaceholder(CONFIG.endereco)) {
    footerEndereco.textContent = CONFIG.endereco +
      (!ehPlaceholder(CONFIG.cidade) ? " · " + CONFIG.cidade : "");
  }

  // Telefone
  document.querySelectorAll(".js-phone").forEach(function (el) {
    const limpo = String(CONFIG.telefone || "").replace(/\s/g, "");
    if (/\d/.test(limpo)) {
      el.textContent = CONFIG.telefone;
      el.setAttribute("href", "tel:" + limpo.replace(/\D/g, ""));
    }
  });

  // E-mail
  document.querySelectorAll(".js-email").forEach(function (el) {
    if (String(CONFIG.email || "").indexOf("@") !== -1) {
      el.textContent = CONFIG.email;
      el.setAttribute("href", "mailto:" + CONFIG.email);
    }
  });

  // Redes sociais
  const instagram = document.getElementById("footer-instagram");
  if (instagram && CONFIG.instagram) instagram.setAttribute("href", CONFIG.instagram);
  const facebook = document.getElementById("footer-facebook");
  if (facebook && CONFIG.facebook) facebook.setAttribute("href", CONFIG.facebook);

  // WhatsApp (links .js-whatsapp e botão flutuante)
  if (obterWhatsapp().length >= 10) {
    const urlWhats = gerarUrlWhatsApp(CONFIG.mensagemPadrao);
    document.querySelectorAll(".js-whatsapp").forEach(function (el) {
      el.setAttribute("href", urlWhats);
    });
  }

  // Ano atual
  const anoAtual = document.getElementById("ano-atual");
  if (anoAtual) anoAtual.textContent = new Date().getFullYear();

  if (window.lucide) window.lucide.createIcons();
}

/* --------------------------------------------------------------------------
   ANIMAÇÃO DO TÍTULO DO HERO (REVEAL POR LETRA COM BLUR)
   -------------------------------------------------------------------------- */

function inicializarAnimatedText() {
  const h1 = document.querySelector(".hero-title");
  const linhas = document.querySelectorAll(".hero-title .line-inner");
  if (!h1 || !linhas.length) return;

  const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduzirMovimento) return;

  if (h1.querySelector(".hero-char")) return;

  linhas.forEach(function (linha) {
    const texto = linha.textContent.trim();
    if (!texto) return;

    linha.setAttribute("aria-hidden", "true");
    let html = "";
    let indice = 0;

    texto.split("").forEach(function (ch) {
      if (ch === " ") {
        html += '<span class="hero-char hero-char-space" aria-hidden="true">\u00A0</span>';
      } else {
        html += '<span class="hero-char" aria-hidden="true" style="--d:' + indice * 40 + 'ms">' + ch + "</span>";
        indice++;
      }
    });

    linha.innerHTML = html;
  });
}

/* --------------------------------------------------------------------------
   SERVIÇOS
   -------------------------------------------------------------------------- */

function montarServicos() {
  const grid = document.getElementById("servicosGrid");
  if (!grid || !Array.isArray(SERVICOS)) return;

  grid.innerHTML = SERVICOS.map(function (s) {
    return (
      '<article class="service-card">' +
        '<div class="service-media">' +
          '<img src="' + s.imagem + '" alt="' + s.titulo + ' — imagem demonstrativa" loading="lazy">' +
          '<div class="service-icon"><i data-lucide="' + s.icone + '"></i></div>' +
          '<span class="service-num">' + s.numero + '</span>' +
        '</div>' +
        '<div class="service-body">' +
          '<h3>' + s.titulo + '</h3>' +
          '<p>' + s.descricao + '</p>' +
          '<a href="#contato" class="service-link js-whatsapp" data-mensagem="padrao" aria-label="Solicitar orçamento de ' + s.titulo + '">' +
            'Orçamento <i data-lucide="arrow-right"></i>' +
          '</a>' +
        '</div>' +
      '</article>'
    );
  }).join("");

  if (window.lucide) window.lucide.createIcons();
}

/* --------------------------------------------------------------------------
   PORTFÓLIO — FILTROS + GRADE + CLIQUE NO LIGHTBOX
   -------------------------------------------------------------------------- */

function montarPortfolio(filtro) {
  const grid = document.getElementById("portfolioGrid");
  if (!grid) return;

  const categoria = filtro || "Todos";
  const itens = categoria === "Todos"
    ? PORTFOLIO.slice()
    : PORTFOLIO.filter(function (item) { return item.categoria === categoria; });

  if (!itens.length) {
    grid.innerHTML = '<p class="portfolio-empty">Nenhum trabalho nesta categoria.</p>';
    return;
  }

  grid.innerHTML = itens.map(function (item) {
    const tamanho = (item.tamanho && item.tamanho !== "padrao") ? " t-" + item.tamanho : "";
    return (
      '<article class="p-item' + tamanho + '" data-portfolio-id="' + item.id + '" tabindex="0" role="button" aria-label="Abrir fotos de ' + item.titulo + '">' +
        '<img class="p-item-img" src="' + item.imagem + '" alt="' + item.titulo + ' — imagem demonstrativa" loading="lazy">' +
        '<div class="p-item-overlay">' +
          '<span class="p-item-zoom"><i data-lucide="zoom-in"></i></span>' +
          '<span class="p-item-cat">' + item.categoria + '</span>' +
          '<h3 class="p-item-title">' + item.titulo + '</h3>' +
        '</div>' +
      '</article>'
    );
  }).join("");

  if (window.lucide) window.lucide.createIcons();
}

function inicializarFiltros() {
  const container = document.getElementById("portfolioFiltros");
  if (!container || !Array.isArray(PORTFOLIO)) return;

  const categorias = ["Todos"];
  PORTFOLIO.forEach(function (item) {
    if (categorias.indexOf(item.categoria) === -1) categorias.push(item.categoria);
  });

  container.innerHTML = categorias.map(function (cat, i) {
    return (
      '<button class="filter-btn' + (i === 0 ? " active" : "") + '" data-filtro="' + cat + '" aria-pressed="' + (i === 0 ? "true" : "false") + '">' + cat + '</button>'
    );
  }).join("");

  container.querySelectorAll(".filter-btn").forEach(function (botao) {
    botao.addEventListener("click", function () {
      container.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      botao.classList.add("active");
      botao.setAttribute("aria-pressed", "true");
      montarPortfolio(botao.getAttribute("data-filtro"));
    });
  });
}

function inicializarLightbox() {
  const grid = document.getElementById("portfolioGrid");
  if (!grid) return;

  Lightbox.inicializar();

  function itemDoCard(card) {
    const id = card && card.getAttribute("data-portfolio-id");
    return PORTFOLIO.find(function (p) { return p.id === id; });
  }

  function abrirItem(item) {
    if (!item) return;
    Lightbox.abrir({
      imagens: (item.imagens && item.imagens.length) ? item.imagens.slice() : [item.imagem],
      titulo: item.titulo,
      categoria: item.categoria,
      descricao: item.descricao
    });
  }

  grid.addEventListener("click", function (e) {
    const card = e.target.closest(".p-item");
    if (!card) return;
    abrirItem(itemDoCard(card));
  });

  grid.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest(".p-item");
    if (!card) return;
    e.preventDefault();
    abrirItem(itemDoCard(card));
  });
}

/* --------------------------------------------------------------------------
   ANTES → DEPOIS (abas + slider arrastável)
   -------------------------------------------------------------------------- */

function definirPosicaoSlider(pct) {
  const slider = document.getElementById("adSlider");
  const handle = document.getElementById("adHandle");
  pct = Math.max(0, Math.min(100, pct));
  if (slider) slider.style.setProperty("--pos", pct + "%");
  if (handle) handle.setAttribute("aria-valuenow", Math.round(pct));
}

function montarAntesDepois() {
  const tabs = document.getElementById("adTabs");
  if (!tabs || !Array.isArray(ANTES_DEPOIS) || !ANTES_DEPOIS.length) return;

  tabs.innerHTML = ANTES_DEPOIS.map(function (p, i) {
    return (
      '<button class="ad-tab' + (i === 0 ? " active" : "") + '" role="tab" aria-selected="' + (i === 0 ? "true" : "false") + '" data-ad-index="' + i + '">' + p.categoria + '</button>'
    );
  }).join("");

  function mostrar(i) {
    const projeto = ANTES_DEPOIS[i];
    if (!projeto) return;
    preencherSe("adImgAntes", null);
    preencherSe("adImgDepois", null);
    const antes = document.getElementById("adImgAntes");
    const depois = document.getElementById("adImgDepois");
    if (antes) antes.src = projeto.antes;
    if (depois) depois.src = projeto.depois;
    const bg = document.getElementById("adBg");
    if (bg) bg.src = projeto.depois;
    preencherSe("adCategoria", projeto.categoria);
    preencherSe("adTitulo", projeto.titulo);
    preencherSe("adDescricao", projeto.descricao);
    tabs.querySelectorAll(".ad-tab").forEach(function (botao, bi) {
      botao.classList.toggle("active", bi === i);
      botao.setAttribute("aria-selected", bi === i ? "true" : "false");
    });
    definirPosicaoSlider(50);
  }

  tabs.querySelectorAll(".ad-tab").forEach(function (botao) {
    botao.addEventListener("click", function () {
      mostrar(parseInt(botao.getAttribute("data-ad-index"), 10));
    });
  });

  mostrar(0);
}

function inicializarSliderAntesDepois() {
  const slider = document.getElementById("adSlider");
  if (!slider) return;

  function posicaoPeloPonteiro(e) {
    const rect = slider.getBoundingClientRect();
    if (!rect.width) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    definirPosicaoSlider(pct);
  }

  let arrastando = false;

  slider.addEventListener("pointerdown", function (e) {
    arrastando = true;
    try { slider.setPointerCapture(e.pointerId); } catch (err) { /* ignora */ }
    posicaoPeloPonteiro(e);
  });

  slider.addEventListener("pointermove", function (e) {
    if (!arrastando) return;
    posicaoPeloPonteiro(e);
  });

  ["pointerup", "pointercancel"].forEach(function (tipo) {
    slider.addEventListener(tipo, function () {
      arrastando = false;
    });
  });

  slider.addEventListener("keydown", function (e) {
    const handle = document.getElementById("adHandle");
    const atual = parseInt(handle ? handle.getAttribute("aria-valuenow") : "50", 10) || 50;
    if (e.key === "ArrowLeft") { definirPosicaoSlider(atual - 4); e.preventDefault(); }
    else if (e.key === "ArrowRight") { definirPosicaoSlider(atual + 4); e.preventDefault(); }
  });
}

/* --------------------------------------------------------------------------
   NOSSA OFICINA (galeria com lightbox)
   -------------------------------------------------------------------------- */

function montarOficina() {
  const grid = document.getElementById("oficinaGrid");
  if (!grid || !Array.isArray(OFICINA) || !OFICINA.length) return;

  grid.innerHTML = OFICINA.map(function (foto) {
    return (
      '<figure class="oficina-item" tabindex="0" role="button" aria-label="Ampliar: ' + foto.titulo + '">' +
        '<img src="' + foto.imagem + '" alt="' + foto.titulo + ' — imagem demonstrativa" loading="lazy">' +
        '<figcaption class="oficina-title">' + foto.titulo + '</figcaption>' +
      '</figure>'
    );
  }).join("");

  grid.querySelectorAll(".oficina-item").forEach(function (fig, i) {
    function abrir() {
      Lightbox.abrir({
        imagens: [OFICINA[i].imagem],
        titulo: OFICINA[i].titulo,
        categoria: "Nossa oficina"
      });
    }
    fig.addEventListener("click", abrir);
    fig.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrir(); }
    });
  });
}

/* --------------------------------------------------------------------------
   EQUIPE
   -------------------------------------------------------------------------- */

function montarEquipe() {
  const foto = document.getElementById("equipeFoto");
  if (foto && EQUIPE.foto) foto.src = EQUIPE.foto;
  preencherSe("equipeNome", EQUIPE.nome);
  preencherSe("equipeFuncao", EQUIPE.funcao);
  preencherSe("equipeDescricao", EQUIPE.descricao);
}

/* --------------------------------------------------------------------------
   DIFERENCIAIS
   -------------------------------------------------------------------------- */

function montarDiferenciais() {
  const grid = document.getElementById("diffGrid");
  if (!grid || !Array.isArray(DIFERENCIAIS)) return;

  grid.innerHTML = DIFERENCIAIS.map(function (d) {
    return (
      '<article class="diff-card">' +
        '<div class="diff-icon"><i data-lucide="' + d.icone + '"></i></div>' +
        '<h3>' + d.titulo + '</h3>' +
        '<p>' + d.descricao + '</p>' +
      '</article>'
    );
  }).join("");

  if (window.lucide) window.lucide.createIcons();
}

/* --------------------------------------------------------------------------
   PROCESSO — COMO FUNCIONA
   -------------------------------------------------------------------------- */

function montarProcesso() {
  const grid = document.getElementById("processoGrid");
  if (!grid || !Array.isArray(PROCESSO)) return;

  grid.innerHTML = PROCESSO.map(function (p) {
    return (
      '<article class="processo-item">' +
        '<span class="indice">PASSO</span>' +
        '<span class="processo-num">' + p.numero + '</span>' +
        '<div class="processo-icon"><i data-lucide="' + p.icone + '"></i></div>' +
        '<h3>' + p.titulo + '</h3>' +
        '<p>' + p.descricao + '</p>' +
      '</article>'
    );
  }).join("");

  if (window.lucide) window.lucide.createIcons();
}

/* --------------------------------------------------------------------------
   ESTATÍSTICAS
   -------------------------------------------------------------------------- */

function montarStats() {
  const grid = document.getElementById("statsGrid");
  if (!grid || !Array.isArray(ESTATISTICAS)) return;

  grid.innerHTML = ESTATISTICAS.map(function (s) {
    const pendente = String(s.valor).indexOf("[INSERIR") === 0;
    return (
      '<div class="stat-item">' +
        '<span class="stat-valor' + (pendente ? " pendente" : "") + '">' + (s.prefixo || "") + s.valor + (s.sufixo || "") + '</span>' +
        '<span class="stat-label">' + s.rotulo + '</span>' +
        (pendente ? '<span class="stat-nota">Aguardando dados reais</span>' : "") +
      '</div>'
    );
  }).join("");
}

/* --------------------------------------------------------------------------
   LOCALIZAÇÃO (chips + mapa)
   -------------------------------------------------------------------------- */

function montarLocalizacao() {
  const chips = document.getElementById("areaChips");
  if (chips && Array.isArray(AREA_ATENDIMENTO)) {
    chips.innerHTML = AREA_ATENDIMENTO.map(function (c) {
      return '<span class="area-chip">' + c + '</span>';
    }).join("");
  }

  const placeholder = document.getElementById("mapPlaceholder");
  const iframe = document.getElementById("mapIframe");
  const texto = document.getElementById("mapPlaceholderTexto");
  const link = document.getElementById("mapaLink");
  const coords = CONFIG.coordenadas;
  const temEndereco = !ehPlaceholder(CONFIG.endereco);

  if (coords && coords.lat && coords.lng) {
    if (iframe) {
      iframe.hidden = false;
      iframe.src = "https://maps.google.com/maps?q=" + coords.lat + "," + coords.lng + "&z=15&output=embed";
    }
    if (placeholder) placeholder.style.display = "none";
  } else {
    if (iframe) iframe.hidden = true;
    if (placeholder) placeholder.style.display = "";
    if (texto) {
      texto.textContent = temEndereco
        ? "Configurar as coordenadas (latitude/longitude) em js/config.js para exibir o mapa."
        : "Configure o endereço e as coordenadas em js/config.js para exibir o mapa.";
    }
  }

  if (link && temEndereco) {
    link.href = "https://www.openstreetmap.org/search?query=" + encodeURIComponent(CONFIG.endereco);
  }
}

/* --------------------------------------------------------------------------
   FORMULÁRIO DE ORÇAMENTO → WHATSAPP
   -------------------------------------------------------------------------- */

function inicializarFormularioWhatsApp() {
  const form = document.getElementById("formOrcamento");
  if (!form) return;

  const select = document.getElementById("fServico");
  if (select && Array.isArray(SERVICOS)) {
    SERVICOS.forEach(function (s) {
      const op = document.createElement("option");
      op.value = s.titulo;
      op.textContent = s.titulo;
      select.appendChild(op);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("fNome").value.trim();
    const whats = document.getElementById("fWhats").value.trim();

    if (!nome || whats.replace(/\D/g, "").length < 8) {
      alert("Por favor, preencha os campos obrigatórios (Nome e WhatsApp).");
      return;
    }

    let msg = CONFIG.mensagemPadrao + "\n\n";
    msg += "*Nome:* " + nome + "\n";
    msg += "*WhatsApp:* " + whats + "\n";

    const veiculo = document.getElementById("fVeiculo").value.trim();
    const ano = document.getElementById("fAno").value.trim();
    const servico = select ? select.value : "";
    const problema = document.getElementById("fProblema").value.trim();
    const adicional = document.getElementById("fMensagem").value.trim();

    if (veiculo) msg += "*Veículo:* " + veiculo + "\n";
    if (ano) msg += "*Ano:* " + ano + "\n";
    if (servico) msg += "*Serviço desejado:* " + servico + "\n";
    if (problema) msg += "*Descrição do problema:* " + problema + "\n";
    if (adicional) msg += "*Mensagem:* " + adicional + "\n";

    msg += "\nAguardo retorno. Obrigado!";

    abrirWhatsApp(msg);
  });
}

/* --------------------------------------------------------------------------
   BOTÕES WHATSAPP (.js-whatsapp)
   -------------------------------------------------------------------------- */

function inicializarBotoesWhatsApp() {
  document.querySelectorAll(".js-whatsapp").forEach(function (botao) {
    botao.addEventListener("click", function (e) {
      e.preventDefault();
      abrirWhatsApp(mensagemDoBotao(botao));
    });
  });
}

/* --------------------------------------------------------------------------
   MENU MOBILE
   -------------------------------------------------------------------------- */

function inicializarMenuMobile() {
  const botao = document.getElementById("mobileMenuBtn");
  const menu = document.querySelector(".nav-menu");

  if (!botao || !menu) return;

  function fecharMenu() {
    menu.classList.remove("active");
    botao.classList.remove("open");
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-label", "Abrir menu");
  }

  botao.addEventListener("click", function () {
    const aberto = menu.classList.toggle("active");
    botao.classList.toggle("open", aberto);
    botao.setAttribute("aria-expanded", aberto ? "true" : "false");
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", fecharMenu);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("active")) {
      fecharMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   ROLAGEM SUAVE (âncoras) + LOGO → TOPO
   O CSS já usa scroll-behavior:smooth e scroll-margin-top; aqui garantimos a
   rolagem ao topo ao clicar na logo e ajustamos o deslocamento do cabeçalho.
   -------------------------------------------------------------------------- */

function inicializarScrollSuave() {
  const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    if (link.classList.contains("js-whatsapp")) return;

    link.addEventListener("click", function (e) {
      const href = link.getAttribute("href");
      if (href === "#") return;
      const alvo = document.querySelector(href);
      if (!alvo) return;

      if (href === "#inicio") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: reduzirMovimento ? "auto" : "smooth" });
        return;
      }

      e.preventDefault();
      const headerHeight = 78;
      const topo = alvo.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: Math.max(topo, 0), behavior: reduzirMovimento ? "auto" : "smooth" });
    });
  });
}

/* --------------------------------------------------------------------------
   CABEÇALHO — VIDRO FOSCO AO ROLAR
   -------------------------------------------------------------------------- */

function iniciarHeaderGlass() {
  const header = document.getElementById("topo");
  if (!header) return;

  function aoRolar() {
    header.classList.toggle("glass", window.scrollY > 40);
  }

  aoRolar();
  window.addEventListener("scroll", aoRolar, { passive: true });
}

/* --------------------------------------------------------------------------
   SCROLL SPY — DESTACA O LINK DA SEÇÃO VISÍVEL
   -------------------------------------------------------------------------- */

function iniciarScrollSpy() {
  const links = document.querySelectorAll(".nav-menu a");
  if (!links.length) return;

  const secoes = [];
  links.forEach(function (link) {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      const secao = document.querySelector(href);
      if (secao) secoes.push({ el: secao, link: link });
    }
  });

  if (!secoes.length) return;

  const observer = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        links.forEach(function (l) { l.classList.remove("active"); });
        const item = secoes.find(function (s) { return s.el === entrada.target; });
        if (item) item.link.classList.add("active");
      }
    });
  }, { rootMargin: "-20% 0px -70% 0px" });

  secoes.forEach(function (s) { observer.observe(s.el); });
}

/* --------------------------------------------------------------------------
   ANIMAÇÕES DE ENTRADA (REVEAL AO ROLAR)
   -------------------------------------------------------------------------- */

function inicializarReveal() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal, [data-reveal], .reveal-left, .reveal-right").forEach(function (el) {
      el.classList.add("visible");
    });
    return;
  }

  const seletoresGrades = [
    ".services-grid > *",
    ".diff-grid > *",
    ".processo-grid > *",
    ".oficina-grid > *",
    ".stats-grid > *"
  ];

  const alvos = document.querySelectorAll(
    "[data-reveal], .reveal, .reveal-left, .reveal-right, " + seletoresGrades.join(", ")
  );
  if (!alvos.length) return;

  alvos.forEach(function (el, indice) {
    if (!(el.classList.contains("reveal") || el.classList.contains("reveal-left") || el.classList.contains("reveal-right") || el.hasAttribute("data-reveal"))) {
      el.classList.add("reveal");
    }
    el.style.transitionDelay = ((indice % 6) * 0.08) + "s";
  });

  const observer = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
        observer.unobserve(entrada.target);
        const atraso = parseFloat(entrada.target.style.transitionDelay || 0);
        setTimeout(function () {
          entrada.target.style.transitionDelay = "0s";
        }, atraso * 1000 + 900);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  alvos.forEach(function (el) { observer.observe(el); });
}

/* --------------------------------------------------------------------------
   PARALLAX (elementos .parallax[data-speed])
   -------------------------------------------------------------------------- */

function inicializarParallax() {
  const itens = document.querySelectorAll(".parallax[data-speed]");
  if (!itens.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.innerWidth < 900) return;

  let ticking = false;

  function aplicar() {
    itens.forEach(function (el) {
      const speed = parseFloat(el.getAttribute("data-speed")) || 0;
      if (!speed) return;

      const rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight + 300 || rect.bottom < -300) return;

      const offset = rect.top * speed;
      const clampado = Math.max(-140, Math.min(140, offset));
      el.style.transform = "translate3d(0, " + clampado.toFixed(1) + "px, 0) scale(1.18)";
    });
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(aplicar);
      ticking = true;
    }
  }, { passive: true });

  aplicar();
}

/* --------------------------------------------------------------------------
   INICIALIZAÇÃO
   -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  aplicarConfiguracao();

  montarServicos();
  montarAntesDepois();
  inicializarSliderAntesDepois();
  montarPortfolio();
  inicializarFiltros();
  inicializarLightbox();
  montarOficina();
  montarEquipe();
  montarDiferenciais();
  montarProcesso();
  montarStats();
  montarLocalizacao();

  inicializarFormularioWhatsApp();
  inicializarBotoesWhatsApp();
  inicializarMenuMobile();
  inicializarScrollSuave();
  iniciarHeaderGlass();
  iniciarScrollSpy();
  inicializarReveal();
  inicializarParallax();
  inicializarAnimatedText();

  if (window.lucide) window.lucide.createIcons();
});