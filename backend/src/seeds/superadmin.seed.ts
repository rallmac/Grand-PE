import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { UserSchema } from '../user/schema/user.schema';


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
		await mongoose.connect(MONGO_URI as string);

		const User = mongoose.model('User', UserSchema);

		const email = 'tobijahekperikpe@gmail.com';

		const password = process.env.SUPERADMIN_PASSWORD as string;

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
	} catch (error){
		console.error('Error sending superadmin', error);
	} finally {
		await mongoose.disconnect();
	}
}

seedSuperAdmin();

// ts-node src/seeds/superadmin.seed.ts
