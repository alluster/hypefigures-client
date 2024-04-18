import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/Context';
import { device } from '../styles/device-braking-points';
import Button from '../components/Button/Button';
import Container from '../components/Container/Container';
import Modal from '../components/Modal/Modal';
import FormCompiler from '../supportFunctions/FormComplier';
import { useForm } from 'react-hook-form';
import HeaderText from '../components/Text/HeaderText';
import Card from '../components/Card/Card';
import CardGrid from '../components/Card/CardGrid';

const Wrapper = styled.div`
    @media ${device.laptop} {
    }
`;

const Profile = () => {


	const { setPath, isAuthenticated, setNotifyMessage, Get, Post, setTeams, setLoadingTeams, loadingTeams, teams } = useContext(AppContext);
	const [openModal, setOpenModal] = useState(false);
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			const response = await Post({ params: { title: data.teamName, description: data.teamDescription }, path: 'team', dataSetter: setTeams, loader: setLoadingTeams })
			console.log('response from response', response.status)
			if (response.status === 200) {
				setNotifyMessage(`New team ${data.teamName} added`);
			}
			else {
				setNotifyMessage(`New team ${data.teamName} could not be added`);
			}
		} catch (error) {
			console.log(error);
			setNotifyMessage('Something went wrong');
		} finally {
			setOpenModal(false);
			reset();
		}
	};
	const TeamsList = () => {
		if (loadingTeams) {
			return <p>Loading data...</p>;
		}
		else {
			return (
				<CardGrid>
					{teams != [] && teams ? (
						teams
							.slice()
							.sort(
								(a, b) =>
									new Date(b.created_at) -
									new Date(a.created_at),
							)
							.map((item, i) => {
								return (
									<Card key={i} to={`/teams/${item.id}`}>
										<h4>{item.title}</h4>
										<p>{item.description}</p>
									</Card>
								);
							})
					) : (
						<p>No teams</p>
					)}
				</CardGrid>
			);
		}
	};
	useEffect(() => {
		setPath('/profile');
		window.scroll(0, 0);
		Get({ params: {}, path: 'team', dataSetter: setTeams, loader: setLoadingTeams })

	}, []);
	const Logout = () => {
		localStorage.removeItem('token');
		location.reload();
	}
	return (
		<Container>
			<HeaderText
				buttonTitle="Create a new Team"
				onClickFunction={() => setOpenModal(!openModal)}
				locationText=""
				title="Teams"
				description="Your teams"
			/>
			{TeamsList()}


			<Button
				onClick={Logout}
				type='button'
				title='Logout'
			/>

			<Modal
				open={openModal}
				openModal={() => setOpenModal()}
				modalTitle="Create a new Team"
			>
				<FormCompiler
					reset={reset}
					openModal={() => setOpenModal()}
					errors={errors}
					onSubmit={() => handleSubmit(onSubmit)}
					register={register}
					fields={[
						{
							type: 'input',
							name: 'teamName',
							label: 'Team name',
							options: '',
							required: true,
							errorMessage: 'Team name is required',
							placeholder: 'Give your team a name',
						},
						{
							type: 'textarea',
							name: 'teamDescription',
							label: 'Team Description',
							options: '',
							required: false,
							errorMessage: '',
							placeholder: 'Describe your team',
						},
					]}
				></FormCompiler>
			</Modal>
		</Container>
	);
};

export default Profile;
