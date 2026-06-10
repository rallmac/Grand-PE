import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../hooks/IsTokenValid';

export default function PublicRoute({ children }) {
	const token =
	  localStorage.getItem('token') ||
	  sessionStorage.getItem('token');

	if (isTokenValid(token)) {
		return <Navigate to='/home' replace />;
	}

	return children;
}