# INOVE Mecânica — Site Institucional

Site estático profissional para a oficina **INOVE Mecânica**, com identidade visual industrial (preto, branco e vermelho). Desenvolvido em HTML, CSS e JavaScript puro — sem dependências de build, pronto para hospedar no **GitHub Pages** ou em qualquer servidor estático.

## Recursos

- Design responsivo (desktop, tablet e mobile)
- Hero com animação de título letra a letra + efeito parallax
- Galeria **Antes → Depois** com slider arrastável
- Portfólio com **filtros por categoria** e **lightbox** (teclado e gestos)
- Formulário de orçamento que envia a solicitação pelo **WhatsApp**
- Botão flutuante do WhatsApp
- Configuração centralizada em `js/config.js`
- SEO básico (meta tags, Open Graph, Twitter Cards, sitemap, robots)
- Suporte a `prefers-reduced-motion`

## Estrutura

```
inove-mecanica/
├── index.html              # Página principal (toda a estrutura e âncoras)
├── css/
│   └── style.css           # Estilos (paleta, seções, responsividade)
├── js/
│   ├── config.js           # ⚙️ TODAS as informações editáveis do site
│   └── script.js           # Funcionalidades e renderização
└── assets/
    └── images/
        ├── logo/           # logo-inove.svg + favicon.svg
        ├── hero/           # imagem do hero (demonstrativa)
        ├── oficina/        # galeria "Nossa Oficina" (demonstrativa)
        ├── mecanicos/      # foto da equipe (demonstrativa)
        ├── servicos/       # capas dos serviços (demonstrativas)
        ├── antes-depois/   # projetos antes/depois (demonstrativas)
        └── portfolio/      # trabalhos realizados por categoria (demonstrativas)
```

## Como personalizar

### 1. Dados da empresa
Abra **`js/config.js`**. É o único arquivo que você precisa editar para atualizar:

- Nome, slogan, textos institucionais (seção Sobre)
- WhatsApp, telefone, e-mail
- Endereço, cidade, horário de atendimento, área de atendimento
- Coordenadas do mapa (veja abaixo)
- Redes sociais (Instagram e Facebook)

> **Regra importante:** nenhuma informação real deve ser inventada. Valores ainda desconhecidos permanecem como `[INSERIR ...]` e o site os exibe corretamente.

### 2. WhatsApp
```js
whatsapp: "5541999999999",   // 55 + DDD + número, somente dígitos
```
Enquanto o número não for preenchido, os botões exibem um aviso amigável. O formulário de orçamento também depende desse número para enviar a mensagem.

### 3. Mapa
Em `js/config.js`:
```js
endereco: "Rua exemplo, 123 — Centro",
cidade: "Curitiba",
coordenadas: { lat: -25.4284, lng: -49.2733 }  // ou null
```
Com `coordenadas` preenchido, o site exibe o mapa embutido. Sem ele, mostra um placeholder com link "Como chegar" (OpenStreetMap).

### 4. Imagens
Todas as imagens atuais são **demonstrativas** (fotos de banco de imagens). Substitua pelos arquivos reais mantendo **os mesmos caminhos e nomes**:

- `assets/images/hero/hero-02.png` — foto do hero
- `assets/images/oficina/oficina-01.jpg` … `oficina-06.jpg` — galeria da oficina
- `assets/images/mecanicos/mecanico-01.jpg` — foto da equipe
- `assets/images/servicos/*.jpg` — capas dos 6 serviços
- `assets/images/antes-depois/projeto-01..04/{antes,depois}.jpg` — fotos reais de antes/depois
- `assets/images/portfolio/{motor,freios,suspensao,revisao,outros}/*.jpg` — trabalhos realizados

Para adicionar mais fotos no portfólio ou nos trabalhos antes/depois, edite as listas `PORTFOLIO` e `ANTES_DEPOIS` (veja os comentários dentro do próprio `config.js`).

### 5. Estatísticas
Enquanto os números reais não forem confirmados, mantenha `"[INSERIR NÚMERO]"`. O site exibirá o marcador de forma elegante e você atualiza em `ESTATISTICAS` quando tiver os dados.

## Como publicar (GitHub Pages)

1. Crie um repositório no GitHub (ex.: `inove-mecanica`) e envie estes arquivos.
2. Em **Settings → Pages**, defina `Branch: main` e pasta `/ (root)`. Pronto.
3. Atualize a URL em `robots.txt`, `sitemap.xml` e nas meta tags `canonical`/`og:url` do `index.html` (já configuradas para `https://brunoscrock.github.io/site-mecanica/`).

## Notas

- Ícones via [Lucide](https://lucide.dev) e fontes via Google Fonts (Bebas Neue, Rajdhani, Inter).
- Antes de publicar, abra o `index.html` localmente ou sirva com qualquer servidor estático (ex.: `npx serve`).
- Os dados estruturados (Schema.org) estão comentados no `index.html` — descomente quando tiver os dados reais (endereço, telefone, horários).