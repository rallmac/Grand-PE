import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable
} from '@nestjs/common';


@Injectable()
export class SuperAdminGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		const user = request.user;

		if (!user) {
			throw new ForbiddenException('Unauthorized');
		}

		if (user.email !== process.env.SUPERADMIN_EMAIL) {
			throw new ForbiddenException('Superadmin only');
		}

		return true;
	}
}