package br.com.barbershop.barber_bakcend.domain.model;

import jakarta.persistence.*;
        import org.springframework.data.repository.cdi.Eager;

@Entity(name = "servicos")
public class Servico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idServico;

    @Column(unique = true)
    private String nome;

    @Column
    private String duracao;

    @Column
    private double valor;

    public Long getId() {
        return idServico;
    }

    public void setId(Long id) {
        this.idServico = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDuracao() {
        return duracao;
    }

    public void setDuracao(String duracao) {
        this.duracao = duracao;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }
}
