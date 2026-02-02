package br.com.barbershop.barber_bakcend.domain.model;

import br.com.barbershop.barber_bakcend.controller.dto.AgendamentoDto;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity(name = "agendamentos")
@Table(name = "agendamentos", uniqueConstraints = {
        @UniqueConstraint(
                name = "uk_profissional_data_horario",
                columnNames = {"profissional_id_profissional", "data_agendamento", "horario_agendamento"}
        )
})
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAgendamento;

    @ManyToOne
    @JoinColumn(name = "cliente_id_cliente")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "profissional_id_profissional")
    private Profissional profissional;

    @ManyToOne
    @JoinColumn(name = "servico_id_servico")
    private  Servico servico;

    @Column(name = "data_agendamento")
    private java.time.LocalDate data;

    @Column(name = "horario_agendamento")
    private java.time.LocalTime horario;

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public LocalTime getHorario() {
        return horario;
    }

    public void setHorario(LocalTime horario) {
        this.horario = horario;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Profissional getProfissional() {
        return profissional;
    }

    public void setProfissional(Profissional profissional) {
        this.profissional = profissional;
    }

    public Servico getServico() {
        return servico;
    }

    public void setServico(Servico servico) {
        this.servico = servico;
    }

    public Long getIdAgendamento() {
        return idAgendamento;
    }

    public void setIdAgendamento(Long idAgendamento) {
        this.idAgendamento = idAgendamento;
    }
}
