import { SetMetadata } from '@nestjs/common';
import { Roles } from '../enums/roles.enum';

export const AuthorizedRoles = (...roles: Roles[]) => SetMetadata('roles', roles);