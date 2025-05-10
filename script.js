document.addEventListener('DOMContentLoaded', function () {
    // Animação para o mascote do pirarucu
    const mascote = document.getElementById('mascote');
    if (mascote) {
        // Pequena animação ao passar o mouse sobre o mascote
        mascote.addEventListener('mouseover', function () {
            this.style.transform = 'rotate(5deg) scale(1.1)';
        });

        mascote.addEventListener('mouseout', function () {
            this.style.transform = 'rotate(0) scale(1)';
        });

        // Adiciona uma mensagem aleatória ao clicar no mascote
        const mensagens = [
            "Está bombando na Amazônia!",
            "Aqui tem as últimas notícias!",
            "O pirarucu traz novidades quentinhas!",
            "Mergulhe nas notícias amazônicas!",
            "Fique por dentro do que acontece na região!"
        ];

        mascote.addEventListener('click', function () {
            const mensagemAleatoria = mensagens[Math.floor(Math.random() * mensagens.length)];

            // Verifica se já existe um balão de mensagem
            let balao = document.querySelector('.balao-mensagem');

            if (balao) {
                // Atualiza a mensagem existente
                balao.textContent = mensagemAleatoria;
                // Reinicia a animação
                balao.style.animation = 'none';
                setTimeout(() => {
                    balao.style.animation = 'fadeInOut 3s forwards';
                }, 10);
            } else {
                // Cria um novo balão de mensagem
                balao = document.createElement('div');
                balao.className = 'balao-mensagem';
                balao.textContent = mensagemAleatoria;
                balao.style.animation = 'fadeInOut 3s forwards';

                // Adiciona o balão próximo ao mascote
                const logoContainer = document.querySelector('.logo-container');
                logoContainer.appendChild(balao);

                // Remove o balão após a animação
                setTimeout(() => {
                    if (balao.parentNode) {
                        balao.parentNode.removeChild(balao);
                    }
                }, 3000);
            }
        });
    }

    // Destaque para as notícias com selos
    const noticiasDestacadas = document.querySelectorAll('.noticia.bombando, .noticia.urgente, .noticia.trending');

    noticiasDestacadas.forEach(noticia => {
        // Adiciona um efeito de pulsar para chamar atenção
        let contador = 0;
        const intervalo = setInterval(() => {
            const selo = noticia.querySelector('.selo');
            if (selo) {
                selo.style.transform = contador % 2 === 0 ? 'scale(1.1)' : 'scale(1)';
                contador++;

                // Para a animação após algumas pulsações
                if (contador > 10) {
                    clearInterval(intervalo);
                    selo.style.transform = 'scale(1)';
                }
            }
        }, 500);
    });

    // Atualização dinâmica para a seção "Últimas Notícias"
    const ultimasNoticias = document.querySelectorAll('.ultimas div');

    // Simula o recebimento de novas notícias a cada 30 segundos
    setInterval(() => {
        // Seleciona uma notícia aleatória para substituir
        if (ultimasNoticias.length > 0) {
            const indiceAleatorio = Math.floor(Math.random() * ultimasNoticias.length);
            const noticiaParaAtualizar = ultimasNoticias[indiceAleatorio];

            // Adiciona classe para animar a transição
            noticiaParaAtualizar.classList.add('atualizar');

            // Após a animação de saída, atualiza o conteúdo
            setTimeout(() => {
                // Array de possíveis novas notícias amazônicas
                const novasNoticias = [
                    "Novo recorde de visitantes no Teatro Amazonas",
                    "Fruticultura amazônica ganha mercado internacional",
                    "Artesãos de Santarém expõem no exterior",
                    "Farinha de Cruzeiro do Sul é destaque em feira",
                    "Encontro de Tambores acontece em Macapá",
                    "Festival de cinema amazônico anuncia vencedores",
                    "Peixe-boi resgatado retorna à natureza",
                    "Açaí de Codajás bate recorde de produção"
                ];

                // Seleciona uma notícia aleatória que não seja a atual
                let novaNoticias;
                do {
                    novaNoticias = novasNoticias[Math.floor(Math.random() * novasNoticias.length)];
                } while (novaNoticias === noticiaParaAtualizar.textContent);

                // Atualiza a notícia
                noticiaParaAtualizar.textContent = novaNoticias;

                // Remove a classe para animar a entrada
                noticiaParaAtualizar.classList.remove('atualizar');
            }, 500);
        }
    }, 30000); // 30 segundos

    // Sistema de popups
    const body = document.body;
    let activePopup = null;

    // Configurar todos os links para abrir popups
    setupPopupLinks();
    setupNewsPopups();

    function setupPopupLinks() {
        const navLinks = document.querySelectorAll('nav ul li a');
        const footerLinks = document.querySelectorAll('.footer-links ul li a');

        // Configurar links de navegação
        navLinks.forEach(link => {
            if (link.classList.contains('active')) return; // Ignorar link ativo

            link.addEventListener('click', function (e) {
                e.preventDefault();
                const section = this.textContent;
                openSectionPopup(section);
            });
        });

        // Configurar links de rodapé
        footerLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const section = this.textContent;
                openFooterPopup(section);
            });
        });
    }

    function setupNewsPopups() {
        // Configurar cliques em notícias para abrir popups
        const newsItems = document.querySelectorAll('.noticia');
        const ultimasItems = document.querySelectorAll('.ultimas div');

        newsItems.forEach(item => {
            // Substituir o link para abrir o popup
            const link = item.querySelector('a');
            const title = item.querySelector('h3').textContent;
            const content = item.querySelector('p').textContent;

            if (link) {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    openNewsPopup(title, content);
                });
            }

            // Fazer a notícia inteira clicável
            item.style.cursor = 'pointer';
            item.addEventListener('click', function (e) {
                if (!e.target.closest('a')) {
                    openNewsPopup(title, content);
                }
            });
        });

        // Configurar últimas notícias
        ultimasItems.forEach(item => {
            if (item.tagName !== 'H2') {
                item.style.cursor = 'pointer';
                item.addEventListener('click', function () {
                    openNewsPopup(this.textContent, 'Conteúdo completo da notícia será disponibilizado em breve.');
                });
            }
        });
    }

    function openSectionPopup(sectionName) {
        let content = '';

        switch (sectionName) {
            case 'Cultura':
                content = `<h2>Cultura da Amazônia</h2>
                <p>Bem-vindo à seção de Cultura! Aqui você encontrará notícias sobre eventos culturais, festivais, 
                tradições e manifestações artísticas da região amazônica.</p>
                <div class="popup-news-grid">
                    <div class="popup-news-item">
                        <h3>Festival de Parintins 2025</h3>
                        <p>O maior festival folclórico do Norte do Brasil acontecerá em junho de 2025 com atrações renovadas.</p>
                    </div>
                    <div class="popup-news-item">
                        <h3>Artesanato indígena em exposição</h3>
                        <p>Mostra reúne peças de 12 etnias da Amazônia no Museu de Arte de Manaus.</p>
                    </div>
                </div>`;
                break;
            case 'Música':
                content = `<h2>Música da Amazônia</h2>
                <p>A cena musical amazônica é rica e diversa, com influências indígenas, africanas e europeias.</p>
                <div class="popup-news-grid">
                    <div class="popup-news-item">
                        <h3>Festival Amazônia Jazz</h3>
                        <p>O evento acontecerá em Belém com artistas internacionais e talentos regionais.</p>
                    </div>
                    <div class="popup-news-item">
                        <h3>Novo álbum de Dona Onete</h3>
                        <p>A rainha do carimbó lança seu quarto trabalho celebrando os ritmos paraenses.</p>
                    </div>
                </div>`;
                break;
            case 'Subúrbio':
                content = `<h2>Notícias dos Subúrbios</h2>
                <p>Cobertura especial dos acontecimentos nas periferias e subúrbios da região amazônica.</p>
                <div class="popup-news-grid">
                    <div class="popup-news-item">
                        <h3>Projeto de urbanização em Icoaraci</h3>
                        <p>Obras de saneamento básico beneficiam mais de 5 mil famílias no distrito de Belém.</p>
                    </div>
                    <div class="popup-news-item">
                        <h3>Biblioteca comunitária em Macapá</h3>
                        <p>Iniciativa de moradores transforma espaço abandonado em centro cultural.</p>
                    </div>
                </div>`;
                break;
            case 'Esportes':
                content = `<h2>Esportes na Amazônia</h2>
                <p>Acompanhe as notícias esportivas da região Norte, incluindo futebol, vôlei, natação e esportes tradicionais.</p>
                <div class="popup-news-grid">
                    <div class="popup-news-item">
                        <h3>Remo e Paysandu se preparam para o clássico</h3>
                        <p>O Re-Pa do próximo domingo promete lotar o estádio Mangueirão em Belém.</p>
                    </div>
                    <div class="popup-news-item">
                        <h3>Liga de Vôlei da Amazônia</h3>
                        <p>Competição reúne times de cinco estados em busca do título regional.</p>
                    </div>
                </div>`;
                break;
            default:
                content = `<h2>${sectionName}</h2><p>Conteúdo em desenvolvimento.</p>`;
        }

        createPopup(content);
    }

    function openFooterPopup(sectionName) {
        let content = '';

        switch (sectionName) {
            case 'Sobre':
                content = `<h2>Sobre o PirarucuNews</h2>
                <p>O PirarucuNews é um portal de notícias dedicado a compartilhar histórias e acontecimentos 
                da região amazônica. Fundado em 2023, nosso objetivo é dar visibilidade à cultura, música, 
                esportes e vida nos subúrbios da Amazônia.</p>
                <p>Nossa equipe é formada por jornalistas e colaboradores nativos da região, 
                comprometidos em oferecer conteúdo autêntico e de qualidade.</p>`;
                break;
            case 'Contato':
                content = `<h2>Entre em Contato</h2>
                <form class="contact-form">
                    <div class="form-group">
                        <label for="name">Nome:</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Mensagem:</label>
                        <textarea id="message" name="message" rows="5" required></textarea>
                    </div>
                    <button type="button" onclick="alert('Mensagem enviada! Retornaremos em breve.')">Enviar</button>
                </form>`;
                break;
            case 'Política de Privacidade':
                content = `<h2>Política de Privacidade</h2>
                <p>O PirarucuNews está comprometido com a proteção de sua privacidade. Esta política 
                descreve como coletamos e usamos informações pessoais.</p>
                <h3>Coleta de Informações</h3>
                <p>Coletamos apenas as informações necessárias para fornecer nossos serviços, 
                como nome e email quando você se inscreve em nossa newsletter.</p>
                <h3>Uso de Cookies</h3>
                <p>Utilizamos cookies para melhorar sua experiência em nosso site, lembrar suas preferências 
                e fornecer conteúdo personalizado.</p>`;
                break;
            case 'Termos de Uso':
                content = `<h2>Termos de Uso</h2>
                <p>Ao acessar o PirarucuNews, você concorda com estes termos de uso.</p>
                <h3>Conteúdo</h3>
                <p>Todo o conteúdo disponibilizado em nosso site é protegido por direitos autorais. 
                Não é permitida a reprodução sem autorização prévia.</p>
                <h3>Comportamento do Usuário</h3>
                <p>Esperamos que todos os usuários respeitem as normas de convivência online, 
                evitando comentários ofensivos ou discriminatórios.</p>`;
                break;
            default:
                content = `<h2>${sectionName}</h2><p>Conteúdo em desenvolvimento.</p>`;
        }

        createPopup(content);
    }

    function openNewsPopup(title, content) {
        const fullContent = `
            <h2>${title}</h2>
            <div class="news-content">
                <p>${content}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. 
                Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
                <p>Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere. 
                Suspendisse in est ante in nibh mauris cursus mattis molestie a iaculis.</p>
                <div class="news-image" style="background-color: #f0f0f0; height: 200px; display: flex; align-items: center; justify-content: center; margin: 15px 0;">
                    <span>[Imagem da notícia]</span>
                </div>
                <p>Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. 
                Duis leo. Sed fringilla mauris sit amet nibh.</p>
            </div>
        `;

        createPopup(fullContent);
    }

    function createPopup(content) {
        // Fechar popup ativo, se houver
        closeActivePopup();

        // Criar overlay
        const overlay = document.createElement('div');
        overlay.className = 'popup-overlay';

        // Criar container do popup
        const popup = document.createElement('div');
        popup.className = 'popup';

        // Adicionar conteúdo
        popup.innerHTML = `
            <div class="popup-header">
                <button class="popup-close">&times;</button>
            </div>
            <div class="popup-content">
                ${content}
            </div>
        `;

        // Adicionar ao DOM
        overlay.appendChild(popup);
        body.appendChild(overlay);
        activePopup = overlay;

        // Evitar rolagem da página
        body.style.overflow = 'hidden';

        // Adicionar eventos
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                closeActivePopup();
            }
        });

        const closeBtn = popup.querySelector('.popup-close');
        closeBtn.addEventListener('click', closeActivePopup);

        // Animar entrada
        setTimeout(() => {
            overlay.classList.add('active');
            popup.classList.add('active');
        }, 10);
    }

    function closeActivePopup() {
        if (activePopup) {
            const popup = activePopup.querySelector('.popup');

            // Animar saída
            activePopup.classList.remove('active');
            popup.classList.remove('active');

            // Remover após animação
            setTimeout(() => {
                activePopup.remove();
                activePopup = null;
                body.style.overflow = '';
            }, 300);
        }
    }

    // Fechar com Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && activePopup) {
            closeActivePopup();
        }
    });
});