import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  const cfg = new DocumentBuilder()
    .setTitle("Kanban API")
    .setDescription("CRUD de tareas con estados (ES) y DB en inglés")
    .setVersion("1.0.0")
    .build();
  const doc = SwaggerModule.createDocument(app, cfg);
  SwaggerModule.setup("docs", app, doc);

  await app.listen(process.env.PORT ?? 3000, "0.0.0.0");
}
bootstrap();
