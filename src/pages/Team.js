import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../context/Context';
import HeaderText from '../components/Text/HeaderText';
import Container from '../components/Container/Container';
import { useParams, useHistory } from 'react-router-dom';
import Button from '../components/Button/Button';
import SpinnerSmall from '../components/Spinner/SpinnerSmall';

const Team = () => {
	let { id } = useParams();
	const history = useHistory();
	const { setNotifyMessage, setPath, Get, Post, setTeam, setLoadingTeams, team, setLoadingTeam, loadingTeam } = useContext(AppContext);
	const DeleteTeam = async () => {
		try {
			const response = await Post({
				params: {
					id: id,
					deleted_at: true
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
		Get({ params: { id: id }, path: 'team', dataSetter: setTeam, loader: setLoadingTeam })
	}, []);
	useEffect(() => {
		TeamContent()
	}, [data])
	useEffect(() => {
		if (team.length > 0) {
			setData({
				created_at: team[0].created_at || 'No data',
				title: team[0].title || 'No data',
				description: team[0].description || 'No data',
				updated_at: team[0].updated_at || 'No data',
				deleted_at: team[0].deleted_at || 'No data',
			})
		}
	}, [team])

	const TeamContent = () => {
		return (
			<div>
				<Button
					ghost
					layoutType='back'
				/>				{
					loadingTeam ? <SpinnerSmall /> :
						<div>
							<HeaderText
								locationText="Team"
								title={data.title || '-'}
								description={data.description || '-'}
							/>

							<Button
								onClick={DeleteTeam}
							>
								Delete Team
							</Button>
						</div>
				}

			</div>
		);

	};

	return <Container>{TeamContent()}</Container>;
};

export default Team;
