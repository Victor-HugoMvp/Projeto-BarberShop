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

let indexParaRemover = null; // Variável para guardar o índice temporariamente

function removerServico(index) {
    indexParaRemover = index;
    const modal = document.getElementById('modal-confirmacao');
    modal.style.display = 'flex'; // Exibe o modal
}

// Lógica para os botões do Modal
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal-confirmacao');
    const btnCancelar = document.getElementById('btn-cancelar');
    const btnConfirmar = document.getElementById('btn-confirmar-remocao');

    // Se clicar em Cancelar, apenas fecha o modal
    btnCancelar.addEventListener('click', () => {
        modal.style.display = 'none';
        indexParaRemover = null;
    });

    // Se clicar em Confirmar, executa a lógica de remoção
    btnConfirmar.addEventListener('click', () => {
        if (indexParaRemover !== null) {
            let lista = JSON.parse(localStorage.getItem('carrinhoServicos')) || [];
            lista.splice(indexParaRemover, 1);
            localStorage.setItem('carrinhoServicos', JSON.stringify(lista));
            
            modal.style.display = 'none';
            window.location.reload(); // Recarrega para atualizar a tela
        }
    });

    // Fecha o modal se clicar fora da caixa branca
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});
