import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
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
  // SwaggerModule.setup(process.env.SWAGGER_API_PATH || 'api', app, document);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Api Docs',
    customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  });

  await app.listen(3000);
}
bootstrap();
