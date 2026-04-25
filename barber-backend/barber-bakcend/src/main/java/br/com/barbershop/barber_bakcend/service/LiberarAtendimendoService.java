package br.com.barbershop.barber_bakcend.service;

import br.com.barbershop.barber_bakcend.domain.repository.AgendamentoRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class LiberarAtendimendoService {

    private final AgendamentoRepository repository;

    public LiberarAtendimendoService(AgendamentoRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public void finalizar(Long id){
        if(!repository.existsById(id)){
            throw new EntityNotFoundException("Não foi possível liberar: Agendamento não encontrado");
        }
        repository.finalizarAgendamento(id);
    }
}
