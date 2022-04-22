import { AutoMap } from "@automapper/classes";
import { Servico } from "src/servico/servico.entity";

export class AtendimentoDto {
    id:string;
    clienteId:string;
    clienteName:string;
    funcionarioId:string;
    funcionarioName:string;
    @AutoMap()
    data:string;
    @AutoMap()
    servicos: Servico[]
}