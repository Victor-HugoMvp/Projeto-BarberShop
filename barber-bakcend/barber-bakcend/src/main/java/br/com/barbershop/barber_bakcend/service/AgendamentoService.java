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
    public Agendamento criarAgendamento(AgendamentoDto dto){
        Cliente cliente = new Cliente();

        cliente.setNome(dto.clienteDto().clienteNome());
        cliente.setTelefone(dto.clienteDto().clienteCelular());
        cliente= clienteRepository.save(cliente);

        ServicoDto servicoDto = dto.agendamentos().get(0);

        Agendamento agendamento = new Agendamento();
        agendamento.setCliente(cliente);

        agendamento.setProfissional(profissionalRepository.findById(servicoDto.profissionalDto().profissionalId())
                .orElseThrow(() -> new RuntimeException("Profissional nao encontrado")));

        agendamento.setServico(servicoRepository.findById(servicoDto.servicoId())
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado")));

        return agendamentoRepository.save(agendamento);
    }
}
