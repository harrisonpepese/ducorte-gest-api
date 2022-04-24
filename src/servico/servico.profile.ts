import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
  MappingProperty,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ServicoDto } from './servico.dto';
import { Servico } from './servico.entity';

@Injectable()
export class ServicoProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        Servico,
        ServicoDto,
        forMember(
          (destination) => destination.id,
          mapFrom((source) => source._id),
        ),
      ),
        createMap(mapper, ServicoDto, Servico);
    };
  }
}
