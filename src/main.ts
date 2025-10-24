import { NestFactory } from '@nestjs/core';
import { AppModule } from './uptime.module';
import { ValidationPipe } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const sequelize = app.get(Sequelize);
  await sequelize.sync({ alter: true });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
