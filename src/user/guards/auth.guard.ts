import { ExpressInterfaceRequest } from '@app/types/expressRequest.interface';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<ExpressInterfaceRequest>();

    if (request.user) {
      return true;
    }

    throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
  }
}
