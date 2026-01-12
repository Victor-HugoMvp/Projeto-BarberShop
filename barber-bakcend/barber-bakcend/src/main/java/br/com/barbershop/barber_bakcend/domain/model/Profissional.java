package br.com.barbershop.barber_bakcend.domain.model;

import jakarta.persistence.*;

@Entity(name = "profissionais")
public class Profissional {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProfissional;

    @Column
    private String nome;

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


