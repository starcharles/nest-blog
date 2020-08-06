import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from "@nestjs/core";
import { UserRole } from "../../auth/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return this.matchRoles(roles, user.roles);
    }

    private matchRoles(roles: UserRole[], userRole: UserRole): boolean {
        const match = roles.find(role => role === userRole)
        if(!match) {
            throw new UnauthorizedException()
        }
        return true;
    }
}
