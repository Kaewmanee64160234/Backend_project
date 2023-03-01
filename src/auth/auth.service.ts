import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(use_login: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(use_login);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: User) {
    try {
      const payload = { login: user.login, sub: user.id };
      return {
        user: user,
        access_token: this.jwtService.sign(payload),
      };
    } catch (e) {
      console.log(e);
    }
  }
}
