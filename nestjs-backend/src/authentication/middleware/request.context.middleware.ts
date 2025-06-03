import { Injectable, NestMiddleware } from "@nestjs/common";
import { RequestContextService } from "../service/request.context.service";
import { NextFunction } from "express";

/**
 * use a middleware to create a request specific map and make sure it is accessible
 * throughout the request lifecycle.
 */
@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
    constructor(
        private readonly requestContextService: RequestContextService,
    ) {}

    use(req: Request, res: Response, next: NextFunction) {
        const context = new Map();
        this.requestContextService.run(context, () => {
            next();
        });
    }
}