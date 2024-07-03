import React, { useContext } from "react"
import '../../../styles/css/tailwindcss/tailwind.css'; // Import Tailwind CSS
import { stripePricingPlans } from "../../../../stripe-plans";
import { AppContext } from "../../../context/Context";
import PriceCard from "../../Card/PriceCard";
import Button from "../../Button/Button";

const PricingTable = () => {

	const { user } = useContext(AppContext);
	return (

		<section className="bg-white dark:bg-gray-900">
			<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
				<div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
					<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Designed for business teams like yours</h2>
					<p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Here at Hyperfigures we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
				</div>
				<div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
					{
						stripePricingPlans.map((item, i) => {
							return (
								<div key={i} className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
									<h3 className="mb-4 text-2xl font-semibold">{item.priceTitle}</h3>
									<p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">{item.priceDescription}</p>
									<div className="flex justify-center items-baseline mt-8">
										<span className="mr-2 text-5xl font-extrabold">{item.price} €</span>
										<span className="text-gray-500 dark:text-gray-400">{item.duration}</span>
									</div>
									<p className="text-s mb-10 text-gray-blue ">Includes VAT</p>
									<div className="ml-auto mr-auto mb-10">
										<Button
											small={false}
											primary={true}
											title='Choose plan'
											layoutType="linkOutside"
											to={item.link + '?prefilled_email=' + user[0].email}

										/>
									</div>
									<ul role="list" className="mb-8 space-y-4 text-left">
										{
											item.pricePerks.length > 0 ? item.pricePerks.map((item, i) => {
												return (
													<li key={i} className="flex items-center space-x-3">

														<svg className="flex-shrink-0 w-5 h-5 text-green-500 fillCurrent" fill="text-green-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
														<span>{item.title}</span>
													</li>
												)
											})
												:
												null
										}

									</ul>

								</div>
							)
						})
					}

				</div>
			</div>
		</section>

	)
}

export default PricingTable;