package br.com.barbershop.barber_bakcend.domain.model;

import jakarta.persistence.*;

/** Representa a entidade de profissionais no sistema */
@Entity(name = "profissionais")
public class Profissional {

    /** Identificador único do profissional(chave primária) */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProfissional;

    /** Nome do profissional */
    @Column
    private String nome;

    /** URL da foto do profissional */
    @Column
    private String fotoUrl;

    public Long getId() {
        return idProfissional;
    }

    public void setId(Long id) {
        this.idProfissional = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getFotoUrl() {
        return fotoUrl;
    }

    public void setFotoUrl(String fotoUrl) {
        this.fotoUrl = fotoUrl;
    }
}


