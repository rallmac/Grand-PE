import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminSchema } from './schema/admin.schema';
import { EmailService } from '../email/email.service';

@Injectable()
export class AdminService {
	constructor(
		@InjectModel(Admin.name)
		private adminModel: Model<Admin>,

		//@InjectModel()
		private readonly mailService: EmailService,
		){}

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