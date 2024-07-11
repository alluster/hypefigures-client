import React, { useEffect, useContext, useState } from 'react';
import Card from '../components/Card/Card';
import CardGrid from '../components/Card/CardGrid';
import HeaderText from '../components/Text/HeaderText';
import Container from '../components/Container/Container';
import { useForm } from 'react-hook-form';
import Modal from '../components/Modal/Modal';
import FormCompiler from '../supportFunctions/FormComplier';
import { AppContext } from '../context/Context';
import Button from '../components/Button/Button';
import styled from 'styled-components';
import SubscriptionWarning from '../components/Patterns/SubscriptionWarning/SubscriptionWarning';

const Label = styled.p`
	font-size: 16px;
	color: ${props => props.theme.colors.gray_80};
	margin-bottom: 8px;
`;
const LinkText = styled.p`
    
    color: ${(props) => props.theme.colors.brand_100};
	margin-left: 10px;
	&:hover {
        cursor: pointer;
    }
`;

const TextRow = styled.div`
	display: flex;
	flex-direction: row;
`;

const Dashboards = () => {
	const {
		dashboards,
		activeTeam,
		Get,
		Post,
		loadingDashboards,
		setDashboards,
		setLoadingDashboards,
	} = useContext(AppContext)
	const { setNotifyMessage, setPath } = useContext(AppContext);
	const [openModal, setOpenModal] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const DashboardsList = () => {
		if (loadingDashboards) {
			return <p>Loading data...</p>;
		}
		else {
			return (
				<CardGrid>
					{dashboards != [] && dashboards ? (
						dashboards
							.slice()
							.sort(
								(a, b) =>
									new Date(b.created_at) -
									new Date(a.created_at),
							)
							.map((item, i) => {
								return (
									<Card key={i} to={`/dashboards/${item.id}`}>
										<Label>Dashboard</Label>
										<h4>{item?.title}</h4>
										{
											item.description ?
												<p>{item.description} </p>
												:
												<TextRow>
													<p>A company dashboard -</p>
													<LinkText>Add description</LinkText>
												</TextRow>

										}
									</Card>
								);
							})
					) : (
						<p>No dashboards</p>
					)}
				</CardGrid>
			);
		}
	};

	const onSubmit = async (data) => {
		try {
			const response = await Post({ params: { title: data.dashboardName, description: data.dashboardDescription }, path: 'dashboard', dataSetter: setDashboards, loader: setLoadingDashboards })
			console.log(response)
			if (response?.status === 200) {
				setNotifyMessage(`New dashboard ${data.dashboardName} added`);
			}
			else {
				setNotifyMessage(`New dashboard ${data.dashboardName} could not be added, ${response?.message}`);
			}
		} catch (error) {
			console.log(error);
			setNotifyMessage('Something went wrong');
		} finally {
			setOpenModal(false);
			Get({ params: {}, path: 'dashboard', dataSetter: setDashboards, loader: setLoadingDashboards })
			reset();
		}
	};

	useEffect(() => {
		setPath('/dashboards');
		Get({ params: {}, path: 'dashboard', dataSetter: setDashboards, loader: setLoadingDashboards });
	}, []);
	useEffect(() => {
		DashboardsList()
	}, [dashboards, activeTeam])
	useEffect(() => {
		Get({ params: {}, path: 'dashboard', dataSetter: setDashboards, loader: setLoadingDashboards });
	}, [activeTeam])

	return (
		<div>
			<Container>
				<Button
					back
					layoutType='back'
					title='Back'
				/>
				<HeaderText
					buttonTitle="Create a new Dashboard"
					onClickFunction={() => setOpenModal(!openModal)}
					locationText=""
					title="Dashboards"
					description={`${activeTeam[0]?.title}'s Dashboards`}
				/>
				{DashboardsList()}

			</Container>
			<Modal
				open={openModal}
				openModal={() => setOpenModal()}
				modalTitle="Create a new Dashboard"
			>
				<SubscriptionWarning>
					<FormCompiler
						reset={reset}
						openModal={() => setOpenModal()}
						errors={errors}
						onSubmit={() => handleSubmit(onSubmit)}
						register={register}
						fields={[
							{
								type: 'input',
								name: 'dashboardName',
								label: 'Dashboard name',
								options: '',
								required: true,
								errorMessage: 'Dashboard name is required',
								placeholder: 'Give your dashboard a name',
							},
							{
								type: 'textarea',
								name: 'dashboardDescription',
								label: 'Dashboard Description',
								options: '',
								required: false,
								errorMessage: '',
								placeholder: 'Describe your dashboard',
							},
						]}
					></FormCompiler>

				</SubscriptionWarning>

			</Modal>
		</div>
	);
};

export default Dashboards;
