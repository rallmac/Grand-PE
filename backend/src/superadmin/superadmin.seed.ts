import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { SuperAdminSchema } from './schema/superadmin.schema';
import { Role } from '../user/enums/role.enum'

dotenv.config({ path: '../../.env' });

const MONGO_URI = process.env.MONGODB_URI;
const SUPERADMIN_PASSWORD = process.env.SUPERADMIN_PASSWORD;
const SUPERADMIN_EMAIL = process.env.SUPERADMIN_EMAIL;

if (!MONGO_URI) {
	throw new Error('MONGODB_URI is not defined');
}

if (!SUPERADMIN_PASSWORD) {
	throw new Error('SUPERADMIN_PASSWORD is not defined');
}

if (!SUPERADMIN_EMAIL) {
	throw new Error('SUPERADMIN_EMAIL is not defined');
}

async function seedSuperAdmin() {
	try {
		await mongoose.connect(MONGO_URI as string);

		const SuperAdmin = mongoose.model(
			'SuperAdmin',
			SuperAdminSchema,
		);

		const existing = await SuperAdmin.findOne({
			email: SUPERADMIN_EMAIL,
		});

		if (existing) {
			console.log('Superadmin already exists');
			return;
		}

		const hashedPassword = await bcrypt.hash(
			SUPERADMIN_PASSWORD as string,
			10,
		);

		await SuperAdmin.create({
			email: SUPERADMIN_EMAIL,
			password: hashedPassword,
			role: Role.SUPERADMIN,
			isVerified: true,
			isSuperAdmin: true,
		});

		console.log('Superadmin created successfully');
	} catch (error) {
		console.error(
			'Error seeding superadmin:',
			error,
		);
	} finally {
		await mongoose.disconnect();
	}
}

seedSuperAdmin();