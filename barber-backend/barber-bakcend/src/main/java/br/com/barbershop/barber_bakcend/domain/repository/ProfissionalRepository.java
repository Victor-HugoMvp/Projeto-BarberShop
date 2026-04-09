package br.com.barbershop.barber_bakcend.domain.repository;

import br.com.barbershop.barber_bakcend.domain.model.Profissional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Interface de repositório para a entidade Profissional.
 * Fornece métodos de abstração para operações de persistência.
 */
@Repository
public interface ProfissionalRepository extends JpaRepository <Profissional, Long> {

}
