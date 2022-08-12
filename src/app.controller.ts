import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { LocalAuthGuard } from './auth/guards/local.guard';
import { UserForgotPasswordReq, UsuarioSingUp } from './usuario/usuario.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @Get()
  async hello() {
    return 'Server is online';
  }
  @Post('auth/singUp')
  async cadastrar(@Body() userSingup: UsuarioSingUp) {
    return await this.authService.SingUp(userSingup);
  }
  @Post('auth/forgotPassword')
  async esquecerSenha(@Body() forgotReq: UserForgotPasswordReq) {
    return await this.authService.ForgotPassword(forgotReq.email);
  }
}
