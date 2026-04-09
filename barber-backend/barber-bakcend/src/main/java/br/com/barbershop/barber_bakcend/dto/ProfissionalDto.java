package br.com.barbershop.barber_bakcend.dto;

/**
 * Recebe dados do front-end
 *
 * <p>
 *    Recebe os dados do profissional selecionado no front-end.
 * </p>
 * @param profissionalNome Variável do tipo String que recebe o nome do profissional selecioando no front.
 * @param profissionalId Variável do tipo Long que recebe o Id do profissional selecionado no front.
 */

public record ProfissionalDto (
      String profissionalNome,
      Long profissionalId
){}
