package br.com.barbershop.barber_bakcend;

import br.com.barbershop.barber_bakcend.domain.model.*;
import br.com.barbershop.barber_bakcend.domain.repository.*;
import br.com.barbershop.barber_bakcend.dto.*;
import br.com.barbershop.barber_bakcend.service.AgendamentoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

// IMPORTS CORRETOS AQUI:
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify; // Mockito, não JDK Internal
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AgendamentoServiceTest {

    @Mock
    private AgendamentoRepository agendamentoRepository;

    @Mock
    private ClienteRepository clienteRepository;

    @Mock
    private ProfissionalRepository profissionalRepository;

    @Mock
    private ServicoRepository servicoRepository;

    @InjectMocks
    private AgendamentoService agendamentoService;

    private AgendamentoDto agendamentoDto;

    @BeforeEach
    void setUp() {
        ClienteDto clienteDto = new ClienteDto("Robson", "34996863374");
        // Ajuste o ID do profissional aqui para 1L se quiser que bata com o when do teste
        ServicoDto servicoDto = new ServicoDto(1L, "aparar", "22,00", "10:00",
                new ProfissionalDto("Carlos", 1L));
        agendamentoDto = new AgendamentoDto(clienteDto, List.of(servicoDto), "2026-04-03T10:00:00Z");
    }

    @Test
    @DisplayName("Deve criar um agendamento com sucesso, se os dados forem válidos")
    void criarAgendamentos(){
        Cliente clienteSalvo = new Cliente();
        clienteSalvo.setId(1L);

        // Agora o any(Cliente.class) funcionará pois o import está correto
        when(clienteRepository.save(any(Cliente.class))).thenReturn(clienteSalvo);
        when(profissionalRepository.findById(anyLong())).thenReturn(Optional.of(new Profissional()));
        when(servicoRepository.findById(anyLong())).thenReturn(Optional.of(new Servico()));
        when(agendamentoRepository.saveAll(anyList())).thenAnswer(i -> i.getArguments()[0]);

        List<Agendamento> resultado = agendamentoService.criarAgendamento(agendamentoDto);

        assertNotNull(resultado);
        assertEquals(1, resultado.size());

        // Verificações
        verify(clienteRepository, times(1)).save(any(Cliente.class));
        verify(agendamentoRepository, times(1)).saveAll(anyList());
    }

    @Test
    @DisplayName("Deve lançar exceção quando o profissional não for encontrado")
    void criarAgendamentoProfissionalNaoEncontrado() {
        // GIVEN
        when(clienteRepository.save(any(Cliente.class))).thenReturn(new Cliente());
        when(profissionalRepository.findById(anyLong())).thenReturn(Optional.empty());

        // WHEN & THEN
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            agendamentoService.criarAgendamento(agendamentoDto);
        });

        assertEquals("Profissional nao encontrado", exception.getMessage());
    }
}