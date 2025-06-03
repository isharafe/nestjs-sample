import { Logger } from "@nestjs/common";

let logger = new Logger("ProxyFactory");

const proxyHandler = {
    get: (target: any, property: string, receiver: any) => {
        const originalMethod = target[property];
        logger.debug(`calling proxy method: ${target.toString()}, ${property.toString()}`);
        if (typeof originalMethod === 'function') {
            return function (...args: any[]) {
                logger.debug(`Calling method: ${property} with args: ${JSON.stringify(args)}`);
                const result = originalMethod.apply(target, args);
                return result;
            };
        }
        return Reflect.get(target, property, receiver);
    },
};

export function createProxy<T>(instance: T): T {
    return new Proxy(instance, proxyHandler);
}