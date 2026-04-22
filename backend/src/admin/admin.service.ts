import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminAllowlist, AdminSchema } from './schema/admin.schema';
import { EmailService } from '../email/email.service';

@Injectable()
export class AdminService {
	constructor(
		@InjectModel(AdminAllowlist.name)
		private adminAllowlistModel: Model<AdminAllowlist>,

		//@InjectModel()
		private readonly mailService: EmailService,
		){}

	async whitelistEmail(email: string) {
		const exists = await this.adminAllowlistModel.findOne({ email });
		if (exists) throw new Error('Already whitelisted');

		const admin = this.adminAllowlistModel.create({ email });

		await this.mailService.approvedAsAdmin(email);

		return admin;
	}



	async removedFromWhitelist(email: string) {
		const admin = await this.adminAllowlistModel.findOneAndDelete({ email });

		if (!admin) throw new Error('Email not found');

		await this.mailService.removedAsAdmin(email);

		return { message: 'Removed successfully' };
	}
}
