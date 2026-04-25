import { Injectable } from '@nestjs/common';

@Injectable()
export class SuperadminService {
	constructor(
	){}

	// ================= APPROVE (SUPERADMIN ONLY) =================
  async approveAdmin(email: string) {
    const admin = await this.adminModel.findOne({ email });

    if (!admin) throw new BadRequestException('Admin not found');

    admin.isApproved = true;
    await admin.save();

    await this.emailService.approveAsAdmin(email);

    return { message: 'Admin approved' };
  }
}

