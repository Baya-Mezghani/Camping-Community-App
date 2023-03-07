import React from 'react';
//import icons
import { Facebook, Instagram, Twitter, Heart , Linkedin } from 'react-feather';

const Footer = () => {
	return (
		<footer className="footer mt-auto w-full px-4 py-8 bg-gray-800 text-white">
			<div className="w-full">
				<div className="upper">
					<h3 className="text-teal-200 text-xl font-semibold uppercase">
						Camp Fire
					</h3>
					<div className="social">
						<Facebook size={25} className="icon" />
						<Instagram size={25} className="icon" />
						<a href='https://www.linkedin.com/in/baya-mezghani-23338b228/' target={'_blank'}><Linkedin size={25} className="icon" /></a>
						<Twitter size={25} className="icon" />
						
					</div>
				</div>
				<div className="lower">
					<div className="left">
						<ul>
							<li>Privacy & Terms</li>
							<li>Policy</li>
							<li>Help Center</li>
							<li>Partnership</li>
							<li>Contact</li>
						</ul>
					</div>
					<div className="right">
						<ul>
							<li>&copy; 2023 Camp Fire. All rights reserved.</li>
							<a
								href="https://github.com/Baya-Mezghani/Camping-Community-App"
								target="_blank"
								className="flex justify-center hover:text-teal-200 cursor-pointer transition-all ease-in duration-500"
							>
								<li className="inline-flex">
									Made with <Heart size={15} className="text-teal-200 mx-1" />{" "}
									by Baya.
								</li>
							</a>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
