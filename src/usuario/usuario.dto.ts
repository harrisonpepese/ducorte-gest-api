export class UsuarioSingUp {
  username: string;
  password: string;
  email: string;
  funcionarioId?: string;
}

export class UserDto {
  id: string;
  username: string;
  email: string;
}

export type UserForgotPasswordReq = {
  email: string;
};
