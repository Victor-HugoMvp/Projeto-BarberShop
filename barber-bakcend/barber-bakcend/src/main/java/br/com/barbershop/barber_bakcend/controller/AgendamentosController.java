package br.com.barbershop.barber_bakcend.controller;

import br.com.barbershop.barber_bakcend.controller.dto.AgendamentoDto;
import br.com.barbershop.barber_bakcend.domain.model.Agendamento;
import br.com.barbershop.barber_bakcend.service.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/agendamentos")
@CrossOrigin(origins = "*")
public class AgendamentosController {
    @Autowired
    private AgendamentoService service;

    @PostMapping
    public ResponseEntity<Agendamento> cadastrar(@RequestBody AgendamentoDto dto){
         Agendamento salvo = service.criarAgendamento(dto);
         return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }
}
