package br.com.barbershop.barber_bakcend.service;

import br.com.barbershop.barber_bakcend.controller.dto.AgendamentoDto;
import br.com.barbershop.barber_bakcend.controller.dto.ServicoDto;
import br.com.barbershop.barber_bakcend.domain.model.Agendamento;
import br.com.barbershop.barber_bakcend.domain.model.Cliente;
import br.com.barbershop.barber_bakcend.domain.repository.AgendamentoRepository;
import br.com.barbershop.barber_bakcend.domain.repository.ClienteRepository;
import br.com.barbershop.barber_bakcend.domain.repository.ProfissionalRepository;
import br.com.barbershop.barber_bakcend.domain.repository.ServicoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ProfissionalRepository profissionalRepository;

    @Autowired
    private ServicoRepository servicoRepository;

    @Transactional
    public List<Agendamento> criarAgendamento(AgendamentoDto dto){
        Cliente cliente = new Cliente();

        cliente.setNome(dto.clienteDto().clienteNome());
        cliente.setTelefone(dto.clienteDto().clienteCelular());
        final Cliente clienteSalvo= clienteRepository.save(cliente);

        List<Agendamento> agendamentosParaSalvar = dto.agendamentos().stream().map(servicoDto -> {
            Agendamento agendamento = new Agendamento();
            agendamento.setCliente(clienteSalvo);
            agendamento.setData(java.time.ZonedDateTime.parse(dto.diaSelecionadoISO()).toLocalDate());
            agendamento.setHorario(LocalTime.parse(servicoDto.horarioSelecionado()));

            agendamento.setProfissional(profissionalRepository.findById(servicoDto.profissionalDto().profissionalId())
                    .orElseThrow(() -> new RuntimeException("Profissional nao encontrado")));

            agendamento.setServico(servicoRepository.findById(servicoDto.servicoId())
                    .orElseThrow(() -> new RuntimeException("Serviço não encontrado")));

            return agendamento;
        }).toList();

        return agendamentoRepository.saveAll(agendamentosParaSalvar);
    }

    @Transactional
    public List<java.time.LocalTime> buscarHorariosOcupados(Long profissionalId, java.time.LocalDate data){

        return agendamentoRepository.findHorariosOcupados(profissionalId, data);
    }
}
