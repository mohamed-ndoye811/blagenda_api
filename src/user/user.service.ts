import { ConflictException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "generated/prisma/runtime/library";
import { plainToInstance } from "class-transformer";
import argon from "argon2";

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		const hashedPassword = await argon.hash(createUserDto.password);

		try {
			const newUser = await this.prisma.user.create({
				data: {
					email: createUserDto.email,
					password: hashedPassword,
					username: createUserDto.username,
					firstname: createUserDto.firstname,
					lastname: createUserDto.lastname,
				},
			});

			return plainToInstance(CreateUserDto, newUser, {
				excludeExtraneousValues: true,
			});
		} catch (err) {
			if (err instanceof PrismaClientKnownRequestError) {
				if (err.code === "P2002") {
					throw new ConflictException("Invalid registration credentials");
				}
			}
		}
	}

	findAll() {
		const users = this.prisma.user.findMany({
			omit: {
				password: true,
				resetPasswordToken: true,
			},
		});

		return users;
	}

	findOne(id: number) {
		return `This action returns a #${id} user`;
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		try {
			const updatedUser = await this.prisma.user.update({
				where: {
					id: id,
				},
				data: {
					email: updateUserDto.email,
					username: updateUserDto.username,
					firstname: updateUserDto.firstname,
					lastname: updateUserDto.lastname,
					avatarURL: updateUserDto.avatarURL,
				},
			});

			return plainToInstance(UpdateUserDto, updatedUser, {
				excludeExtraneousValues: true,
			});
		} catch (err) {
			if (err instanceof PrismaClientKnownRequestError) {
				if (err.code === "P2002") {
					throw new ConflictException("Invalid registration credentials");
				}
			}
		}
	}

	async remove(id: string) {
		try {
			await this.prisma.user.delete({
				where: {
					id: id,
				},
			});
		} catch (err) {
			if (err instanceof PrismaClientKnownRequestError) {
				if (err.code === "P2002") {
					throw new ConflictException("Invalid registration credentials");
				}
			}
		}

		return `User deleted successfully`;
	}
}
