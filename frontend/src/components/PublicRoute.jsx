import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children }) {
	const token =
	  localStorage.getItem('token') ||
	  sessionStorage.getItem('token');

	if (token) {
		<Navigate to='/dashboard' replace />;
	}

	return children;
}
