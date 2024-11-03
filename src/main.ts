import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_API_TITLE || 'Create Data From API')
    .setDescription(
      process.env.SWAGGER_API_DESCRIPTION ||
        'Create Data From API Swagger Documentation',
    )
    .setVersion(process.env.SWAGGER_API_VERSION || '2.0')
    .addServer('http://localhost:3000', 'Local Server')
    .addServer(process.env.SWAGGER_API_BASE_SERVER, 'Development Server')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(process.env.SWAGGER_API_PATH || 'api', app, document);

  await app.listen(3000);
}
bootstrap();
