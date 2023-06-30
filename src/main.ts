import * as dotenv from 'dotenv';
dotenv.config();

import { Logger, LogLevel, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import { AppModule, appModuleDocumentation } from './app.module';

const enabledLogLevels = ['log', 'debug', 'error', 'warn'];
const {
  ADDRESS = '0.0.0.0',
  LOG_LEVEL: logLevel = enabledLogLevels.join(','),
  NAME,
  PORT = 4000,
} = process.env;

async function bootstrap() {
  const logger = new Logger('PolarisCP');
  const app = await NestFactory.create(AppModule, {
    logger: <LogLevel[]>(
      logLevel.split(',').filter((level) => enabledLogLevels.includes(level))
    ),
  });
  const server = app.getHttpServer();
  server.keepAliveTimeout = 64000;

  app.use(helmet());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      whitelist: true, // Ensure that unknown properties are stripped from the dto
      forbidNonWhitelisted: true, // Throw an error if unknown values are sent in the request
      transform: true, // Ensure that the request data is coerced to the correct type
      transformOptions: {
        enableImplicitConversion: true, // Automatically convert types with class-transformer
      },
    }),
  );
  appModuleDocumentation(app);
  app.enableCors();

  await app.listen(PORT, ADDRESS);
  logger.log(
    `${NAME} application running at: ${ADDRESS}:${PORT}`,
    'ApplicationBootstrap',
  );
}
bootstrap();
