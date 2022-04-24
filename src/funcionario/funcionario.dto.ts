import { AutoMap } from '@automapper/classes';

export class FuncionarioDto {
  id: string;
  @AutoMap()
  nome: string;
  @AutoMap()
  sobrenome: string;
  nomeCompleto: string;
  @AutoMap()
  sexo: string;
  @AutoMap()
  telefone: string;
  @AutoMap()
  cpf: string;
  @AutoMap()
  cnpj: string;
  @AutoMap()
  comissao: number;
}
