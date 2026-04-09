package br.com.barbershop.barber_bakcend.domain.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Representa a entidade de agendamento do sistema.
 * Esta classe é mapeada para tabela "agendamentos" e garante que não existam
 * conflitos de horário para o mesmo profissional através de uma constraint única.
 */
@Entity(name = "agendamentos")
@Table(name = "agendamentos", uniqueConstraints = {
        @UniqueConstraint(
                name = "uk_profissional_data_horario",
                columnNames = {"profissional_id_profissional", "data_agendamento", "horario_agendamento"}
        )
})
public class Agendamento {

    /** Identificador único do agendamento (Chave primária). */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAgendamento;

    /** Cliente que solicitou o agendamento. */
    @ManyToOne
    @JoinColumn(name = "cliente_id_cliente")
    private Cliente cliente;

    /** Profissional responsável pela execução do serviço. */
    @ManyToOne
    @JoinColumn(name = "profissional_id_profissional")
    private Profissional profissional;

    /** Serviço que será realizado. */
    @ManyToOne
    @JoinColumn(name = "servico_id_servico")
    private  Servico servico;

    /** Data programada para o agendamen. */
    @Column(name = "data_agendamento")
    private java.time.LocalDate data;

    /** Horário para o inicio do agendammento. */
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
