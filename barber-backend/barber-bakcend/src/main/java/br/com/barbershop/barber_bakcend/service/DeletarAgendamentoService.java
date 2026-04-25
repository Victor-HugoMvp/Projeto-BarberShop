package br.com.barbershop.barber_bakcend.service;

import br.com.barbershop.barber_bakcend.domain.repository.AgendamentoRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.hibernate.action.internal.EntityActionVetoException;
import org.springframework.stereotype.Service;

@Service
public class DeletarAgendamentoService {

    private final AgendamentoRepository repository;

    public DeletarAgendamentoService(AgendamentoRepository repository) {
        this.repository = repository;
    }


    @Transactional
    public void deletar(Long id){
        if(!repository.existsById(id)) {
            throw new EntityNotFoundException("Agendamento não encontrado");
        }
        repository.deletarPorId(id);
    }
}
