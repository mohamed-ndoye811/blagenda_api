import {
	ConflictException,
	Injectable,
	NotImplementedException,
	UnauthorizedException,
} from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
		private config: ConfigService,
	) {}

	async login(dto: LoginDTO) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: dto.email,
			},
		});

		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const isPassValid = await argon.verify(user.password, dto.password);

		if (!isPassValid) {
			throw new UnauthorizedException('Invalid registration credentials');
		}

		return new UnauthorizedException();
	}

	async register(dto: RegisterDTO) {
		const hashedPassword = await argon.hash(dto.password);

		try {
			const newUser = await this.prisma.user.create({
				data: {
					email: dto.email,
					password: hashedPassword,
					username: dto.username,
					firstname: dto.firstname,
					lastname: dto.lastname,
				},
			});

			return plainToInstance(RegisterDTO, newUser, {
				excludeExtraneousValues: true,
			});
		} catch (err) {
			if (err instanceof PrismaClientKnownRequestError) {
				if (err.code === 'P2002') {
					throw new ConflictException(
						'Invalid registration credentials',
					);
				}
			}
		}
	}

	refreshTokens() {
		return new NotImplementedException();
	}

	logout() {
		return new NotImplementedException();
	}

	async validateUser({ email, password }: LoginDTO) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (!user) throw new UnauthorizedException('Incorrect credentials');

		const isPasswValid = await argon.verify(user.password, password);

		if (!isPasswValid)
			throw new UnauthorizedException('Incorrect credentials');

		const payload = instanceToPlain(
			plainToInstance(RegisterDTO, user, {
				excludeExtraneousValues: true,
			}),
		);

		return {
			token: this.jwt.sign(payload, {
				secret: this.config.get('JWT_SECRET'),
			}),
		};
	}
}
