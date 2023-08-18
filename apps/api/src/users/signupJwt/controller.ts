import { Controller, Post, Query } from '@nestjs/common';
import TokenGenerateService from './service';

@Controller('signup')
class SignUpController {
  constructor(private readonly tokenService: TokenGenerateService) {}

  @Post()
  get(
    @Query('input1') userName: string,
    @Query('input2') password: string
  ): void {
    this.tokenService.generateToken(userName, password);
  }
}

export default SignUpController;
