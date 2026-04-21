import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
    async whitelistEmail(email: string) {
        const exists = await this.adminModel.findOne({ email });
        if (exists) throw new Error('Already whitelisted');

        const admin = this.adminModel.create({ email });

        await this.mailService.approvedAsAdmin(email);

        return admin;
    }

    async removedFromWhitelist(email: string) {
        const admin = await this.adminModel.findOneAndDelete({ email });

        if (!admin) throw new Error('Email not found');

        await this.mailService.removedAsAdmin(email);

        return { message: 'Removed successfully' };
    }
}
