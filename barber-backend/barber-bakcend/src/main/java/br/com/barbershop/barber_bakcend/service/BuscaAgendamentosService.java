package br.com.barbershop.barber_bakcend.service;

import br.com.barbershop.barber_bakcend.domain.model.Agendamento;
import br.com.barbershop.barber_bakcend.domain.repository.AgendamentoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuscaAgendamentosService {

    private final AgendamentoRepository agendamentoRepository;

    public BuscaAgendamentosService(AgendamentoRepository agendamentoRepository) {
        this.agendamentoRepository = agendamentoRepository;
    }

    @Transactional
    public List<Agendamento> listaDeAgendamentos(){
        return agendamentoRepository.findAll();
    }
}
