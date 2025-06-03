import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from '../service/authentication.service';
import { LoginDto } from '../dto/login.dto';

@ApiTags('authentication')
@Controller('api/authentication')
export class AuthenticationController {
    constructor(private authService: AuthenticationService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: LoginDto) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }
}
