package br.com.barbershop.barber_bakcend.domain.model;

import jakarta.persistence.*;

@Entity(name = "agendamentos")
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
