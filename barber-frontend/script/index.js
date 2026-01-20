 
 /* Funcao para puxar nome do servico selecionado para titulo */
 function reservarServico(id, nomeServico, valorServico) { //parametro para reservar nome
    // Armazena localmente a informacao selecionada
    localStorage.setItem('servicoId', id);
    localStorage.setItem('servicoNome', nomeServico);
    localStorage.setItem('servicoPreco', valorServico );

    const infoServico = {
         servicoId: id,
        servicoNome: nomeServico,
        servicoPreco: "R$ " + valorServico
    }  

    localStorage.setItem('agendamento', JSON.stringify(infoServico));
    //Teste para visualizar servico selecionado
    const teste = localStorage.getItem('servicoNome');
    console.log('Dado salvo no localStorage:', teste);

    // Redireciona para a proxima pagina
    window.location.href = 'profissional.html';
 }

