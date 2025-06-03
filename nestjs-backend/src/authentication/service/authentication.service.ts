import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../model/user.model';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import AuthConstants from '../authentication.constant';

@Injectable()
export class AuthenticationService {

    private readonly logger = new Logger(AuthenticationService.name);

    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        @InjectRepository(User) private userRepo: Repository<User>,
    ) { }

    async signIn(username: string, pass: string): Promise<{ access_token: string }> {

        if(username==null || username.trim().length==0 ||
            pass==null || pass.trim().length==0) {
                throw new UnauthorizedException("Username or password cannot be empty!");
        }

        const passHash = crypto.createHash('sha1').update(pass).digest('hex');
        const user = await this.userRepo.findOne({ select: ["username"], where: {username: username, password: passHash}});

        if(user==null) {
            this.logger.warn(`authentication failed for user: ${username}`);
            throw new UnauthorizedException();
        }

        /* Registered Claim Names:
        "iss" (Issuer) Claim
        "sub" (Subject) Claim
        "aud" (Audience) Claim
        "exp" (Expiration Time) Claim
        "nbf" (Not Before) Claim
        "iat" (Issued At) Claim
        "jti" (JWT ID) Claim
       */
        const payload = { sub: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async decodeToken(token: string) {
        const jwtPayload = await this.jwtService.verifyAsync<TokenPayload>(
            token,
            { secret: this.configService.get<string>(AuthConstants.JWT_SECRET) }
        );
        return jwtPayload;
    }

    isUserAuthenticated(payload: string) {

    }
}
