import { Link } from 'react-router-dom';

//This is the verify form component. This form is will then
//be imported and called in the Verify.js page

export default function VerifyForm () {
	return(
		<div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900" >
			<p className="mt-10 text-center text-2xl font-bold text-white">
				Email Verification is successful!
			</p>
			<button className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-white">
				<Link className="text-white" to="/set-password">
					Set Password
				</Link>
			</button>
		</div>
	)
};