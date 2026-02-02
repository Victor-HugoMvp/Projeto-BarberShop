package br.com.barbershop.barber_bakcend.domain.repository;

import br.com.barbershop.barber_bakcend.domain.model.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

     @Query("SELECT a.horario FROM agendamentos a WHERE a.profissional.idProfissional = :idProfissional AND a.data = :data")
     List<LocalTime> findHorariosOcupados(Long idProfissional,java.time.LocalDate data);

}
