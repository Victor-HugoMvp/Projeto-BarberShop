document.getElementById('btn-finalizar').addEventListener('click', async function() {
    // 1. Captura as informações do usuário dos inputs da tela
    const nome = document.getElementById('nome-cliente').value;
    const celular = document.getElementById('celular-cliente').value;
    
    // 2. Recupera a lista de serviços (o carrinho) do localStorage
    const carrinho = JSON.parse(localStorage.getItem('carrinhoServicos')) || [];

    // Validação básica
    if (!nome || !celular || carrinho.length === 0) {
        alert("Por favor, preencha todos os campos e certifique-se de ter serviços selecionados.");
        return;
    }

    /* 3. MONTAGEM DO PAYLOAD (Corresponde ao AgendamentoRequestDTO)
       A chave 'agendamentos' deve ter o mesmo nome da List no Java
    */
    const dadosParaEnviar = {

      clienteDto:{  
        clienteNome: nome,
        clienteCelular: celular,
      },

        agendamentos: carrinho.map(item => ({
            // Mapeia para o ItemServicoDTO
            servicoId: item.servicoId,
            servicoNome: item.servicoNome,
            servicoPreco: item.servicoPreco,
        profissionalDto:{
            profissionalId: item.profissionalId,
            profissionalNome: item.profissionalNome
        },
            horarioSelecionado: item.horarioSelecionado,
            diaSelecionadoISO: item.diaSelecionadoISO
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
            alert("Agendamento confirmado com sucesso!");
            
            // Limpeza e redirecionamento
            localStorage.clear();
            window.location.href = 'sucesso.html';
        } else {
            const erro = await response.text();
            alert("Erro no servidor: " + erro);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Não foi possível conectar ao servidor backend.");
    }
});