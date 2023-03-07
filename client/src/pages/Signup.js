import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';
import Layout from '../components/Layout/Dashboard';
import { UserIcon, AtSymbolIcon, LockClosedIcon, ArrowLongRightIcon, MapPinIcon, PencilSquareIcon } from '@heroicons/react/24/solid';

const Signup = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [location, setLocation] = useState('');
	const [description, setDescription] = useState('');
	const [error, setError] = useState(null);

  
	const handleSubmit = async (event) => {
	  event.preventDefault();
	  try {
		const response = await axios.post('http://localhost:4000/users/signup', {
		  username,
		  email,
		  password,
		  location,
		  description
		});
		console.log(response.data);
		window.location.href = '/login';

	  } catch (error) {
		console.log(error);
		setError(error.message);
		// Handle error
	  }
	};
	return (
		<Layout>
      <div className="w-full h-screen">
			  <div className="signup bg-signup bg-fixed bg-cover w-full h-full flex flex-col justify-center items-center px-4">
					<div className="mb-8 flex flex-col justify-center items-center text-white z-[1]">
						<h1>Sign Up</h1>
						<h2>Join the camping community</h2>
					</div>
					<div className="card">
						<form className="w-full max-w-[500px]" onSubmit={handleSubmit}>
							<div className="relative">
								<div className="icons">
									<UserIcon width={20} />
								</div>
								<input
									placeholder="Enter username"
									name="username"
									type="username"
									id="username"
									value={username}
									onChange={(event) => setUsername(event.target.value)}
								/>
							</div>
							<div className="relative">
								<div className="icons">
									<AtSymbolIcon width={20} />
								</div>
								<input
									placeholder="Enter email address"
									name="email"
									type="email"
									id="email"
									value={email}
									onChange={(event) => setEmail(event.target.value)}
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
									onChange={(event) => setPassword(event.target.value)}
								/>
							</div>
							<div className="relative">
								<div className="icons">
									<MapPinIcon width={20} />
								</div>
								<input
									placeholder="Location"
									name="location"
									type="location"
									id="location"
									value={location}
									onChange={(event) => setLocation(event.target.value)}
								/>
							</div>
							<div className="relative">
								<div className="icons">
									<PencilSquareIcon width={20} />
								</div>
								<input
									placeholder="Tell us a little about yourself"
									name="description"
									type="description"
									id="description"
									value={description}
									onChange={(event) => setDescription(event.target.value)}
								/>
							</div>

							<button type="submit" className="primary">
								Create Account
							</button>

							<div className="w-full flex justify-center items-center text-sm leading-loose">
								Already a member?
								<Link to="/login" className="inline-flex items-center ml-2 text-teal-400 hover:text-teal-200">
									Login <ArrowLongRightIcon width={25} className="inline-flex items-center ml-1" />
								</Link>
							</div>
						</form>
						{error && <div className="text-sm text-slate-600 italic">Sign up failed</div>}
					</div>
					<div className="w-full h-full absolute top-0 left-0 bg-gradient-to-r opacity-80 from-teal-100 via-slate-600 to-sky-800 z-0"></div>
        </div>
			</div>
		</Layout>
	);
};

export default Signup;