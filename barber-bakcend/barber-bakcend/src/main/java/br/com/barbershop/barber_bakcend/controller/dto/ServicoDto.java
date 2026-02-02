package br.com.barbershop.barber_bakcend.controller.dto;

public record ServicoDto (
    Long servicoId,
    String servicoNome,
    String servicoPreco,
    String horarioSelecionado,
    ProfissionalDto profissionalDto
    ){}