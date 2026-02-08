const modalAlerta = document.getElementById('modal-alerta-info');
const modalFinalizar = document.getElementById('modal-finalizar');

// CORREÇÃO: Adicionado o parâmetro 'm' para as funções funcionarem
function abrirModal(m){
    if(m) m.style.display = 'flex';
}

function fecharModal(m){
    if(m) m.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    // Botão do modal de erro
    const btnConfirmarAlerta = document.getElementById('btn-confirmar');
    if(btnConfirmarAlerta){
        btnConfirmarAlerta.addEventListener('click', () => fecharModal(modalAlerta));
    }

    // Botão do modal de sucesso (LIMPA O CARRINHO E VOLTA)
    const btnConcluirGeral = document.getElementById('btn-concluir-agendamento');
    if(btnConcluirGeral){
        btnConcluirGeral.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = 'index.html';    
        });
    }

    // Fechar ao clicar fora
    window.onclick = (event) => {
        if(event.target == modalAlerta) fecharModal(modalAlerta);
        if(event.target == modalFinalizar) fecharModal(modalFinalizar);
    };
});

document.getElementById('btn-finalizar').addEventListener('click', async function() {
    // 1. Captura as informações do usuário dos inputs da tela
    const nome = document.getElementById('nome-cliente').value;
    const celular = document.getElementById('celular-cliente').value;
    
    // 2. Recupera a lista de serviços (o carrinho) do localStorage
    const carrinho = JSON.parse(localStorage.getItem('carrinhoServicos')) || [];

    if (!nome || !celular || carrinho.length === 0) {
        abrirModal(modalAlerta);
        return;
    };

    /* 3. MONTAGEM DO PAYLOAD (Corresponde ao AgendamentoRequestDTO)
       A chave 'agendamentos' deve ter o mesmo nome da List no Java
    */
    const dadosParaEnviar = {

      clienteDto:{  
        clienteNome: nome,
        clienteCelular: celular,
      },
      
      diaSelecionadoISO: carrinho[0].diaSelecionadoISO,

        agendamentos: carrinho.map(item => ({
            // Mapeia para o ItemServicoDTO
            servicoId: item.servicoId,
            servicoNome: item.servicoNome,
            servicoPreco: item.servicoPreco,
            horarioSelecionado: item.horarioSelecionado,
        profissionalDto:{
            profissionalId: item.profissionalId,
            profissionalNome: item.profissionalNome
        },
            
        }))
    };

    try {
        // 4. Envio para o endpoint do Spring Boot
        const response = await fetch('http://localhost:8081/agendamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosParaEnviar)
        });

        if (response.ok) {
            const resultado = await response.json();
            abrirModal(modalFinalizar);
            return;
        } else {
            const erro = await response.text();
            alert("Erro no servidor: " + erro);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Não foi possível conectar ao servidor backend.");
    }
});