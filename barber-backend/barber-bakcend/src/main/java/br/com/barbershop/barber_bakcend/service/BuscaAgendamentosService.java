package br.com.barbershop.barber_bakcend.service;

import br.com.barbershop.barber_bakcend.domain.repository.AgendamentoRepository;
import br.com.barbershop.barber_bakcend.dto.RetornoAgendamentosDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BuscaAgendamentosService {
    private final AgendamentoRepository agendamentoRepository;


    public BuscaAgendamentosService(AgendamentoRepository agendamentoRepository) {
        this.agendamentoRepository = agendamentoRepository;
    }


    @Transactional(readOnly = true)
    public List<RetornoAgendamentosDto> listaDeAgendamentos() {
        return agendamentoRepository.findAllResumos();
    }
}
