// --- FUNÇÕES AUXILIARES ---

// Funcao para deixar primeira letra maiuscula
function primeiraLetraMaiuscula(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Funcao para salvar dados anteriores
function atualizarAgendamento(novosDados) {
    let agendamento = JSON.parse(localStorage.getItem('agendamento')) || {};
    agendamento = { ...agendamento, ...novosDados };
    localStorage.setItem('agendamento', JSON.stringify(agendamento));
}

// --- LÓGICA DE CALENDÁRIO ---

function gerarDiasDaSemana() {
    const hoje = new Date();
    const dias = [];
    const formatadorDiaSemana = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' });
    const formatadorDiaNumero = new Intl.DateTimeFormat('pt-BR', { day: 'numeric' });
    const formatadorMesAno = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' });

    let mesAnoFormatado = primeiraLetraMaiuscula(formatadorMesAno.format(hoje));
    const mesAno = mesAnoFormatado.replace(' de ', ' ');

    for (let i = 0; i < 7; i++) {
        const proximoDia = new Date(hoje);
        proximoDia.setDate(hoje.getDate() + i); 

        const diaSemana = formatadorDiaSemana.format(proximoDia).slice(0, 3).replace('.', '');
        const diaNumero = formatadorDiaNumero.format(proximoDia);

        dias.push({
            diaSemana: diaSemana,
            diaNumero: diaNumero,
            dataCompleta: proximoDia.toISOString()
        });
    }
    return { dias, mesAno };
}

function preencherCalendario() {
    const { dias, mesAno } = gerarDiasDaSemana();
    const container = document.getElementById('dias-disponiveis');
    const tituloMesAno = document.querySelector('.titulo-dias'); // Seleção direta pela classe do HTML

    if (tituloMesAno) tituloMesAno.textContent = mesAno;
    if (!container) return;

    container.innerHTML = ''; 

    dias.forEach(dia => {
        const diaCard = document.createElement('div');
        diaCard.classList.add('dia-card');
        diaCard.dataset.data = dia.dataCompleta; 
        
        diaCard.innerHTML = `
            <span class="dia-semana">${dia.diaSemana}</span>
            <span class="dia-numero">${dia.diaNumero}</span>
        `;
        
        diaCard.addEventListener('click', () => {
            document.querySelectorAll('.dia-card').forEach(card => card.classList.remove('selecionado'));
            diaCard.classList.add('selecionado');

            // Salva os dados do dia no objeto central
            atualizarAgendamento({
                diaNumero: dia.diaNumero,
                diaSemana: dia.diaSemana,
                diaSelecionadoISO: dia.dataCompleta
            });

            renderizarHorarios();
        });

        container.appendChild(diaCard);
    });
}

// --- LÓGICA DE HORÁRIOS ---

function gerarHorarios(horaInicio, minutosInicio, quantidade, intervalo) {
    const horarios = [];
    let dataReferencia = new Date();
    dataReferencia.setHours(horaInicio, minutosInicio, 0);

    for (let i = 0; i < quantidade; i++) {
        const horaFormatada = dataReferencia.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
        horarios.push(horaFormatada);
        dataReferencia.setMinutes(dataReferencia.getMinutes() + intervalo);
    }
    return horarios;
}

function renderizarHorarios() {
    const containerHorarios = document.getElementById('horarios-disponiveis');
    if (!containerHorarios) return;

    containerHorarios.innerHTML = ''; 
    const listaHorarios = gerarHorarios(10, 20, 8, 40);

    listaHorarios.forEach(horario => {
        const botao = document.createElement('button');
        botao.classList.add('horario-card');
        botao.textContent = horario;

        botao.addEventListener('click', () => {
            // 1. Estilização visual
            document.querySelectorAll('.horario-card').forEach(b => b.classList.remove('selecionado'));
            botao.classList.add('selecionado');
            
            // 2. Coleta os dados temporários (Serviço, Profissional e Dia que já foram clicados)
            let agendamentoTemporario = JSON.parse(localStorage.getItem('agendamento')) || {};
            
            // 3. Adiciona o horário e o nome do serviço (importante para o card)
            agendamentoTemporario.horarioSelecionado = horario;
            agendamentoTemporario.servicoNome = localStorage.getItem('servicoNome') || "Serviço";

            // 4. Pega a lista do carrinho ou cria uma nova
            let carrinho = JSON.parse(localStorage.getItem('carrinhoServicos')) || [];

            // 5. Adiciona o serviço completo à lista
            carrinho.push(agendamentoTemporario);

            // 6. Salva o carrinho e limpa o temporário para não dar conflito no próximo
            localStorage.setItem('carrinhoServicos', JSON.stringify(carrinho));
            localStorage.removeItem('agendamento'); 

            // 7. Vai para a tela de finalização
            window.location.href = 'agendamentos.html'; 
        });

        containerHorarios.appendChild(botao);
    });
}

// --- INICIALIZAÇÃO ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Atualiza o nome do serviço no topo
    const servico = localStorage.getItem('servicoNome');
    const spanElement = document.getElementById('nome-servicoSelecionado');
    if (spanElement) spanElement.textContent = servico || 'Não Selecionado';

    // 2. Configura botões de profissionais
    const botoesProfissionais = document.querySelectorAll('.buttonProfissional');
    botoesProfissionais.forEach((botao, index) => {
        botao.addEventListener('click', function() {
            const nomeBarbeiro = this.parentElement.querySelector('.professionalName').innerText;
            
            atualizarAgendamento({
                profissionalId: index + 1,
                profissionalNome: nomeBarbeiro
            });

            botoesProfissionais.forEach(b => b.classList.remove('botaoProfissionalClicado'));
            this.classList.add('botaoProfissionalClicado');
        });
    });

    // 3. Gera o calendário
    preencherCalendario();
});