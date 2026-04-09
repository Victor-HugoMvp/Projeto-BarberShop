package br.com.barbershop.barber_bakcend.dto;

/**
 * Recebe dados do front-end
 *
 * <p>
 *    Essa classe recebe as informações dos serviços selecionados no front-end
 * </p>
 * @param servicoId Variável do tipo Long que recebe o Id do serviço selecionado no front.
 * @param servicoNome Variável do tipo String que recebe o nome do serviço selecionado no front.
 * @param servicoPreco Variável do tipo String que recebe o preço do serviço selecionado no front.
 * @param horarioSelecionado Variável do tipo String que recebe o horário do serviço selecionado no front.
 * @param profissionalDto Instância da classe ProfissionalDto.
 */

public record ServicoDto (
    Long servicoId,
    String servicoNome,
    String servicoPreco,
    String horarioSelecionado,
    ProfissionalDto profissionalDto
    ){}