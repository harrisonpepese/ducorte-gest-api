import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { Model } from 'mongoose';
import { use } from 'passport';
import { UsuarioSingUp } from './usuario.dto';
import { Usuario, UsuarioDocument } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(@InjectModel(Usuario.name) private model: Model<Usuario>) {}

  async create(usuarioDto:UsuarioSingUp){
    const user = await this.findBySingInDto(usuarioDto);
    if(user){
        throw new HttpException('usuário já cadastrado',HttpStatus.BAD_REQUEST);
    }
    usuarioDto.password = await this.hashPassword(usuarioDto.password);
    return await this.model.create(usuarioDto);
  }
  async findByUserName(userName: string): Promise<Usuario | undefined> {
    return await this.model.findOne({ userName });
  }
  async findBySingInDto(userDto: UsuarioSingUp): Promise<Usuario | undefined> {
    return await this.model.findOne({ $or:[{username:userDto.userName},{email:userDto.email}]});
  }
  async changePassword(userName: string, newPassword: string) {
    const usuario = await this.findByUserName(userName);
    usuario.password = newPassword;
  }
  async hashPassword(rawPassword: string): Promise<string> {
    return hash(rawPassword, 10);
  }
  async comparePassword(user: Usuario, password: string): Promise<boolean> {
    return await compare( password, user.password);
  }
}
