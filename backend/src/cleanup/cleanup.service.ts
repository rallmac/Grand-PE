import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CleanupService {
	constructor(
		@InjectModel('User') private userModel: Model<any>,
	) {}

	@Cron(CronExpression.EVERY_MINUTE)
	async cleanExpiredTokens() {
		const now = new Date();
		const result = await this.userModel.updateMany(
		{
			verificationTokenExpires: { $lt: now },
		},
		{
			$unset: {
				verificationToken: '',
				verificationTokenExpires: '',
			},
		},
		);

		console.log(`Cleaned ${result.modifiedCount} expired tokens`);
	}
}
