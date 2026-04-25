package br.com.barbershop.barber_bakcend.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public record RetornoAgendamentosDto(
            Long id,
            LocalDate data,
            LocalTime horario,
            String clienteNome,
            String clienteTelefone,
            String profissionalNome,
            String servicoNome,
            String servicoPreco,
            String status
) {}

