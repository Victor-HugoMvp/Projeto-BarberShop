document.addEventListener('DOMContentLoaded', () => {
    // 1. Localiza o container no HTML pelo ID correto
    const container = document.getElementById('resumo-agendamento');
    
    // 2. Recupera o objeto de agendamento do localStorage
    const dados = JSON.parse(localStorage.getItem('agendamento'));

    // Verifica se os dados existem antes de tentar gerar o card
    if (!dados || !dados.horarioSelecionado) {
        container.innerHTML = "<p class='aviso'>Nenhum agendamento encontrado.</p>";
        return;
    }

    // 3. Formatação da data (ISO para formato brasileiro)
    const dataObj = new Date(dados.diaSelecionadoISO);
    const dataFormatada = dataObj.toLocaleDateString('pt-BR');

    // 4. Injeta o HTML do card dentro do container
    container.innerHTML = `
        <div class="card-resumo">
            <div class="info-servico">
                <h3>${dados.servicoNome || "Corte Adulto"}</h3>
                <p><i class="bi bi-clock-fill"></i> ${dataFormatada}, ${dados.horarioSelecionado}</p>
                <p><i class="bi bi-cash-stack"></i> ${dados.servicoPreco || "R$ 40,00"}</p>
                <p><strong>Profissional:</strong> ${dados.profissionalNome}</p>
            </div>
            <button class="btn-deletar" onclick="removerServico()">
                <i class="bi bi-trash3-fill"></i>
            </button>
        </div>
    `;
});

// Função para excluir o agendamento e limpar o localStorage
function removerServico() {
    if (confirm("Deseja remover este agendamento?")) {
        localStorage.removeItem('agendamento');
        window.location.href = 'index.html'; // Redireciona para a primeira tela
    }
}