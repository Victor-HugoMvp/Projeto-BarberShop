 function reservarServico(nomeServico) {
    // Armazena localmente a informacao selecionada
    localStorage.setItem('servicoSelecionado', nomeServico);

    const teste = localStorage.getItem('servicoSelecionado');
    console.log('Dado salvo no localStorage:', teste);

    // Redireciona para a proxima pagina
    window.location.href = 'profissional.html';
 }

