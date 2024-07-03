import React from 'react';
import '../../styles/css/tailwindcss/tailwind.css'; // Import Tailwind CSS

const PriceCard = ({ link, priceId, price, duration }) => {
	return (
		<div className="bg-white shadow-md rounded-lg p-6 m-4 w-full md:w-1/3 lg:w-1/4">
			<h2 className="text-2xl font-bold mb-4">Subscription</h2>
			<p className="text-lg mb-2">Price: ${price} {duration}</p>
			<a href={link} className="text-blue-500 hover:underline">
				Subscribe
			</a>
		</div>
	);
};

export default PriceCard;