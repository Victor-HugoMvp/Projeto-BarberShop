package br.com.barbershop.barber_bakcend.controller;

import br.com.barbershop.barber_bakcend.dto.AgendamentoDto;
import br.com.barbershop.barber_bakcend.domain.model.Agendamento;
import br.com.barbershop.barber_bakcend.service.AgendamentoService;
import br.com.barbershop.barber_bakcend.service.BuscaAgendamentosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.PublicKey;
import java.util.List;

/**
 * Controller REST responsável por gerenciar as operações de agendamento.
 * Fornece endpoints para criação de novos agendamentos e consulta de horários.
 *
 */

@RestController
@RequestMapping("/agendamentos")
@CrossOrigin(origins = "*")
public class AgendamentosController {

    /** Servico que contém a lógica  de negócio de agendamentos.*/
    @Autowired
    private AgendamentoService agendamentoService;

    @Autowired
    private BuscaAgendamentosService buscaAgendamentoService;

    /**
     * Cria um novo agendamento no sistema.
     * * @param dto Objeto contendo os dados do cliente, profissional, serviço e data/hora.
     * @return ResponseEntity contendo a lista de agendamentos criados e o status HTTP 201 (Created).
     */
    @PostMapping
    public ResponseEntity<List<Agendamento>> cadastrar(@RequestBody AgendamentoDto dto){
         List<Agendamento> salvo = agendamentoService.criarAgendamento(dto);
         return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    /**
     * Consulta os horários que já possuem agendamento para um profissional em uma data específica.
     * * @param profissionalId ID do profissional a ser consultado.
     * @param data Data no formato ISO (string) a ser convertida para LocalDate.
     * @return Lista de horários (LocalTime) que não estão disponíveis para reserva.
     */
    @GetMapping("/ocupados")
    public ResponseEntity<List<java.time.LocalTime>> listaOcupados(
            @RequestParam Long profissionalId,
            @RequestParam String data) {

        java.time.LocalDate dataLocal = java.time.ZonedDateTime.parse(data).toLocalDate();
        List<java.time.LocalTime> ocupados = agendamentoService.buscarHorariosOcupados(profissionalId, dataLocal);

        return  ResponseEntity.ok(ocupados);
    }

    @GetMapping("/todos_agendamentos")
    public ResponseEntity<List<Agendamento>> listar(){
        return  ResponseEntity.ok(buscaAgendamentoService.listaDeAgendamentos());
    }
}

