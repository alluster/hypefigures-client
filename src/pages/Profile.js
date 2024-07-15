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
import SubscriptionWarning from '../components/Patterns/SubscriptionWarning/SubscriptionWarning';

const Wrapper = styled.div`
    @media ${device.laptop} {
    }
`;

const Profile = () => {

	const { setPath, activeTeam, loadingUser, user, setNotifyMessage, Get, Post, setTeams, setLoadingTeams, loadingTeams, teams } = useContext(AppContext);
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
			const response = await Post({ params: { title: data.teamName, description: data.teamDescription, uniq_user_id: user[0].uniq_user_id }, path: 'team', dataSetter: setTeams, loader: setLoadingTeams })
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
			Get({ params: { user_id: user.length > 0 ? user[0].id : null }, path: 'team', dataSetter: setTeams, loader: setLoadingTeams });
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

				<ul role="list" className="divide-y divide-gray-100 mb-10 border-b">
					{teams?.map((team) => (
						<li key={team.title} className="border-gray-300">
							{team.id === activeTeam[0]?.id ? (
								<a href={`/teams/${team.id}`} className="flex justify-between gap-x-6 py-5 block">
									<div className="flex min-w-0 gap-x-4">
										<div className="min-w-0 flex-auto">
											<p className="text-sm font-semibold leading-6 text-gray-900">{team.title}</p>
											<p className="mt-1 truncate text-xs leading-5 text-gray-500">{team.description}</p>
											<p className="mt-1 truncate text-xs leading-5 text-gray-500">Active team</p>

										</div>
										<div className="min-w-0 flex-auto">
											{team?.stripe_subscription === true ? <span className="inline-flex ml-4 items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-600/20">
												Active subscription
											</span> : (
												<span className="inline-flex ml-4 items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
													No subscription
												</span>
											)}

										</div>
									</div>
									<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
										<p className="text-sm leading-6 text-gray-900">{team.creator === team.uniq_user_id ? 'Team Owner' : 'Team Member'}</p>
									</div>
								</a>
							) : (
								<div className="flex justify-between gap-x-6 py-5 block">
									<div className="flex min-w-0 gap-x-4">
										<div className="min-w-0 flex-auto">
											<p className="text-sm font-medium leading-6 text-gray-400">{team.title}</p>
											<p className="mt-1 truncate text-xs leading-5 text-gray-200">{team.description}</p>
										</div>
										<div className="min-w-0 flex-auto">
											{team?.stripe_subscription === true ? <span className="inline-flex ml-4 items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-600/20">
												Active subscription
											</span> : (
												<span className="inline-flex ml-4 items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
													No subscription
												</span>
											)}

										</div>
									</div>
									<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
										<p className="text-sm leading-6 text-gray-900">{team.creator === user[0]?.uniq_user_id ? 'Team Owner' : 'Team Member'}</p>
									</div>
								</div>
							)}
						</li>
					))}
				</ul>

			)

		}
	}
	const Account = () => {
		if (loadingUser) {
			return <p>Loading data...</p>;
		}
		else {
			return (

				<div className="divide-y divide-gray-100 mb-10 border-b">

					<div className="flex justify-between gap-x-6 py-5 block">

						<div className="min-w-0 flex-auto">
							<p className="text-sm font-semibold leading-6 text-gray-900">{user[0]?.first_name} {user[0]?.last_name}</p>
							<p className="mt-1 truncate text-xs leading-5 text-gray-500">{user[0]?.email}</p>
						</div>
						<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
							<a href="https://billing.stripe.com/p/login/28o7u21bRcMmaAg288" target="_blank" rel="noreferrer">
								<p className="text-sm font-semibold leading-6 text-blue-600">Edit subscription details</p>
							</a>
							<p className="mt-1 truncate text-xs leading-5 text-gray-500">Link will open Stripe dashboard where you can edit your subscriptions</p>
						</div>
					</div>

				</div>

			)

		}
	}
	useEffect(() => {
		setPath('/profile');
		window.scroll(0, 0);
		Get({ params: { user_id: user.length > 0 ? user[0].id : null }, path: 'team', dataSetter: setTeams, loader: setLoadingTeams })

	}, []);
	useEffect(() => {
		TeamsList()
	}, [activeTeam])

	const Logout = () => {
		localStorage.removeItem('token');
		location.reload();
	}
	return (
		<Container>
			<Button
				back
				layoutType='back'
				title='Back'
			/>
			<HeaderText
				buttonTitle="Create a new Team"
				onClickFunction={() => setOpenModal(!openModal)}
				locationText=""
				title="Teams"
				description="Your teams"
			/>

			{TeamsList()}

			<HeaderText
				buttonTitle="Logout"
				onClickFunction={() => Logout()}
				locationText=""
				title="Account"
				description="Your Account information"
			/>
			{Account()}
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
				/>

			</Modal>
		</Container>
	);
};

export default Profile;
