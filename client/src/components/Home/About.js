import React from 'react';

const About = () => {
	return (
		<div name="about" className="about md:bg-about bg-cover bg-top w-full h-full md:h-screen">
			<div className="w-full md:max-w-screen-lg mx-auto p-8 flex flex-col justify-center z-[2]">
				<h1>
					About Us
				</h1>
				<p className="my-4 text-center">
					Camp Fire was founded in 2023 by a camper, <em className="text-teal-400">for campers</em>.
				</p>
				<div className="flex flex-wrap justify-evenly items-start md:bg-[#ffffff8a] rounded-lg leading-loose">
					<div className="w-full md:w-1/2 p-4">
					A camping community app is a platform that connects campers and outdoor enthusiasts. Users can search, post their programs, share their camping experiences discover new and scenic places to camp, and connect with other like-minded individuals. Users can also use the app to plan and organize camping trips, and even ask for camping tips from other users.
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
