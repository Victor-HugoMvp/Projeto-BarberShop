const URL_BASE = 'http://localhost:8081/agendamentos';

async function excluir(id) {
    const confirmacao = await Swal.fire({
        title: 'Excluir agendamento?',
        text: "Esta ação é irreversível e o horário voltará a ficar disponível.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#5D2E17',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
    });

    if(confirmacao.isConfirmed){
        try {
            const response = await fetch (`${URL_BASE}/deletar_agendamentos/${id}`,
                {method: 'DELETE'   
                });
            
                if(response.ok) {
                    Swal.fire('Excluído!', 'O agendamento foi removido com sucesso.', 'success');
                carregarAgendamentos(); // Recarrega a tabela automaticamente
                } else {
                    Swal.fire('Erro!', 'Não foi possível excluir no servidor.', 'error');
                }
                } catch (error) {
                    console.error("Erro ao deletar:", error);
                }
        }
    }

    async function liberar(id) {
    try {
        const response = await fetch(`${URL_BASE}/liberar/${id}`, {
            method: 'PATCH' // Conforme combinamos para usar o PUT
        });

        if (response.ok) {
            Swal.fire('Finalizado!', 'Cliente liberado e registro arquivado.', 'success');
            carregarAgendamentos(); // O item sumirá pois sua query filtra por 'ATIVO'
        } else {
            Swal.fire('Erro!', 'Falha ao liberar agendamento.', 'error');
        }
    } catch (error) {
        console.error("Erro ao liberar:", error);
    }
}

    async function editar(id) {
    const { value: novoBarbeiro } = await Swal.fire({
        title: 'Editar Barbeiro',
        input: 'select', // Alterado de 'text' para 'select'
        inputOptions: {
            'Vinicio': 'Vinicio',
            'Carlos': 'Carlos',
            'Emerson': 'Emerson'
        },
        inputLabel: 'Selecione o novo profissional responsável',
        inputPlaceholder: 'Clique para selecionar...',
        showCancelButton: true,
        confirmButtonColor: '#5D2E17',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value) {
                return 'Você precisa selecionar um barbeiro!';
            }
        }
    });

    if (novoBarbeiro) {
        try {
            const response = await fetch(`${URL_BASE}/atualizar_profissional/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    id: id,
                    profissionalNome: novoBarbeiro 
                })
            });

            if (response.ok) {
                Swal.fire('Atualizado!', `Profissional alterado para ${novoBarbeiro} com sucesso.`, 'success');
                carregarAgendamentos();
            } else {
                Swal.fire('Erro!', 'Não foi possível atualizar os dados.', 'error');
            }
        } catch (error) {
            console.error("Erro ao editar:", error);
        }
    }
}

async function carregarAgendamentos() {
    try {
        const response = await fetch(`${URL_BASE}/todos_agendamentos`)
        if(!response.ok) throw new Error('Erro ao buscar dados');
        
        const agendamentos = await response.json();
        renderizarTabela(agendamentos);
    } catch (error) {
        console.error('Erro na integração:', error);
    }
}

function renderizarTabela(lista) {
    const corpoTabela = document.getElementById('tabela-agendamentos');
    corpoTabela.innerHTML = '';

    lista.forEach(item => {
        const tr = document.createElement('tr');

        const dataFormatada = `${item.data.split('-').reverse().join('/')} ${item.horario}`;

        tr.innerHTML = `
            <td class = "info-tabela">${item.clienteNome}</td>
            <td class = "info-tabela">${item.clienteTelefone}</td>
            <td class = "info-tabela">${dataFormatada}</td>
            <td class = "info-tabela">${item.servicoNome}</td>
            <td class = "info-tabela">${item.profissionalNome}</td>
            <td class = "info-tabela">R$ ${item.servicoPreco}</td>
            <td>
                <div class="container-acoes">
                    <button class="btn btn-delete" onclick="excluir(${item.id})">Excluir</button>
                    <button class="btn btn-edit" onclick="editar(${item.id})">Editar</button>
                    <button class="btn btn-check" onclick="liberar(${item.id})">Liberar</button>
                </div>    
            </td>  
        `;
        corpoTabela.appendChild(tr);
    });
}

carregarAgendamentos();
