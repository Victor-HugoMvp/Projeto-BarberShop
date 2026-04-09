package br.com.barbershop.barber_bakcend.domain.repository;

import br.com.barbershop.barber_bakcend.domain.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Interface de repositório para a entidade Cliente.
 * Fornece métodos de abstração para operações de persistência.
 */
@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    /**
     * Busca clientes cujo nome contenha a sequência de caracteres informada.
     * @param nome Trecho do nome para pesquisa.
     * @return Lista de clientes que atendem ao critério.
     */
    List<Cliente> findByNomeContaining(String nome);
}
