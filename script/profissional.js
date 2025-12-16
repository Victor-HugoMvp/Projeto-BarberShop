document.addEventListener('DOMContentLoaded', () =>{

    const servico = localStorage.getItem('servicoSelecionado');
    const spanElement = document.getElementById('nome-servicoSelecionado');

    // 2. Verifica se a informação existe e atualiza a tela
    if (servico && spanElement) {
        spanElement.textContent = servico;
    } else if (spanElement) {
        // Caso o usuário acesse a segunda tela diretamente, mostra um texto padrão
        spanElement.textContent = 'Não Selecionado'; 
    }
});

/**
 * Garante que a primeira letra de uma string esteja em maiúsculo (para o nome do mês).
 * @param {string} string - A string a ser capitalizada.
 * @returns {string} A string com a primeira letra em maiúsculo.
 */

function primeiraLetraMaiuscula(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}


/**
 * 1. FUNÇÃO PARA GERAR OS DADOS DOS PRÓXIMOS 7 DIAS
 */
function gerarDiasDaSemana() {
    const hoje = new Date();
    const dias = [];

    // Formatadores para garantir o português (pt-BR)
    const formatadorDiaSemana = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' });
    const formatadorDiaNumero = new Intl.DateTimeFormat('pt-BR', { day: 'numeric' });
    
    // Obter o mês e o ano para exibição (ex: Dezembro 2025)
    const formatadorMesAno = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' });

    let mesAnoFormatado = formatadorMesAno.format(hoje);
    mesAnoFormatado = primeiraLetraMaiuscula(mesAnoFormatado);
    const mesAno = mesAnoFormatado.replace(' de ', ' '); // Formata para "Dezembro 2025"

    for (let i = 0; i < 7; i++) {
        const proximoDia = new Date(hoje);
        // Avança a data
        proximoDia.setDate(hoje.getDate() + i); 

        // Formata e ajusta a string do dia da semana (ex: 'seg.' -> 'seg')
        const diaSemana = formatadorDiaSemana.format(proximoDia).slice(0, 3).replace('.', '');
        const diaNumero = formatadorDiaNumero.format(proximoDia);

        dias.push({
            diaSemana: diaSemana,
            diaNumero: diaNumero,
            dataCompleta: proximoDia.toISOString() // Guarda a data completa em formato ISO
        });
    }

    return { dias, mesAno };
}


/**
 * 2. FUNÇÃO PARA INSERIR OS DADOS NO HTML
 */
function preencherCalendario() {
    const { dias, mesAno } = gerarDiasDaSemana();
    const container = document.getElementById('dias-disponiveis');
    
    // Otimização: insere o mês e ano na seção (Assumindo que você tem um <h3> para o mês/ano)
    const tituloMesAno = container.previousElementSibling; // Pega o <h3> antes do container-dias
    if (tituloMesAno && tituloMesAno.tagName === 'H3') {
        tituloMesAno.textContent = mesAno;
    }
    
    if (!container) {
        console.error("Contêiner com ID 'dias-disponiveis' não encontrado.");
        return;
    }

    // Limpa qualquer conteúdo antigo
    container.innerHTML = ''; 

    // Cria e insere cada "card" de dia
    dias.forEach(dia => {
        // Cria o elemento <div> principal para o dia
        const diaCard = document.createElement('div');
        diaCard.classList.add('dia-card'); // Adiciona uma classe para estilização CSS

        // Define um atributo de dados (data-*) para fácil referência da data completa
        diaCard.dataset.data = dia.dataCompleta; 
        
        // Cria o conteúdo HTML interno
        diaCard.innerHTML = `
            <span class="dia-semana">${dia.diaSemana}</span>
            <span class="dia-numero">${dia.diaNumero}</span>
        `;
        
        // Adiciona um evento de clique (opcional, mas essencial para o agendamento)
        diaCard.addEventListener('click', () => {
            console.log(`Dia selecionado: ${dia.diaSemana}, ${dia.diaNumero}`);
            // Aqui você pode adicionar lógica para destacar o card
            // E carregar os horários disponíveis (a seção de 10:20, 11:00, etc.)
        });

        // Insere o card no contêiner
        container.appendChild(diaCard);
    });
}

// Chama a função para iniciar o preenchimento da página
preencherCalendario();
