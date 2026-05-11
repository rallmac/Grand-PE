import { Injectable, CanActivate, ExecutionContext, ForbiddenException} from '@nestjs/common';
import { Reflector } from '@nestjs/core';


@Injectable() export class RolesGuard implements CanActivate {
	constructor(
		private reflector: Reflector
	) {} 

	canActivate(
		context: ExecutionContext
		): boolean 
	{ 
		const requiredRoles = 
		this.reflector.getAllAndOverride<string[]>( 'roles', [
			context.getHandler(),
			context.getClass(),
		],
	);

		if (!requiredRoles) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const user = request.user;

		// No authenticated user
		if (!user) {
			throw new ForbiddenException('Access denied')
		}

		const hasRole = requiredRoles.includes(user.role);

		if (!hasRole) {
			throw new ForbiddenException('Admin only');
		}

		return true;
	}
}