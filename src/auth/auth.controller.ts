import { Body, Controller, Get, Post, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDTO } from "./dto/register.dto";
import { LocalAuthGuard } from "./guards/local.guard";
import { Public } from "src/public/public.decorator";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiBearerAuth()
@Controller("auth")
export class AuthController {
	constructor(private service: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
	@Post("login")  
    async login(@Request() req: any) {
        return req.user;
    }

    @Public()
	@Post("register")
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
