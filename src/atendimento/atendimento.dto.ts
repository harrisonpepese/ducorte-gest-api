import { AutoMap } from '@automapper/classes';
import { ServicoDto } from 'src/servico/servico.dto';

export class AtendimentoDto {
  id: string;
  clienteId: string;
  clienteName: string;
  funcionarioId: string;
  funcionarioName: string;
  @AutoMap()
  data: string;
  @AutoMap(() => ServicoDto)
  servicos: ServicoDto[];
}
export class AtendimentoServicoDto {
  id: string;
  nome: string;
}
