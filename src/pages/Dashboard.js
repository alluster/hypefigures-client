import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../context/Context';
import HeaderText from '../components/Text/HeaderText';
import Container from '../components/Container/Container';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import CardDataPoint from '../components/Card/CardDataPoint';
import Modal from '../components/Modal/Modal';
import FormCompiler from '../supportFunctions/FormComplier';
import Accordion from '../components/Accordion/Accordion';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DividerLine from '../components/Container/DividerLine';
import Card from '../components/Card/Card';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import SideBar from '../components/Navigation/SideBar';
import Button from '../components/Button/Button';
import SpinnerSmall from '../components/Spinner/SpinnerSmall';
import FormGoogleSpreadsheetDataPoint from '../components/Forms/DataPoints/FormGoogleSpreadsheetDataPoint';
import FormGoogleAnalytics from '../components/Forms/DataPoints/FormGoogleAnalytics';
import { useHistory } from "react-router-dom";


const Logo = styled.div`
   	max-width: 40px;
	align-self: center;
	margin-right: ${(props) => props.theme.grid.divider_4};

}
`;

const Content = styled.div`
    height: 100%;
`;

const GoBackContainer = styled.div`
    display: flex;
    flex-direction: row;
`;
const Icon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.colors.fontDark};
    font-size: 20px;
    margin-right: ${(props) => props.theme.grid.divider_1};
    align-self: center;
    margin-bottom: ${(props) => props.theme.grid.divider_2};

    &:hover {
        cursor: pointer;
    }
`;
const Text = styled.h5`
    color: ${(props) => props.theme.colors.fontDark};
    white-space: nowrap;
    align-self: center;
    margin-bottom: ${(props) => props.theme.grid.divider_2};

    &:hover {
        cursor: pointer;
    }
`;

const StyledLink = styled(Link)``;

const LinkText = styled.p`
    font-size: 12px;
    color: ${(props) => props.theme.colors.brand_100};
`;
const ActionText = styled.p`
    font-size: 16px;
    color: ${(props) => props.theme.colors.brand_100};
    line-height: 36px;
	&:hover {
        cursor: pointer;
    }

`;

const LinksContainer = styled.div`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
`;

const Dashboard = () => {
	const [openDataPointModal, setOpenDataPointModal] = useState(false);
	const [openActionsModal, setOpenActionsModal] = useState(false);
	const [dataPointSelector, setDataPointSelector] = useState('');
	const [googleSheets, setGoogleSheets] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [openNewDashboardModal, setOpenNewDashboardModal] = useState(false);
	let { id } = useParams();
	const history = useHistory();
	const {
		Get,
		Post,
		setDataPoints,
		setPath,
		dataPoints,
		loadingDataPoints,
		dashboards,
		setLoadingDashboard,
		setDashboard,
		dashboard,
		loadingAnalyticsData,
		analyticsData,
		loadingDashboards,
		setLoadingDataPoints,
		setNotifyMessage
	} = useContext(AppContext);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const DataPointSelectorHandler = () => {
		switch (dataPointSelector) {
			case 'Google Sheets':
				return (
					<FormGoogleSpreadsheetDataPoint
						setOpenDataPointModal={setOpenDataPointModal}
						googleSheetsList={(googleSheets && googleSheets) || []}
						dashboardsList={(dashboards && dashboards) || []}
					/>
				);

			case 'Google Analytics':
				return (
					<FormGoogleAnalytics
						setOpenDataPointModal={setOpenDataPointModal}
						dashboardsList={(dashboards && dashboards) || []}
					/>
				);
			default:
				return;
		}
	};
	const DataPoints = () => {
		if (loadingDataPoints) {
			return <SpinnerSmall />;
		}
		return (
			dataPoints.length > 0 ? dataPoints.map((item, i) => {
				return (
					<CardDataPoint
						// loading={item.value.loaderFunction}
						type={item.type}
						key={i}
						to={`/datapoints/${item.id}`}
						cell={item.cell || ''}
						spreadsheetId={item.spreadsheet_id || ''}
						sheetId={item.sheet_id || ''}
						title={item.title}
						description={item.description}
						value={item.value}
					/>
				);
			}) :
				<p>This dashboard does not contain any data yet.</p>
		);

	};

	const DashboardContent = () => {

		return (
			<div>
				<HeaderText
					buttonTitle="Add new datapoint"
					onClickFunction={() => setOpenDataPointModal(!openDataPointModal)}
					locationText=""
					title="Datapoints"
					description="Your dahboard datapoints"
				/>
				{DataPoints()}


				<HeaderText
					buttonTitle="Add new Action"
					onClickFunction={() => setOpenActionsModal(!openActionsModal)}
					locationText=""
					title="Actions"
					description="Create New Action"
				/>
				{
					loadingDataPoints ? <SpinnerSmall /> :
						<CardDataPoint
							type='hyperfigures'
							to={`/datapoints`}
							title='User Cost 2024'
							description='Website user cost 2024'
							value='1.8€'
						/>
				}

			</div >
		)


	}
	const DeleteDashboard = async () => {
		try {
			const response = await Post({
				params: {
					id: id,
					deleted_at: true
				}, path: 'dashboard', dataSetter: setDashboard, loader: setLoadingDashboard
			})
			if (response.status === 200) {
				history.push("/dashboards");
				setNotifyMessage('Dashboard deleted')
			} else {
				setNotifyMessage('Dashboard removal failed')

			}
		}
		catch (err) {
			console.log(err), setNotifyMessage('Dashboard removal failed')
		}
	}
	const submitNewDashboard = async (data) => {
		try {
			setNotifyMessage(`New dashboard ${data.dashboardName} added`);
		} catch (error) {
			console.log(error);
			setNotifyMessage('Something went wrong');
		} finally {
			setOpenNewDashboardModal(false);
			reset();
		}
	};
	const SideBarContainer = () => {
		return (
			<SideBar>
				<Button
					ghost
					layoutType='back'
					title='Go Back'
				/>
				<HeaderText
					locationText="Dashboard"
					title={dashboard.length > 0 ? dashboard[0].title : '-'}
					description={
						dashboard.length > 0 ? dashboard[0].description :
							'-'
					}
				/>
				<Button layoutType='dropdown' title="Dashboard Options" primary>
					<ActionText
						onClick={() => {
							setOpenModal(!openModal);
						}}
					>
						Create New Public Dashboard
					</ActionText>

					<ActionText
						onClick={() => {
							setOpenModal(!openModal);
						}}
					>
						Create New Public Dashboard
					</ActionText>
					<ActionText
						style={{ color: 'red' }}

						onClick={() =>
							DeleteDashboard()

						}
					>
						Delete Dashboard
					</ActionText>
				</Button>

				<Accordion title="Dashboards">
					<LinksContainer>
						{loadingDashboards ? (
							<p>Loading dashboard data....</p>
						) : (
							dashboards.length > 0 &&
							dashboards.map((item, i) => {
								return (
									<StyledLink
										to={`/dashboards/${item.id}`}
										key={i}
									>
										<LinkText>{item.title}</LinkText>
									</StyledLink>
								);
							})
						)}
					</LinksContainer>
					<Button
						type="button"
						onClick={() =>
							setOpenNewDashboardModal(!openNewDashboardModal)
						}
					>
						Create New
					</Button>
				</Accordion>
			</SideBar>
		);
	};
	const AnalyticsDataContainer = () => {
		if (loadingAnalyticsData) {
			return <SpinnerSmall />
		} else {
			if (analyticsData.length > 0) {
				console.log(analyticsData)
				return (
					<div>
						<h2>Report Data</h2>
						<table>
							<thead>
								<tr>
									{Object.keys(analyticsData[0]).map((key, index) => (
										<th key={index}>{key}</th>
									))}
								</tr>
							</thead>
							<tbody>
								{analyticsData.map((item, index) => (
									<tr key={index}>
										{Object.values(item).map((value, index) => (
											<td key={index}>{value.value}</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				);
			}
			return null

		};
	}

	useEffect(() => {
		setDataPoints([])
		Get({ params: { id: id }, path: 'dashboard', dataSetter: setDashboard, loader: setLoadingDashboard })
		Get({ params: { dashboard_id: id }, path: 'data_point', dataSetter: setDataPoints, loader: setLoadingDataPoints })
	}, [])

	useEffect(() => {
		SideBarContainer()
	}, [dashboard])

	useEffect(() => {
		setPath('/dashboard');

	}, []);
	useEffect(() => {
		DataPoints()
	}, [dataPoints])

	return (
		<Content>
			{SideBarContainer()}
			<Container>

				{DashboardContent()}
				<AnalyticsDataContainer />
			</Container>
			<Modal
				open={openModal}
				openModal={() => setOpenModal()}
				modalTitle="Create New Public Dashboard"
			>
				<FormCompiler
					reset={reset}
					openModal={() => setOpenModal()}
					errors={errors}
					onSubmit={() => handleSubmit()}
					register={register}
					fields={[
						{
							type: 'input',
							name: 'publicDashboardName',
							label: 'Name',
							options: '',
							required: true,
							errorMessage: 'Dashboard name is required',
							placeholder: 'Marketing, Budget, Finance... etc.',
						},
						{
							type: 'textarea',
							name: 'publicDashboardDescription',
							label: 'Description',
							options: '',
							required: false,
							errorMessage: '',
							placeholder: '',
						},
					]}
				></FormCompiler>
			</Modal>
			<Modal
				open={openDataPointModal}
				openModal={() => setOpenDataPointModal()}
				modalTitle="New Data Point"
			>
				{dataPointSelector === '' ? (
					<div>
						<GoBackContainer>
							<h5>Select Data Source</h5>
						</GoBackContainer>
						<DividerLine />

						<Card
							onClick={() =>
								setDataPointSelector('Google Sheets')
							}
							row
						>
							<Logo>
								<img
									src="/integration-logos/google-sheets.png"
									alt="Google Sheets"
								/>
							</Logo>
							<div>
								<p>Integration method</p>
								<h5>Google Sheets with selected Cell</h5>
							</div>
						</Card>
						<Card
							onClick={() =>
								setDataPointSelector('Google Analytics')
							}
							row
						>
							<Logo>
								<img
									src="/integration-logos/google-analytics.png"
									alt="Google Analytics"
								/>
							</Logo>
							<div>
								<p>Integration method</p>
								<h5>Google Analytics</h5>
							</div>
						</Card>
					</div>
				) : (
					<div>
						<GoBackContainer
							onClick={() => setDataPointSelector('')}
						>
							<Icon icon={faArrowLeft} />
							<Text>Go Back</Text>
						</GoBackContainer>
						<DividerLine />
					</div>
				)}

				{DataPointSelectorHandler()}
			</Modal>
			<Modal
				open={openNewDashboardModal}
				openModal={() => setOpenNewDashboardModal()}
				modalTitle="Create a new Dashboard"
			>
				<FormCompiler
					reset={reset}
					openModal={() => setOpenNewDashboardModal()}
					errors={errors}
					onSubmit={() => handleSubmit(submitNewDashboard)}
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
			</Modal>
		</Content>
	);
};

export default Dashboard;
