import { AutoMap } from '@automapper/classes';

export class ServicoDto {
  id: string;
  @AutoMap()
  nome: string;
  @AutoMap()
  descricao: string;
  @AutoMap()
  valor: string;
  @AutoMap()
  tempoEstimado: string;
}
