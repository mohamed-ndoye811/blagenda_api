import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { JwtService } from "@nestjs/jwt";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true, // rend les variables dispo dans tous les modules
		}),
		AuthModule,
		PrismaModule,
		UserModule,
	],
	controllers: [AuthController],
	providers: [AuthService, JwtService],
})
export class AppModule {}
