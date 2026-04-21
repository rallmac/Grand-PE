import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { userSchema } from './user/schema/user.schema';


dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;
const SUPERADMIN_PASSWORD = process.env.SUPERADMIN_PASSWORD;

if (!MONGO_URI) {
	throw new Error('MONGO_URI is not defined');
}

if (!SUPERADMIN_PASSWORD) {
	throw new Error('SUPERADMIN_PASSWORD is not defined');
}

async function seedSuperAdmin() {
	try{
		await mongoose.connect(MONGO_URI);

		const User = mongoose.model('User', userSchema);

		const email = 'tobijahekperikpe@gmail.com';

		const password = process.env.SUPERADMIN_PASSWORD;

		const existing = await User.findOne({ email });

		if (existing) {
			console.log('Superadmin already exists');
			return;
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await User.create({
			email,
			password: hashedPassword,
			role: 'superadmin',
			isVerified: true,
		});

		console.log('Superadmin created successfully');
	} catch {
		console.error('Error sending superadmin', error);
	} finally {
		await mongoose.disconnect();
	}
	await mongoose.disconnect();
}

seedSuperAdmin();

// ts-node src/seeds/superadmin.seed.ts
