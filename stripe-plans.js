// stripe-plans.js

export const stripePricingPlans = [

	{
		priceTitle: 'Team Plan',
		priceDescription: 'Best option for a team or an organisation.',
		link:
			process.env.ENVIRONMENT === 'development'
				? 'https://buy.stripe.com/test_8wM3eG3D73UKgqAaEG'
				: 'https://buy.stripe.com/8wM8ApeOLaj13f29AD',
		priceId:
			process.env.ENVIRONMENT === 'development'
				? 'price_1PY6YSDbLsTEfXvIWuEHapK5'
				: 'price_1PY6YZDbLsTEfXvIrbWus0bf',
		price: 39.99,
		duration: '/month',
		pricePerks: [
			{ title: 'Authentication and User Profile' },
			{ title: 'Create integrations to Google Sheets' },
			{ title: 'AI platform in use: ChatGPT' },
			{ title: 'Create Dashboards' },
			{ title: 'Create Teams' },
			{ title: 'Invite team users' },
			{ title: 'Free updates' }
		]
	},
	{
		priceTitle: 'Large Team Plan',
		priceDescription: 'Best option for large team with isolated AI needed for maximum security.',
		link:
			process.env.ENVIRONMENT === 'development'
				? 'https://buy.stripe.com/test_3cs6qS2z30IygqAeUV'
				: 'https://buy.stripe.com/https://buy.stripe.com/14keYNcGD2Qz02QcMO',
		priceId:
			process.env.ENVIRONMENT === 'development'
				? 'price_1PY6ZODbLsTEfXvIk5jobSe4'
				: 'price_1PY6ZTDbLsTEfXvITVqFEgrw',
		price: 1199.99,
		duration: '/year',
		pricePerks: [
			{ title: 'Authentication and User Profile' },
			{ title: 'Create integration to Google + custom APIs' },
			{ title: 'AI platform in use: Custom AI for maximum security' },
			{ title: 'Create Dashboards' },
			{ title: 'Create Teams' },
			{ title: 'Invite team users' },
			{ title: 'Premium support' },
			{ title: 'Free updates' }
		]
	}
];
