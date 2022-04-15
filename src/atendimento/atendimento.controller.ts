import { Controller } from '@nestjs/common';
import CrudController from 'src/base/crud.controller';
import { AtendimentoService } from './atendimento.service';
import { AtendimentoDto } from './dto/AtendimentoDto';
import { Atendimento } from './schema/atendimento.schema';

@Controller('atendimento')
export class AtendimentoController extends CrudController<Atendimento,AtendimentoDto>{
    service: AtendimentoService
    constructor(private agendamentoService:AtendimentoService){
        super(agendamentoService)
    }
}
