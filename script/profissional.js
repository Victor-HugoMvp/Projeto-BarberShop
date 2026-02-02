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

async function renderizarHorarios() {
    const containerHorarios = document.getElementById('horarios-disponiveis');
    if (!containerHorarios) return;

    const agendamentoTemp  = JSON.parse(localStorage.getItem('agendamento')) || {}
    const profissionalId = agendamentoTemp.profissionalId;
    const dataSelecionada = agendamentoTemp.diaSelecionadoISO;

    if (!profissionalId || !dataSelecionada) {
        console.error("Profissional ou Data não selecionados.");
        return;
    }

    containerHorarios.innerHTML = 'Carregando horários...';

    try {
        const response = await fetch(`http://localhost:8081/agendamentos/ocupados?profissionalId=${profissionalId}&data=${dataSelecionada}`);
        const horariosOcupados = await response.json();

        containerHorarios.innerHTML = ''; 
        const listaHorarios = gerarHorarios(10, 20, 8, 40);

        listaHorarios.forEach(horario => {
            const estaOcupado = horariosOcupados.some(h => h.startsWith(horario));

            if(!estaOcupado) {
                const botao = document.createElement('buttton');
                botao.classList.add('horario-card');
                botao.textContent = horario;

                botao.addEventListener('click', () => {
                    // --- Sua lógica de salvar no carrinho (permanece igual) ---
                    document.querySelectorAll('.horario-card').forEach(b => b.classList.remove('selecionado'));
                    botao.classList.add('selecionado');
                    
                    let agendamentoTemporario = JSON.parse(localStorage.getItem('agendamento')) || {};
                    agendamentoTemporario.horarioSelecionado = horario;
                    agendamentoTemporario.servicoNome = localStorage.getItem('servicoNome') || "Serviço";

                    let carrinho = JSON.parse(localStorage.getItem('carrinhoServicos')) || [];
                    carrinho.push(agendamentoTemporario);

                    localStorage.setItem('carrinhoServicos', JSON.stringify(carrinho));
                    localStorage.removeItem('agendamento'); 
                    window.location.href = 'agendamentos.html'; 
                }); 
                containerHorarios.appendChild(botao);
            }
        });
    }   
    catch(error) {
        console.error("Erro ao carregar horários ocupados:", error);
        containerHorarios.innerHTML = 'Erro ao carregar horários.';
    }

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

