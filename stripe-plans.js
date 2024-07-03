// stripe-plans.js

export const stripePricingPlans = [
	{
		priceTitle: 'Starter Plan',
		priceDescription: 'Best option for personal use & for your next project.',
		link:
			process.env.ENVIRONMENT === 'development'
				? 'https://buy.stripe.com/test_9AQaH8ehL4YOdeo5kn'
				: 'https://buy.stripe.com/fZecQF0XVdvddTG9AE',
		priceId:
			process.env.ENVIRONMENT === 'development'
				? 'price_1PY6XzDbLsTEfXvIZOE2SqFl'
				: 'price_1PY6Y6DbLsTEfXvI00kIviWr',
		price: 9.99,
		duration: '/year',
		pricePerks: [
			{ title: 'Authentication and user profile' },
			{ title: 'Create integration to Google' },
			{ title: 'AI platform in use: ChatGPT' },
			{ title: 'Dashboards: 1' },
			{ title: 'Teams: 1' },
			{ title: 'Team users: 1' },
			{ title: 'Premium support' },
			{ title: 'Free updates' }
		]
	},
	{
		priceTitle: 'Team Plan',
		priceDescription: 'Best option for a small team or organisation.',
		link:
			process.env.ENVIRONMENT === 'development'
				? 'https://buy.stripe.com/test_8wM3eG3D73UKgqAaEG'
				: 'https://buy.stripe.com/8wM8ApeOLaj13f29AD',
		priceId:
			process.env.ENVIRONMENT === 'development'
				? 'price_1PY6YSDbLsTEfXvIWuEHapK5'
				: 'price_1PY6YZDbLsTEfXvIrbWus0bf',
		price: 39.99,
		duration: '/year',
		pricePerks: [
			{ title: 'Authentication and user profile' },
			{ title: 'Create integration to Google' },
			{ title: 'AI platform in use: ChatGPT' },
			{ title: 'Dashboards: 10' },
			{ title: 'Teams: 1' },
			{ title: 'Team users: 3' },
			{ title: 'Premium support' },
			{ title: 'Free updates' }
		]
	},
	{
		priceTitle: 'Large Team Plan',
		priceDescription: 'Best option for a small team or organisation.',
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
			{ title: 'Authentication and user profile' },
			{ title: 'Create integration to Google + custom APIs' },
			{ title: 'AI platform in use: Custom AI for maximum security' },
			{ title: 'Dashboards: +10' },
			{ title: 'Teams: +10' },
			{ title: 'Team users: +10' },
			{ title: 'Premium support' },
			{ title: 'Free updates' }
		]
	}
];
