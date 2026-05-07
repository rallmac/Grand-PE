import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../hooks/IsTokenValid';

export default function AdminProtectedRoute({ children }) {
	const token =
	  localStorage.getItem('token') ||
	  sessionStorage.getItem('token');

	if (!isTokenValid(token)) {
		return <Navigate to='/admin-signin' replace/>;
	}

	return children;
}