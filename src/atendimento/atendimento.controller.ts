import { Controller, Get } from '@nestjs/common';
import ICrudController from 'src/interfaces/controller/icrudcontroller';
import { AtendimentoService } from './atendimento.service';
import { AtendimentoDto } from './atendimento.dto';
import { Atendimento } from './atendimento.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Controller('atendimento')
export class AtendimentoController implements ICrudController<Atendimento,AtendimentoDto>{
    constructor(
        private atendimentoService:AtendimentoService,
        @InjectMapper() private readonly mapper: Mapper,
        
        ){
    }
    @Get()
    async find(): Promise<AtendimentoDto[]> {
        const result = await this.atendimentoService.find();
        return this.mapper.mapArray(result, Atendimento, AtendimentoDto);
    }
    getOne(id: string): Promise<AtendimentoDto> {
        throw new Error('Method not implemented.');
    }
    create(dto: AtendimentoDto): Promise<AtendimentoDto> {
        throw new Error('Method not implemented.');
    }
    update(id: string, dto: AtendimentoDto): Promise<AtendimentoDto> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
