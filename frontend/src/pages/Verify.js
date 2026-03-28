import VerifyForm from '../components/VerifyForm';

//This page is called when the email verification
//link is clicked upon receiving the verification
//link by the user. it then redirects to the setPassword
//page

export default function Verify() {
	return(
		<>
		<VerifyForm />
		</>
	)
};