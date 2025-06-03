import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // https://docs.nestjs.com/techniques/validation#auto-validation
  // This pipe will automatically validate incoming requests based on the DTOs defined in your application.
  // If the request body does not match the expected structure, it will throw an error and return a 400 Bad Request response.
  // This is useful for ensuring that your API receives data in the correct format and structure.
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Automatically transform payloads to DTO instances
  }));

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Sample NestJs Backend API')
    .setDescription('Sample NestJs backend api documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
