package br.com.barbershop.barber_bakcend.service;

import br.com.barbershop.barber_bakcend.domain.repository.AgendamentoRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class AlterarProfissionalService {

    private final AgendamentoRepository repository;

    public AlterarProfissionalService(AgendamentoRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public void atualizarProfissional(Long id, String nomeProfissional){
        if(!repository.existsById(id)){
            throw new EntityNotFoundException("Agendamento não localizado para o id" + id);
        }
        repository.atualizarProfissionalNome(id, nomeProfissional);
    }
}
