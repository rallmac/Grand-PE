import { Controller } from '@nestjs/common';

@Controller('admin')
export class AdminController {
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('superadmin')
    @Post('whitelist')
    add(@Body('email') email: string){
        return await this.adminService.whitelistEmail(email);
    }

    @Delete('whitelist')
    remove(@Body('email') email: string) {
        return await this.adminService.removeFromWhitelist(email);
    }
}
