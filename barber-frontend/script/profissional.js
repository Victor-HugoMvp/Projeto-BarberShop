/* Funcao para atribuir o servico selecionado a h3 */
document.addEventListener('DOMContentLoaded', () =>{

    const servico = localStorage.getItem('servicoSelecionado');
    const spanElement = document.getElementById('nome-servicoSelecionado');

    // 2. Verifica se a informação existe e atualiza a tela
    if (servico && spanElement) {
        spanElement.textContent = servico;
    } else if (spanElement)
        // Caso o usuário acesse a segunda tela diretamente, mostra um texto padrão
        spanElement.textContent = 'Não Selecionado'; 
    }
);

/**
 * Garante que a primeira letra de uma string esteja em maiúsculo (para o nome do mês).
 * @param {string} string - A string a ser capitalizada.
 * @returns {string} A string com a primeira letra em maiúsculo.
 */

function primeiraLetraMaiuscula(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}


// 1. Seleciona TODOS os botões que têm essa classe
const botoesProfissionais = document.querySelectorAll('.buttonProfissional');

// 2. Loop para adicionar o evento em cada um deles
botoesProfissionais.forEach(botao => {
    botao.addEventListener('click', function() {
        
        // 3. Remove a classe 'clicado' de TODOS os botões antes de marcar o novo
        // Isso garante que apenas UM profissional fique selecionado por vez
        botoesProfissionais.forEach(b => {
            b.classList.remove('botaoProfissionalClicado');
        });

        // 4. Adiciona a classe e muda o texto apenas no botão que foi clicado
        this.classList.add('botaoProfissionalClicado');
        
        console.log("Profissional escolhido:", this.parentElement.querySelector('p')?.innerText || "Selecionado");
    });
});


const cards = document.querySelectorAll('professional-card');

// Função que armazena o ID do profissional
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
         const idProfissional = index + 1;
         localStorage.setItem('profissionalId', idProfissional);   

         cards.forEach(c => c.classList.remove('selecionado'));
         card.classList.add('selecionado');
    });
});


/**
 * 1. FUNÇÃO PARA GERAR OS DADOS DOS PRÓXIMOS 7 DIAS
 */
function gerarDiasDaSemana() {
    //Variavel que recebe o construtor de data
    const hoje = new Date();
    //Array que recebe os dias
    const dias = [];

    // Formatadores para garantir o português (pt-BR)
    const formatadorDiaSemana = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' });
    const formatadorDiaNumero = new Intl.DateTimeFormat('pt-BR', { day: 'numeric' });
    
    // Obter o mês e o ano para exibição (ex: Dezembro 2025)
    const formatadorMesAno = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' });

    // Recebe o mes e o ano e puxa a formatacao de primeira letra maiuscula
    let mesAnoFormatado = formatadorMesAno.format(hoje);
    mesAnoFormatado = primeiraLetraMaiuscula(mesAnoFormatado);
    const mesAno = mesAnoFormatado.replace(' de ', ' '); // Formata para "Dezembro 2025"

    //Iteracao para receber os proximos dias e puxar para o array de dias 
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
    
    // Otimização: insere o mês e ano na seção
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
        
        // Adiciona um evento de clique (essencial para o agendamento)
        diaCard.addEventListener('click', () => {
            document.querySelectorAll('.dia-card').forEach(card => card.classList.remove('selecionado'));
            diaCard.classList.add('selecionado');

        // 2. CHAMA A FUNÇÃO DE HORÁRIOS AQUI
            renderizarHorarios();
    
            console.log(`Dia selecionado: ${dia.diaNumero}`);
         });

        // Insere o card no contêiner
            container.appendChild(diaCard);
        });
}

// Chama a função para iniciar o preenchimento do calendario
preencherCalendario();

function gerarHorarios(horaInicio, minutosInicio, quantidade, intervalo) {
    //Gera array para receber horarios
    const horarios = [];

    //Constructor de datas
    let dataReferencia = new Date();

    //Padrao para setar horas
    dataReferencia.setHours(horaInicio, minutosInicio, 0);

    for (let i = 0; i < quantidade; i++) {
        const horaFormatada = dataReferencia.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
        horarios.push(horaFormatada);
        
        // Adiciona os 40 minutos para o próximo loop
        dataReferencia.setMinutes(dataReferencia.getMinutes() + intervalo);
    }
    return horarios;
}

// Funcao para inserir horarios no html
function renderizarHorarios() {
    const containerHorarios = document.getElementById('horarios-disponiveis');
    if (!containerHorarios) return;

    containerHorarios.innerHTML = ''; // Limpa antes de preencher

    // Geramos, por exemplo, 8 horários começando 10:20 com intervalo de 40min
    const listaHorarios = gerarHorarios(10, 20, 8, 40);

    listaHorarios.forEach(horario => {
        const botao = document.createElement('button');
        botao.classList.add('horario-card');
        botao.textContent = horario;

        botao.addEventListener('click', () => {
            // Remove seleção dos outros e marca o atual
            document.querySelectorAll('.horario-card').forEach(b => b.classList.remove('selecionado'));
            botao.classList.add('selecionado');
            console.log("Horário escolhido:", horario);
        });

    botao.addEventListener('click', () => {
    // 1. Salva o horário no localStorage
    localStorage.setItem('horarioSelecionado', horario);
    
    // 2. O dia já deve estar selecionado, então pegamos ele do card selecionado
    const diaCard = document.querySelector('.dia-card.selecionado');
    if (diaCard) {
        localStorage.setItem('diaSelecionadoISO', diaCard.dataset.data);
    }

    // 3. Redireciona para a tela de confirmação (resumo)
    window.location.href = 'finalizar.html'; 
});

        containerHorarios.appendChild(botao);
    });
}
