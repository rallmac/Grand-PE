import {
  Controller,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { SuperadminService } from './superadmin.service';
import { AuthGuard } from '@nestjs/passport';
import { SuperAdminGuard } from '../auth/guards/superadmin.guard';

@Controller('superadmin')
export class SuperadminController {
  constructor(
    private readonly superAdminService: SuperadminService,
  ) {}

  // ================= LOGIN =================
 @UseGuards(AuthGuard('jwt'), SuperAdminGuard)
  @Post('login')
  login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.superAdminService.login(email, password);
  }

  // ================= LOGOUT =================
  @UseGuards(AuthGuard('jwt'), SuperAdminGuard)
  @Post('logout')
  logout() {
    return this.superAdminService.logout();
  }

  // ================= APPROVE ADMIN =================
  @UseGuards(AuthGuard('jwt'), SuperAdminGuard)
  @Post('approve-admin')
  approveAdmin(@Body('email') email: string) {
    return this.superAdminService.approveAdmin(email);
  }

  // ================= REMOVE ADMIN =================
  @UseGuards(AuthGuard('jwt'), SuperAdminGuard)
  @Post('remove-admin')
  removeAdmin(@Body('email') email: string) {
    return this.superAdminService.removeAdmin(email);
  }
}
