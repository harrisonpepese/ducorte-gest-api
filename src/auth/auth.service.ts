import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
  async SingUp(usuarioSingup: UsuarioSingUp) {
    const usuario: Usuario = await this.usuarioService.findByUserName(
      usuarioSingup.username,
    );
    if (usuario) {
      throw new HttpException('usuario já existe', HttpStatus.BAD_REQUEST);
    }
    return await this.usuarioService.create(usuario);
  }

  async ForgotPassword(email: string) {
    const usuario: Usuario = await this.usuarioService.findByEmail(email);
    if (!usuario) {
      throw new HttpException(
        'Esse email não está cadastrado na base',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.usuarioService.changePassword(usuario.username, '123456');
  }
}
