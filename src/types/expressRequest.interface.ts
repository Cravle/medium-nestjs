import { UserEntity } from '@app/user/user.entity';
import { Request } from 'express';

export interface ExpressInterfaceRequest extends Request {
  user?: UserEntity;
}
