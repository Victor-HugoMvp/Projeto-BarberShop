package br.com.barbershop.barber_bakcend.domain.repository;

import br.com.barbershop.barber_bakcend.domain.model.Profissional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfissionalRepository extends JpaRepository <Profissional, Long> {

}
