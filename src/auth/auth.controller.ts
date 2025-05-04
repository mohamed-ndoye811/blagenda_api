import { Body, Controller, Get, Post, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDTO } from "./dto/register.dto";
import { LocalAuthGuard } from "./guards/local.guard";
import { Public } from "src/public/public.decorator";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { LoginDTO } from "./dto/login.dto";

@ApiBearerAuth()
@Controller("auth")
export class AuthController {
	constructor(private service: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
	@Post("login")
    @ApiResponse({ status: 201, description: 'Successfully logged in' })
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async login(@Request() req: any, @Body() dto: LoginDTO) {
        return req.user;
    }

    @Public()
	@Post("register")
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    async register(@Body() dto: RegisterDTO) {
		return await this.service.register(dto);
	}

	@Post("refresh")
	refreshTokens() {
		return this.service.refreshTokens();
	}

    @Get("me")
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    me(@Request() req: any) {
        return req.user;
    }
}
