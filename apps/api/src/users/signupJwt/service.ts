import { Inject, Injectable } from '@nestjs/common';
import { Request, response } from 'express';
import jwt from 'jsonwebtoken';

@Injectable()
class TokenGenerateService {
  constructor(
    private jwtService: object,
    @Inject('REQUEST') private myRequest: Request,
    @Inject('RESPONSE') private myResponse: Response
  ) {}

  private readonly secretKey: string = 'qwertyuiopasdfghjklñzxcvbnm';

  private readonly expireTime: number = 123;

  generateToken(username: string, password: string): void {
    const payload = { username, password };
    const options: object = { expiresIn: this.expireTime };

    const token: string = jwt.sign(payload, this.secretKey, options);

    response.cookie('jwt', token);
  }
}

export default TokenGenerateService;
