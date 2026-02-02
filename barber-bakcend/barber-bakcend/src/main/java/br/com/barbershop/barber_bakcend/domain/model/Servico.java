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
    private String preco;

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

    public String getPreco() {
        return preco;
    }

    public void setPreco(double valor) {
        this.preco = preco;
    }
}
