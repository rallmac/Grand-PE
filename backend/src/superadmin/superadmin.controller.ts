import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
} from '@nestjs/common';

import { SuperadminService } from './superadmin.service';

import { AuthGuard } from '@nestjs/passport';

import { SuperAdminGuard } from '../auth/guards/superadmin.guard';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('superadmin')
export class SuperadminController {

  constructor(
    private readonly superAdminService: SuperadminService,
  ) {}

  // ================= LOGIN =================
  @Post('login')
  login(
    @Body('email') email: string,

    @Body('password') password: string,
  ) {

    return this.superAdminService.login(
      email,
      password,
    );
  }

  // ================= LOGOUT =================
  @Post('logout')
  logout() {

    return this.superAdminService.logout();
  }

  // ================= APPROVE ADMIN =================
  @Post('approve-admin')
  approveAdmin(
    @Body('email') email: string,
  ) {

    return this.superAdminService.approveAdmin(
      email,
    );
  }

  // ================= REMOVE ADMIN =================
  @Post('remove-admin')
  removeAdmin(
    @Body('email') email: string,
  ) {

    return this.superAdminService.removeAdmin(
      email,
    );
  }

  // ================ FETCH PENDING ADMINS ===========
  @Get('pending-admins')
  getPendingAdmins() {
      return this.superAdminService.getPendingAdmins();
  }
}
