package br.com.barbershop.barber_bakcend.controller;

import br.com.barbershop.barber_bakcend.controller.dto.AgendamentoDto;
import br.com.barbershop.barber_bakcend.domain.model.Agendamento;
import br.com.barbershop.barber_bakcend.service.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendamentos")
@CrossOrigin(origins = "*")
public class AgendamentosController {
    @Autowired
    private AgendamentoService service;

    @PostMapping
    public ResponseEntity<List<Agendamento>> cadastrar(@RequestBody AgendamentoDto dto){
         List<Agendamento> salvo = service.criarAgendamento(dto);
         return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @GetMapping("/ocupados")
    public ResponseEntity<List<java.time.LocalTime>> listaOcupados(
            @RequestParam Long profissionalId,
            @RequestParam String data) {

        java.time.LocalDate dataLocal = java.time.ZonedDateTime.parse(data).toLocalDate();
        List<java.time.LocalTime> ocupados = service.buscarHorariosOcupados(profissionalId, dataLocal);

        return  ResponseEntity.ok(ocupados);
    }



}

