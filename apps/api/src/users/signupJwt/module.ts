import { Module } from '@nestjs/common';
import SignUpController from './controller';
import TokenGenerateService from './service';

@Module({
  controllers: [SignUpController],
  providers: [TokenGenerateService]
})
export default class SignUpModule {}
