import { INestApplication, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig, { databases } from './common/config/database.config';

export const appModuleDocumentation = (app: INestApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('Polaris Control Plane')
    .setDescription('API for access to the Polaris Control Plane Application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
};

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig.polarisCp],
    }),
    TypeOrmModule.forRootAsync({
      name: databases.POLARIS_CP,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get(databases.POLARIS_CP),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
