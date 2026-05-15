import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../hooks/IsTokenValid';

export default function AdminPublicRoute({ children }) {
	const token =
	  localStorage.getItem('token') ||
	  sessionStorage.getItem('token');

	if (isTokenValid(token)) {
		return <Navigate to='/admin-dashboard' replace />;
	}

	return children;
}