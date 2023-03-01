import { Request, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
// import { LocalAuthGuard } from './auth/local-auth.guard';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
