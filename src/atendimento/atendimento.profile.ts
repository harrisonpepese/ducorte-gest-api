import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { AtendimentoDto } from './atendimento.dto';
import { Atendimento } from './atendimento.entity';

@Injectable()
export class AtendimentoProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper) {
    super(mapper);
  }
  get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        Atendimento,
        AtendimentoDto,
        forMember(
          (destination) => destination.clienteId,
          mapFrom((source) => source.cliente._id),
        ),
        forMember(
          (destination) => destination.clienteName,
          mapFrom(
            (source) => source.cliente.nome + ' ' + source.cliente.sobrenome,
          ),
        ),
        forMember(
          (destination) => destination.funcionarioId,
          mapFrom((source) => source.funcionario?._id),
        ),
        forMember(
          (destination) => destination.funcionarioName,
          mapFrom(
            (source) =>
              source.funcionario?.nome + ' ' + source.funcionario?.sobrenome,
          ),
        ),
      ),
        createMap(mapper, AtendimentoDto, Atendimento);
    };
  }
}
