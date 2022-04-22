import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ClienteDto } from './cliente.dto';
import { Cliente } from './cliente.entity';

@Injectable()
export class ClienteProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        Cliente,
        ClienteDto,
        forMember(
          (destination) => destination.nomeCompleto,
          mapFrom((source) => source.nome + ' ' + source.sobrenome),
        ),
        forMember(
          (destination) => destination.id,
          mapFrom((source) => source._id),
        ),
      );
      createMap(
        mapper,
        ClienteDto,
        Cliente,
        forMember(
          (destination) => destination._id,
          mapFrom((source) => source.id),
        ),
      );
    };
  }
}
