document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('resumo-agendamento');
    // Busca a lista de serviços
    const lista = JSON.parse(localStorage.getItem('carrinhoServicos')) || [];

    if (lista.length === 0) {
        container.innerHTML = "<p class='aviso'>Nenhum agendamento encontrado.</p>";
        return;
    }

    container.innerHTML = ''; // Limpa o container

    // Cria um card para cada serviço na lista
    lista.forEach((item, index) => {
        const dataObj = new Date(item.diaSelecionadoISO);
        const dataFormatada = dataObj.toLocaleDateString('pt-BR');

        container.innerHTML += `
            <div class="card-resumo" style="margin-bottom: 15px;">
                <div class="info-servico">
                    <h3>${item.servicoNome || "Corte Adulto"}</h3>
                    <p><i class="bi bi-clock-fill"></i> ${dataFormatada}, ${item.horarioSelecionado}</p>
                    <p><i class="bi bi-cash-stack"></i> ${item.servicoPreco || "R$ 40,00"}</p>
                    <p><strong>Profissional:</strong> ${item.profissionalNome}</p>
                </div>
                <button class="btn-deletar" onclick="removerServico(${index})">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </div>
        `;
    });
});

function removerServico(index) {
    if (confirm("Deseja remover este serviço?")) {
        let lista = JSON.parse(localStorage.getItem('carrinhoServicos')) || [];
        lista.splice(index, 1); // Remove o item pelo índice
        localStorage.setItem('carrinhoServicos', JSON.stringify(lista));
        window.location.reload(); // Recarrega para atualizar a tela
    }
}