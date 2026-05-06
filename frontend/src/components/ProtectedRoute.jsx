import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../hooks/IsTokenValid';

export default function ProtectedRoute({ children }) {
	const token =
	  localStorage.getItem('token') ||
	  sessionStorage.getItem('token');

	if (!isTokenValid(token)) {
		return <Navigate to='/signin' replace/>;
	}

	return children;
}
