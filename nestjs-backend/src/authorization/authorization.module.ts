import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { ProxiedServices } from './proxy/proxy.wrapper';
import { DatabaseModule } from 'src/database/database.module';


@Module({
    imports: [
        DiscoveryModule,
        DatabaseModule,
    ],
    providers: [
        ProxiedServices,
    ],
  })
export class AuthorizationModule { }
