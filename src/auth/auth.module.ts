import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtGuard } from "./guards/jwt.guard";
import { APP_GUARD } from "@nestjs/core";

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => {
				return {
					secret: config.get("JWT_SECRET"),
					signOptions: {
						expiresIn: "15m",
					},
				};
			},
		}),
	],
	providers: [
		AuthService,
		{
			provide: APP_GUARD,
			useClass: JwtGuard,
		},
		LocalStrategy,
		JwtStrategy,
	],
	controllers: [AuthController],
})
export class AuthModule {}
