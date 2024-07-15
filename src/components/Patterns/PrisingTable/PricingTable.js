import React, { useContext } from "react"
import '../../../styles/css/tailwindcss/tailwind.css'; // Import Tailwind CSS
import { stripePricingPlans } from "../../../../stripe-plans";
import { AppContext } from "../../../context/Context";
import PriceCard from "../../Card/PriceCard";
import Button from "../../Button/Button";

const PricingTable = ({ currentPlan, activeSubscription }) => {

	const { user, activeTeam } = useContext(AppContext);
	return (

		<section className="" id="pricing">
			<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
				<div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
					<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">One fee for your whole team.</h2>
					<p className="mb-5 font-light text-gray-500 sm:text-xl ">Here at Hyperfigures we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
				</div>
				<div className="space-y-8 lg:grid lg:grid-cols-1 sm:gap-6 xl:gap-10 lg:space-y-0">
					{
						stripePricingPlans.map((item, i) => (
							<div key={i} className="flex mx-auto flex-col p-6 max-w-lg text-center text-gray-900 bg-white bg-opacity-10 rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white flex-grow">
								<h2 className="mb-4 text-4xl text-gray-900 font-semibold">{item.priceTitle}</h2>
								{
									activeSubscription === true && currentPlan === item.priceId
										?
										<h4 className="font-medium text-green-500 sm:text-lg dark:text-gray-400">This is your team&apos;s active plan</h4>
										:
										<h4 className="font-light text-gray-500 sm:text-lg dark:text-gray-400">{item.priceDescription}</h4>
								}
								<div className="flex justify-center items-baseline mt-8">
									<span className="mr-2 text-6xl text-gray-900 font-extrabold">{item.price} €</span>
								</div>
								<span className="text-gray-900 ">{item.duration}</span>

								<p className="text-s mb-10 text-gray-900 ">Includes VAT</p>
								{
									activeSubscription === true && currentPlan === item.priceId
										? null
										:
										<div className="ml-auto mr-auto mb-10">
											<Button
												style={{ zIndex: 100000 }}
												small={false}
												primary={true}
												title='Choose plan'
												layoutType="linkOutside"
												to={`${item.link}?client_reference_id=${activeTeam[0]?.uniq_team_id}&prefilled_email=${user[0]?.email}`}
											/>
										</div>
								}
								<span className="py-1 mt-2 inline-flex mx-auto items-center gap-x-2 text-md font-medium  text-green-400 ">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
										<path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z" />
									</svg>

									20€ off<span className="text-gray-900">for the first 1000 customers with:</span>

								</span>
								<p className="text-gray-900">FRIENDS20</p>

								<ul role="list" className="mb-8 items-center  mx-auto space-y-4  ">
									{
										item.pricePerks.length > 0 ? item.pricePerks.map((item, i) => (
											<li key={i} className="flex items-center justify-center text-center mt-4 space-x-3 ">
												<p className="text-green-400">
													<svg className="flex-shrink-0 w-5 h-5 text-green fillCurrent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>

												</p>
												<span className="text-gray-900">{item.title}</span>
											</li>
										))
											:
											null
									}
								</ul>

							</div>
						))
					}
				</div>
			</div>
		</section >

	)
}

export default PricingTable;
