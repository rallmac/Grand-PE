import { Navigate } from 'react-router-dom';
//import { isTokenValid } from '../hooks/IsTokenValid';

export default function PublicRoute({ children }) {
	const token =
	  localStorage.getItem('token') ||
	  sessionStorage.getItem('token');

	if (token) {
		return <Navigate to='/dashboard' replace />;
	}

	return children;
}