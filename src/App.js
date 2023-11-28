import React from 'react'
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import Signup from './auth/Signup';
import { Route, Routes } from 'react-router-dom';
import Signin from './auth/Signin';
import Dashboard from './auth/Dashboard';
import PrivatePage from './router/privatePage';


const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<PrivatePage>
					<Dashboard />
				</PrivatePage>}></Route>
				<Route path='/Signin' element={<Signin />}></Route>
				<Route path='/Signup' element={<Signup />} />
				<Route path='/ForgotPassword' element={<ForgotPassword />} />
				<Route path='/ResetPassword' element={<ResetPassword />} />

			</Routes>
		</>
	);
}

export default App