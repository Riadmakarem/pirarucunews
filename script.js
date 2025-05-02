document.addEventListener('DOMContentLoaded', function() {
    // Animação para o mascote do pirarucu
    const mascote = document.getElementById('mascote');
    if (mascote) {
        // Pequena animação ao passar o mouse sobre o mascote
        mascote.addEventListener('mouseover', function() {
            this.style.transform = 'rotate(5deg) scale(1.1)';
        });
        
        mascote.addEventListener('mouseout', function() {
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
        
        mascote.addEventListener('click', function() {
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
});