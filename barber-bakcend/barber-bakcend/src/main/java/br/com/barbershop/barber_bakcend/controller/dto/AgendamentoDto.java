package br.com.barbershop.barber_bakcend.controller.dto;
import java.util.List;

/**
 * Recebe dados do front-end
 *
 *<p>
 *  Essa classe recebe dados do front-end, visando um desacoplamento
 *  da estrutura do banco de dados com a API. Alimenta a classe model de agendamento.
 *</p>
 * * @author Victor Hugo Marcelino Fraga
 * @version 1.0
 * @since 2026-02-03
 *
 * @param clienteDto Instaciamento da classe ClienteDto
 * @param agendamentos
 * @param diaSelecionadoISO
 */

public record AgendamentoDto(
    ClienteDto clienteDto,
    List<ServicoDto> agendamentos,
    String diaSelecionadoISO
    ){}