import React from 'react'
import { Navigate } from 'react-router'


export default function privatePage({ children }) {

	const user = localStorage.getItem("token")

	if (user === null) {
		return <Navigate to="/signin" />;
	}


	return (
		<div>
			{children}
		</div>
	);
}