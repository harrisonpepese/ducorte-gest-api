import { AutoMap } from '@automapper/classes';

export class ClienteDto {
  id: string;
  @AutoMap()
  nome: string;
  @AutoMap()
  sobrenome: string;
  @AutoMap()
  nomeCompleto: string;
  @AutoMap()
  sexo: string;
  @AutoMap()
  telefone: string;
  @AutoMap()
  cpf: string;
}
