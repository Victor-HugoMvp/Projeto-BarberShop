 
 /* Funcao para puxar nome do servico selecionado para titulo */
 function reservarServico(id, nomeServico) { //parametro para reservar nome
    // Armazena localmente a informacao selecionada
    localStorage.setItem('servicoId', id);
    localStorage.setItem('servicoNome', nomeServico);

    //Teste para visualizar servico selecionado
    const teste = localStorage.getItem('servicoSelecionado');
    console.log('Dado salvo no localStorage:', teste);

    // Redireciona para a proxima pagina
    window.location.href = 'profissional.html';
 }

