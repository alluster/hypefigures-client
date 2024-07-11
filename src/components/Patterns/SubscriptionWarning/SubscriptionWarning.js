import React, { useContext } from 'react';

import { AppContext } from '../../../context/Context';
import Button from '../../Button/Button';

const SubscriptionWarning = ({ children }
) => {
	const {
		isAuthenticated,
		activeTeam
	} = useContext(AppContext);
	return (
		<div>
			{
				isAuthenticated && activeTeam[0]?.stripe_subscription != true
					?
					<div className="bg-white mt-10 relative isolate overflow-hidden px-4 pt-10 pb-10 shadow-2xl sm:rounded-3xl sm:px-6 ">
						{/* <svg
									viewBox="0 0 1024 1024"
									aria-hidden="true"
									className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
								>
									<circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
									<defs>
										<radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
											<stop stopColor="#7775D6" />
											<stop offset={1} stopColor="#E935C1" />
										</radialGradient>
									</defs>
								</svg> */}
						<div className="max-w-md text-center lg:flex-auto lg:text-left">
							<h3 className="text-xl font-bold tracking-tight sm:text-3xl">
								Your team does not have a valid subscription.
								<br />
								Please purchase a plan to continue.
							</h3>
							<p className="mt-4 text-base leading-7 text-gray-500">
								Access to this feature requires a valid subscription. Please choose a plan to proceed.
							</p>
							<br />

							<Button
								title='View plans'
								small
								type='button'
								layoutType='link'
								primary
								to={`/teams/${activeTeam[0]?.id}`}
							/>
						</div>
					</div>

					:
					children
			}

		</div>

	);
};

export default SubscriptionWarning;
