import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import AppModule from './app.module';
import LoansService from './loans/loans.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('LibraryApi')
    .setDescription('Library API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const loanService = app.get(LoansService);

  await loanService.verifyUsersReserve();

  await app.listen(process.env.PORT || 3000);
}

bootstrap().catch((err: Error) => {
  throw new Error(err.message);
});
