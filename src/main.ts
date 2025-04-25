import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());

	const config = new DocumentBuilder()
		.setTitle("Cats example")
		.setDescription("The cats API description")
		.setVersion("1.0")
		.addTag("cats")
		.build();
	const documentFactory = () => SwaggerModule.createDocument(app, config);

	const OpenApiSpecification = app.use(
		"/api",
		apiReference({
			content: documentFactory,
		}),
	);
	await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
