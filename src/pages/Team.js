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
	const { user, setNotifyMessage, teamUsers, setTeamUsers, setLoadingTeamUsers, loadingTeamUsers, setPath, Get, Post, setTeam, setLoadingTeams, team, setLoadingTeam, loadingTeam } = useContext(AppContext);
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
		setPath('/team');
		window.scroll(0, 0);
		Get({ params: { id: id, user_id: user[0].id }, path: 'team', dataSetter: setTeam, loader: setLoadingTeam })
		Get({ params: { id: id, }, path: 'team/team_users', dataSetter: setTeamUsers, loader: setLoadingTeamUsers })

	}, []);
	useEffect(() => {
		TeamContent()
	}, [data])
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
					ghost
					layoutType='back'
					title='Go back'
				/>
				{
					loadingTeam ? <SpinnerSmall /> :
						<div>
							<HeaderText
								locationText="Team"
								title={data.title || '-'}
								description={data.description || ''}
							/>
							{
								loadingTeamUsers
									?
									<SpinnerSmall />
									:
									teamUsers?.map((item, i) => {
										return (
											<Card small key={i}>
												<p>{item.first_name} {item.last_name}</p>
												<h6>{item.email}</h6>

											</Card>
										)

									})
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
