package br.com.barbershop.barber_bakcend;

import br.com.barbershop.barber_bakcend.domain.model.Cliente;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.channels.ClosedByInterruptException;

@SpringBootTest
class ClienteTeste {

	@Test
	void retornoNome() {
		Cliente cliente = new Cliente();
		cliente.setId(1L);
		cliente.setNome("Robson");
		cliente.setTelefone("349996863374");

		Assertions.assertEquals("Robson", cliente.getNome());
	}

	@Test
	void retornoTelefone() {
		Cliente cliente = new Cliente();
		cliente.setId(1L);
		cliente.setNome("Robson");
		cliente.setTelefone("349996863374");

		Assertions.assertEquals("349996863374", cliente.getTelefone());
	}

}
