import { Injectable } from '@nestjs/common';

@Injectable()
class AppService {
  private readonly hello: string;

  constructor() {
    this.hello = 'Hello World!';
  }

  getHello(): string {
    return this.hello;
  }
}

export default AppService;
