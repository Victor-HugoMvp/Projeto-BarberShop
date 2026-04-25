package br.com.barbershop.barber_bakcend.domain.repository;

import br.com.barbershop.barber_bakcend.domain.model.Agendamento;
import br.com.barbershop.barber_bakcend.domain.model.Cliente;
import br.com.barbershop.barber_bakcend.domain.model.Profissional;
import br.com.barbershop.barber_bakcend.domain.model.Servico;
import br.com.barbershop.barber_bakcend.dto.RetornoAgendamentosDto;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;

/**
 * Interface de repositório para a entidade Agendamento.
 * Fornece métodos de abstração para operações de persistência.
 */
@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

     /**
      * Recupera apenas os horários agendados para um profissional específico em uma determinada data.
      * * @param idProfissional Identificador único do profissional.
      * @param data Data da consulta.
      * @return Lista de horários que já possuem agendamento.
      */


     @Query("SELECT a.horario FROM Agendamento a WHERE a.profissional.idProfissional = :idProfissional AND a.data = :data")
     List<LocalTime> findHorariosOcupados(Long idProfissional,java.time.LocalDate data);

     @Query("""
        SELECT new br.com.barbershop.barber_bakcend.dto.RetornoAgendamentosDto(
             a.idAgendamento,
             a.data, 
             a.horario, 
             a.cliente.nome, 
             a.cliente.telefone, 
             a.profissional.nome, 
             a.servico.nome, 
             a.servico.preco, 
             a.status
            )
        FROM Agendamento a 
        JOIN a.cliente 
        JOIN a.profissional 
        JOIN a.servico 
        WHERE a.status = 'ATIVO'
        """)
     List<RetornoAgendamentosDto> findAllResumos();

     @Modifying
     @Transactional
     @Query("DELETE FROM Agendamento a WHERE a.idAgendamento = :idAgendamento")
     void deletarPorId(@Param("idAgendamento") Long id);

     @Modifying
     @Transactional
     @Query("UPDATE Agendamento a SET a.profissional = (SELECT p from Profissional p WHERE p.nome = :nomeProfissional)" +
             "WHERE a.idAgendamento = :idAgendamento")
     void atualizarProfissionalNome(@Param("idAgendamento") Long id, @Param("nomeProfissional") String nomeProfissional);

     @Modifying
     @Transactional
     @Query("UPDATE Agendamento a SET a.status = 'FINALIZADO' WHERE a.idAgendamento = :idAgendamento")
     void finalizarAgendamento(@Param("idAgendamento") Long id);
}

