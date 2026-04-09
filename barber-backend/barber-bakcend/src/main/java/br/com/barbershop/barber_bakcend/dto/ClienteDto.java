package br.com.barbershop.barber_bakcend.dto;

/**
 * Recebe dados do front-end
 *
 * <p>
 *     Essa classe recebe dados do cliente, vindos do front-end.
 * </p>
 *
 * @param clienteNome Variável do tipo String que recebe o nome do cliente vindo do front-end.
 * @param clienteCelular Variável do tipo String que recebe o telefone do cliente vindo do front-end.
 */

public record ClienteDto (
        String clienteNome,
        String clienteCelular
){}
