import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SiteAdminService } from './users/services/siteadmin.service';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Pharmachain API')
    .setDescription('The Pharmachain API description')
    .setVersion('1.0')
    .addTag('pharmachain')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  const siteAdminService = app.get(SiteAdminService);
  if (process.env.SITEADMIN_USR && process.env.SITEADMIN_EMAIL && process.env.SITEADMIN_PASS) {
    await siteAdminService.resetAndCreate({
      name: process.env.SITEADMIN_USR,
      email: process.env.SITEADMIN_EMAIL,
      password: process.env.SITEADMIN_PASS
    });
    console.log('Site Admin configured from .env');
  }

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
