import { AutoMap } from '@automapper/classes';
import { ServicoDto } from 'src/servico/servico.dto';
import { AtendimentoStatus } from './atendimento.entity';

export class AtendimentoDto {
  id: string;
  clienteId: string;
  clienteName: string;
  funcionarioId: string;
  funcionarioName: string;
  @AutoMap()
  status: AtendimentoStatus;
  @AutoMap()
  data: string;
  @AutoMap(() => ServicoDto)
  servicos: ServicoDto[];
}
export class AtendimentoServicoDto {
  id: string;
  nome: string;
}
