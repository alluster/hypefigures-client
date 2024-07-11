import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../context/Context';
import HeaderText from '../components/Text/HeaderText';
import Container from '../components/Container/Container';
import { useParams, useHistory } from 'react-router-dom';
import Button from '../components/Button/Button';
import SpinnerSmall from '../components/Spinner/SpinnerSmall';
import PricingTable from '../components/Patterns/PrisingTable/PricingTable';
import Card from '../components/Card/Card';

const Team = () => {
	let { id } = useParams();
	const history = useHistory();
	const { user, activeTeam, setNotifyMessage, teamUsers, setTeamUsers, setLoadingTeamUsers, loadingTeamUsers, setPath, Get, Post, setTeam, setLoadingTeams, team, setLoadingTeam, loadingTeam } = useContext(AppContext);
	const DeleteTeam = async () => {
		try {
			const response = await Post({
				params: {
					id: id,
					deleted_at: true,
					uniq_user_id: user[0].uniq_user_id
				}, path: 'team', dataSetter: setTeam, loader: setLoadingTeams
			})
			if (response.status === 200) {
				history.push('/user');
				setNotifyMessage('Team Deleted')
			} else {
				setNotifyMessage('Team removal failed')

			}
		}
		catch (err) { console.log(err), setNotifyMessage('Team removal failed') }
	}

	const [data, setData] = useState({
		created_at: 'Loading data...',
		title: 'Loading data...',
		description: 'Loading data...',
		updated_at: 'Loading data...',
		deleted_at: 'Loading data...',
	});

	useEffect(() => {
		setPath('/teams');
		window.scroll(0, 0);
		Get({ params: { id: id, user_id: user[0].id }, path: 'team', dataSetter: setTeam, loader: setLoadingTeam })
		Get({ params: { id: id, }, path: 'team/team_users', dataSetter: setTeamUsers, loader: setLoadingTeamUsers })

	}, [id]);
	useEffect(() => {
		TeamContent()
	}, [data, activeTeam])
	useEffect(() => {
		if (team.length > 0) {
			setData({
				created_at: team[0].created_at || 'No data',
				title: team[0].title || 'No data',
				description: team[0].description || '',
				updated_at: team[0].updated_at || 'No data',
				deleted_at: team[0].deleted_at || 'No data',
				current_plan: team[0].stripe_price_id || 'No data',
				active_subscription: team[0].stripe_subscription || false,
				creator: team[0].creator || null

			})
		}
	}, [team])

	const TeamContent = () => {
		return (
			<div>
				<Button
					back
					layoutType='back'
					title='Back'
				/>
				{
					loadingTeam ? <SpinnerSmall /> :
						<div>
							<HeaderText
								locationText="Team"
								title={data.title || '-'}
								description={data.description || ''}
								feature='team'
								id={id}
							/>
							{
								loadingTeamUsers
									?
									<SpinnerSmall />
									:
									<ul role="list" className="divide-y divide-gray-100">
										{teamUsers?.map((person) => (
											<li key={person.email} className="flex justify-between gap-x-6 py-5 border-b border-gray-300">
												<div className="flex min-w-0 gap-x-4">
													{/* <img alt="" src={person.imageUrl} className="h-12 w-12 flex-none rounded-full bg-gray-50" /> */}
													<div className="min-w-0 flex-auto">
														<p className="text-sm font-semibold leading-6 text-gray-900">{person.first_name} {person.last_name}</p>
														<p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
													</div>
												</div>
												<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
													<p className="text-sm leading-6 text-gray-900">{activeTeam[0]?.creator === person.uniq_user_id ? 'Team Owner' : 'Team Member'}</p>

												</div>
											</li>
										))}
									</ul>

							}
							<PricingTable currentPlan={data.current_plan} activeSubscription={data.active_subscription} />
							{
								user[0]?.uniq_user_id === data.creator
									?
									<Button
										onClick={DeleteTeam}
										title='			Delete Team'
									/>
									:
									null
							}

						</div>
				}

			</div>
		);

	};

	return <Container>{TeamContent()}</Container>;
};

export default Team;
