import { SetMetadata } from '@nestjs/common';
import { UserRole } from "../../auth/user.entity";

export const Roles = (...args: UserRole[]) => SetMetadata('roles', args);
