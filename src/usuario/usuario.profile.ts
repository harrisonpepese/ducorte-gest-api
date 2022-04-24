import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { UserDto } from './usuario.dto';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        Usuario,
        UserDto,
        forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id),
        ),
      );
      createMap(
        mapper,
        UserDto,
        Usuario,
        forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id),
        ),
      );
    };
  }
}
