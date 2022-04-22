import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { FuncionarioDto } from './funcionario.dto';
import { Funcionario } from './funcionario.entity';

@Injectable()
export class FuncionarioProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        Funcionario,
        FuncionarioDto,
        forMember(
          (destination) => destination.nomeCompleto,
          mapFrom((source) => source.nome + ' ' + source.sobrenome),
        ),
        forMember(
          (destination) => destination.id,
          mapFrom((source) => source._id),
        ),
      ),
        createMap(
          mapper,
          FuncionarioDto,
          Funcionario,
          forMember(
            (destination) => destination._id,
            mapFrom((source) => source.id),
          ),
        );
    };
  }
}
