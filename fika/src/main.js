        // Iniciar as animações WOW
        new WOW().init();

        // Menu mobile toggle
        document.getElementById('menuToggle').addEventListener('click', function() {
            document.getElementById('menu').classList.toggle('active');
        });

        // Back to top button
        window.onscroll = function() {
            scrollFunction();
        };

        function scrollFunction() {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                document.getElementById("backToTop").classList.add("active");
            } else {
                document.getElementById("backToTop").classList.remove("active");
            }
        }

        document.getElementById('backToTop').addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        // Contador de estatísticas
        const contadores = document.querySelectorAll('.contador');
        
        function animarContadores() {
            contadores.forEach(contador => {
                const valor = +contador.getAttribute('data-count');
                const duracao = 2000; // 2 segundos
                const incremento = valor / (duracao / 16); // 60fps
                
                let contagem = 0;
                
                const timer = setInterval(() => {
                    contagem += incremento;
                    contador.textContent = Math.floor(contagem);
                    
                    if (contagem >= valor) {
                        contador.textContent = valor;
                        clearInterval(timer);
                    }
                }, 16);
            });
        }

        // Iniciar contagem quando os elementos ficarem visíveis
        const observador = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animarContadores();
                    observador.disconnect();
                }
            });
        });

        if (contadores.length > 0) {
            observador.observe(document.querySelector('.estatisticas'));
        }

        // Efeito de scroll suave para links internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Ajuste para o header fixo
                        behavior: 'smooth'
                    });
                    
                    // Fechar menu mobile se estiver aberto
                    if (document.getElementById('menu').classList.contains('active')) {
                        document.getElementById('menu').classList.remove('active');
                    }
                }
            });
        });



/**
 * Função para renderizar os cards de valores dinamicamente
 * Adicionar este código ao main.js ou criar um arquivo separado
 */

document.addEventListener('DOMContentLoaded', function() {
  // Verificar se o elemento que vai conter os cards existe
  const valoresGrid = document.getElementById('valoresGrid');
  if (!valoresGrid) return;
  
  // Limpar qualquer conteúdo existente
  valoresGrid.innerHTML = '';
  
  // Para cada card nos dados, criar o elemento HTML
  valoresCards.forEach((card, index) => {
      // Criar o elemento card
      const cardElement = document.createElement('div');
      cardElement.className = 'valor-card wow fadeInUp';
      cardElement.setAttribute('data-wow-delay', `${0.1 + (index * 0.1)}s`);
      
      // Criar a estrutura interna do card
      cardElement.innerHTML = `
          <div class="valor-img">
              <img src="${card.imagem}" alt="${card.titulo}">
              <div class="valor-overlay"></div>
          </div>
          <div class="valor-content">
              <div class="valor-icon">
                  <i class="fas ${card.icone}"></i>
              </div>
              <h3>${card.titulo}</h3>
              <p>${card.descricao}</p>
          </div>
      `;
      
      // Adicionar o card ao grid
      valoresGrid.appendChild(cardElement);
  });
  
  // Reiniciar as animações WOW depois de adicionar os elementos, se WOW estiver disponível
  if (typeof WOW === 'function') {
      new WOW().init();
  }
});

// Função alternativa que usa String Template para criar todos os cards de uma vez
// Esta abordagem é mais performática para muitos elementos
function renderValoresCardsAlternative() {
  const valoresGrid = document.getElementById('valoresGrid');
  if (!valoresGrid) return;
  
  // Construir todo o HTML de uma vez
  const cardsHTML = valoresCards.map((card, index) => {
      return `
          <div class="valor-card wow fadeInUp" data-wow-delay="${0.1 + (index * 0.1)}s">
              <div class="valor-img">
                  <img src="${card.imagem}" alt="${card.titulo}">
                  <div class="valor-overlay"></div>
              </div>
              <div class="valor-content">
                  <div class="valor-icon">
                      <i class="fas ${card.icone}"></i>
                  </div>
                  <h3>${card.titulo}</h3>
                  <p>${card.descricao}</p>
              </div>
          </div>
      `;
  }).join('');
  
  // Inserir todo o HTML de uma vez (mais performático)
  valoresGrid.innerHTML = cardsHTML;
}