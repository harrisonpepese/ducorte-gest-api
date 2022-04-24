import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioSingUp } from 'src/usuario/usuario.dto';
import { Usuario } from 'src/usuario/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const usuario: Usuario = await this.usuarioService.findByUserName(username);
    const result = await this.usuarioService.comparePassword(usuario, password);
    if (result) {
      const { password, ...result } = usuario;
      return result;
    }
    return null;
  }
  async login(usuario: Usuario) {
    const payload = { username: usuario.username, sub: usuario.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async SingUp(usuario: UsuarioSingUp) {
    return await this.usuarioService.create(usuario);
  }
}
