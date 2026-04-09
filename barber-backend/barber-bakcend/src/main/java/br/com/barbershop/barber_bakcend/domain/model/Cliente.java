package br.com.barbershop.barber_bakcend.domain.model;

import jakarta.persistence.*;

/**
 * Representa a entidade de Cliente no sistema.
 */

@Entity(name = "clientes")
public class Cliente {

    /** Identificador único do cliente (Chave primária)*/
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCliente;

    /** Nome do cliente */
    @Column
    private String nome;

    /** Número de telefone */
    @Column
    private String telefone;

    public Long getId() {
        return idCliente;
    }

    public void setId(Long id) {
        this.idCliente = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
}
