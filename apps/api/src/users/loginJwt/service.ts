import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

@Injectable()
class TokenVerifyService {
  constructor(
    private jwtService: object,
    @Inject('REQUEST') private myRequest: Request,
    @Inject('RESPONSE') private myResponse: Response
  ) {}

  private readonly secretKey: string = 'qwertyuiopasdfghjklñzxcvbnm';

  private readonly expireTime: number = 123;

  verifyToken(token: string = this.myRequest.cookies.jwt): object {
    try {
      if (token) {
        const verify: object = jwt.verify(token, this.secretKey) as object;
        return verify;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}

export default TokenVerifyService;
