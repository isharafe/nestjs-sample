import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

/**
 * this service is used to store and retrieve request-specific context data
 * using AsyncLocalStorage. It allows you to run a callback with a specific context
 * and access that context data later in the request lifecycle.
 */
@Injectable()
export class RequestContextService {
    private asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();

    run(context: Map<string, any>, callback: (...args: any[]) => void) {
        this.asyncLocalStorage.run(context, callback);
    }

    get<T>(key: string): T {
        const store = this.asyncLocalStorage.getStore();
        return store?.get(key);
    }

    set<T>(key: string, value: T) {
        const store = this.asyncLocalStorage.getStore();
        if (store) {
            store.set(key, value);
        }
    }
}

export enum RequestContextEnum {
    USER_DATA="user_data",
}