import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {
	@IsNotEmpty()
	@IsEmail()
	@ApiProperty({
		default: "john.doe@gmail.com",
	})
	email: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		default: "1234",
	})
	password: string;
}
