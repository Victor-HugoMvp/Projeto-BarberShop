package br.com.barbershop.barber_bakcend.controller.dto;


import java.util.List;

public record AgendamentoDto(
    ClienteDto clienteDto,
    List<ServicoDto> agendamentos
    ){}
