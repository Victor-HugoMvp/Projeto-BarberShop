package br.com.barbershop.barber_bakcend.domain.repository;

import br.com.barbershop.barber_bakcend.domain.model.Agendamento;
import br.com.barbershop.barber_bakcend.domain.model.Cliente;
import br.com.barbershop.barber_bakcend.domain.model.Profissional;
import br.com.barbershop.barber_bakcend.domain.model.Servico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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
     @Query("SELECT a.horario FROM agendamentos a WHERE a.profissional.idProfissional = :idProfissional AND a.data = :data")
     List<LocalTime> findHorariosOcupados(Long idProfissional,java.time.LocalDate data);


     List<Agendamento> findAll();


}

