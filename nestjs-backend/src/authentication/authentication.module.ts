import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import AuthConstants from './authentication.constant';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationController } from './controller/authentication.controller';
import { AuthenticationService } from './service/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.model';
import { AuthenticationGuard } from './guards/authentication.guard';
import { RequestContextService } from './service/request.context.service';
import { RequestContextMiddleware } from './middleware/request.context.middleware';

@Module({
    imports: [
        ConfigModule.forRoot(),
        // https://github.com/nestjs/jwt/blob/master/README.md
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>(AuthConstants.JWT_SECRET),
                signOptions: {
                    // https://github.com/auth0/node-jsonwebtoken#usage
                    expiresIn: configService.get(AuthConstants.JWT_EXPIRE),
                },
            }),
        }),
        TypeOrmModule.forFeature([User])
    ],
    controllers: [
        AuthenticationController,
    ],
    providers: [
        AuthenticationGuard,
        AuthenticationService,
        RequestContextService,
    ],
    exports: [
        AuthenticationGuard,
        AuthenticationService,
        RequestContextService,
    ]
})
export class AuthenticationModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(RequestContextMiddleware)
        .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
