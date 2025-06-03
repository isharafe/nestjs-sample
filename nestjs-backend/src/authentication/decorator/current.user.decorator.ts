import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import AuthConstants from '../authentication.constant';

/**
 * Experimental:
 * Decorator to extract the current user's username from the request context.
 * This decorator retrieves the username from the request object, which is set
 * by the authentication middleware.
 *
 * @returns {string} The username of the currently authenticated user.
 */
export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request[AuthConstants.USER_DATA].username;
  },
);
