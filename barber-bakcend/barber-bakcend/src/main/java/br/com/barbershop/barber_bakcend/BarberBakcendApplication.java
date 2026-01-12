package br.com.barbershop.barber_bakcend;

import br.com.barbershop.barber_bakcend.domain.model.Cliente;
import br.com.barbershop.barber_bakcend.domain.repository.ClienteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BarberBakcendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BarberBakcendApplication.class, args);
	}
}

