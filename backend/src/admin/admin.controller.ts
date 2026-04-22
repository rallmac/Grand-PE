import { Controller, Body, Delete, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('admin')
export class AdminController {
    constructor(
        private adminService: AdminService,
    ){}

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('superadmin')
    @Post('whitelist')
    add(@Body('email') email: string){
        return this.adminService.whitelistEmail(email);
    }

    @Delete('whitelist')
    remove(@Body('email') email: string) {
        return this.adminService.removedFromWhitelist(email);
    }
}
