package br.com.barbershop.barber_bakcend.domain.model;

import jakarta.persistence.*;
        import org.springframework.data.repository.cdi.Eager;

/** Representa a entidade servicos no sistema*/
@Entity(name = "servicos")
public class Servico {

    /** Identificador único do serviço(chave primária) */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idServico;

    /** Nome do serviço definido de forma única para evitar conflitos de serviço repetido */
    @Column(unique = true)
    private String nome;

    /** Preço do serviço */
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
