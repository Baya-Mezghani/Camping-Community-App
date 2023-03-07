import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import Layout from '../components/Layout/Dashboard';
import { AtSymbolIcon, LockClosedIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
  
	const handleEmailChange = (e) => {
	  setEmail(e.target.value);
	};
  
	const handlePasswordChange = (e) => {
	  setPassword(e.target.value);
	};
  
	const handleSubmit = async (e) => {
	  e.preventDefault();
  
	  try {
		const response = await axios.post('http://localhost:4000/users/login', { email, password });
		if (response.data.ok) {
		Auth.login(response.data.token);
		localStorage.setItem('user', JSON.stringify(response.data.user));
		}
		
	  } catch (error) {
		setErrorMsg(error.response.data.msg);
	  }
	};

	return (
		<Layout>
      <div className="w-full h-screen">
			  <div className="login bg-login bg-fixed bg-cover w-full h-full flex flex-col justify-center items-center px-4 ">
          <div className="mb-8 flex flex-col justify-center items-center text-white z-[1]">
            <h1>Welcome Back</h1>
            <h2>There’s a whole world out there</h2>
        	</div>
       	 	<div className="card">
						<form className="w-full max-w-[500px]" onSubmit={handleSubmit}>
							<div className="relative">
								<div className="icons">
									<AtSymbolIcon width={20} />
								</div>
								<input
									placeholder="Your email address"
									name="email"
									type="email"
									id="email"
									value={email}
									onChange={handleEmailChange}
									required
								/>
							</div>
							<div className="relative">
								<div className="icons">
									<LockClosedIcon width={20} />
								</div>
								<input
									placeholder="Password"
									name="password"
									type="password"
									id="password"
									value={password}
									onChange={handlePasswordChange}
									required
								/>
							</div>

							<button type="submit" className="primary">
								Log In
							</button>

							<div className="w-full flex justify-center items-center text-sm leading-loose">
								Don't have an account?
								<Link to="/signup" className="inline-flex items-center ml-2 text-teal-400 hover:text-teal-200">
									Sign up <ArrowLongRightIcon width={25} className="inline-flex items-center ml-1" />
								</Link>
							</div>
						</form>
						{errorMsg && <div className="text-sm text-slate-600 italic">Login failed</div>}
					</div>
					<div className="w-full h-full absolute top-0 left-0 bg-gradient-to-r opacity-80 from-teal-100 via-slate-600 to-sky-800 z-0"></div>
        </div>
			</div>
		</Layout>
	);
};

export default Login;