import { Module, OnModuleInit, Injectable, Inject, Provider, Logger } from '@nestjs/common';
import { DiscoveryService, DiscoveryModule, Reflector } from '@nestjs/core';
import { createProxy } from './proxy.factory';

@Injectable()
export class ProxiedServices implements OnModuleInit {

    private readonly logger = new Logger(ProxiedServices.name);

    constructor(
        @Inject(DiscoveryService) private readonly discoveryService: DiscoveryService,
        private readonly reflector: Reflector
    ) { }

    onModuleInit() {
        const providers = this.discoveryService
            .getProviders()
            .filter(provider => provider.metatype && provider.instance);

        providers.forEach(provider => {
            const originalInstance = provider.instance;
            const proxiedInstance = createProxy(originalInstance);
            provider.instance = proxiedInstance;

            this.logger.debug(`Creating proxy for: ${provider.name}`);
        });
    }
}

@Module({
    imports: [DiscoveryModule],
    providers: [ProxiedServices],
})
export class ProxiedServicesModule { }
