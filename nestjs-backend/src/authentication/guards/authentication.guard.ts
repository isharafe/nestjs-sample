import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticationService } from '../service/authentication.service';
import { RequestContextEnum, RequestContextService } from '../service/request.context.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(
        private readonly authService: AuthenticationService,
        private readonly requestContextService: RequestContextService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const jwtPayload = await this.authService.decodeToken(token);
            const timeNow = Date.now() / 1000;

            if(jwtPayload.exp  && jwtPayload.exp < timeNow) {
                throw new UnauthorizedException();
            }

            this.updateRequestContext(request, jwtPayload);

            return true;
        } catch {
            throw new UnauthorizedException();
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    /**
     * jwt token payload has user specific data. store it in the request context for later use.
     * This allows us to access user data in other parts of the application without
     * having to pass it around explicitly.
     */
    private updateRequestContext (req: any, data: any) {
        this.requestContextService.set(RequestContextEnum.USER_DATA, data);
    }
}