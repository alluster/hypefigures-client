import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../context/Context';
import CardGrid from '../components/CardGrid';
import HeaderText from '../components/HeaderText';
import Container from '../components/Container';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import CardDataPoint from '../components/CardDataPoint';
import Modal from '../components/Modal';
import FormCompiler from '../supportFunctions/FormComplier';
import Accordion from '../components/Accordion';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styled from 'styled-components';
import ButtonMulti from '../components/ButtonMulti';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DividerLine from '../components/DividerLine';
import Card from '../components/Card';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import SideBar from '../components/SideBar';
import Button from '../components/Button';
import ButtonGoBack from '../components/ButtonGoBack';
import SpreadsheetGoogle from '../components/Forms/DataPoints/SpreadsheetGoogle';
import SpinnerSmall from '../components/SpinnerSmall';

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
`;
const SideBarSubTitle = styled.p`
    font-size: 12px;
    font-weight: 700;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray_60};
    color: ${(props) => props.theme.colors.fontDark};
    line-height: 36px;
    margin-bottom: 32px;
    margin-top: 32px;
    margin-left: 16px;
`;
const LinksContainer = styled.div`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
`;

const Dashboard = () => {
	const [publicDashboards, setPublicDashboards] = useState([]);
	const [openDataPointModal, setOpenDataPointModal] = useState(false);
	const [dataPointSelector, setDataPointSelector] = useState('');
	const [googleSheets, setGoogleSheets] = useState([]);
	// const [dashboards, setDashboards] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [openNewDashboardModal, setOpenNewDashboardModal] = useState(false);

	let { id } = useParams();

	const {
		Get,
		Post,
		setDataPoints,
		setPath,
		dataPoints,
		loadingDataPoints,
		dashboards,
		loadingDashboard,
		setLoadingDashboard,
		setDashboard,
		dashboard,
		setAnalyticsData,
		setLoadingAnalyticsData,
		loadingAnalyticsData,
		analyticsData
	} = useContext(AppContext);
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const DataPointSelectorHandler = () => {
		switch (dataPointSelector) {
			// case 'Google Sheets':
			// 	return (
			// 		<FormGoogleSpreadsheetDataPoint
			// 			setOpenDataPointModal={setOpenDataPointModal}
			// 			googleSheetsList={(googleSheets && googleSheets) || []}
			// 			dashboardsList={(dashboards && dashboards) || []}
			// 		/>
			// 	);
			case 'Google Sheets with Spreadsheet':
				return (
					<SpreadsheetGoogle
						setOpenDataPointModal={setOpenDataPointModal}
						googleSheetsList={(googleSheets && googleSheets) || []}
						dashboardsList={(dashboards && dashboards) || []}
					/>
				);

			default:
				return;
		}
	};
	const DataPoints = () => {

		return (
			<div>
				<CardGrid>
					{dataPoints && dataPoints.map((item, i) => {
						return (
							<CardDataPoint
								// loading={item.value.loaderFunction}
								key={i}
								to={`/datapoints/${item.id}`}
								cell={item.cell || ''}
								spreadsheetId={item.spreadsheet_id || ''}
								sheetId={item.sheet_id || ''}
								title={item.title}
								description={item.sheet_title}
							// value={item.value}
							></CardDataPoint>
						);
					})}
				</CardGrid>
			</div>
		);

	};

	const DashboardContent = () => {
		if (loadingDataPoints) {
			return <p>Loading data...</p>;
		}

		<div>
			<p>This dashboard does not contain any data yet.</p>
			<Button
				type="button"
				primary
				onClick={() =>
					setOpenDataPointModal(!openDataPointModal)
				}
			>
				Add new Data point
			</Button>
		</div>

	}

	const onSubmitNewDashboard = async (data) => {
		// try {
		// 	setNotifyMessage(`New dashboard ${data.dashboardName} added`);
		// } catch (error) {
		// 	console.log(error);
		// 	setNotifyMessage('Something went wrong');
		// } finally {
		// 	setOpenNewDashboardModal(false);
		// 	reset();
		// }
	};

	const SideBarContainer = () => {
		return (
			<SideBar>
				{/* <SideBarSubTitle>Dashboard Details</SideBarSubTitle> */}
				<ButtonGoBack text="Go Back" />

				<HeaderText
					locationText="Dashboard"
					title={dashboard.length > 0 ? dashboard[0].title : '-'}
					description={
						dashboard.length > 0 ? dashboard[0].description :
							'-'
					}
				/>
				<ButtonMulti title="Dashboard Options">
					<ActionText
						onClick={() => {
							setOpenModal(!openModal);
						}}
					>
						Create New Public Dashboard
					</ActionText>
					<ActionText
						onClick={() =>
							setOpenDataPointModal(!openDataPointModal)
						}
					>
						Add new Data point
					</ActionText>
				</ButtonMulti>
				{/* <Accordion title="Published Dashboards">
					<LinksContainer>
						{loadingPublicDashboards ? (
							<p>Loading public dashboard data....</p>
						) : (
							publicDashboards.length > 0 &&
							publicDashboards.map((item, i) => {
								return (
									<StyledLink
										to={`/publicDashboard/${item.id}`}
										key={i}
									>
										<LinkText>{item.title}</LinkText>
									</StyledLink>
								);
							})
						)}
						<Button
							type="button"
							onClick={() => setOpenModal(!openModal)}
							small={true}
							primary={true}
						>
							Create New
						</Button>
					</LinksContainer>
				</Accordion> */}
				{/* <SideBarSubTitle>All Dashboards</SideBarSubTitle> */}
				{/* <Accordion title="Dashboards">
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
						small={true}
						primary={true}
					>
						Create New
					</Button>
				</Accordion> */}
			</SideBar>
		);
	};
	const AnalyticsDataContainer = () => {
		if (loadingAnalyticsData) {
			return <SpinnerSmall />
		} else {
			if (analyticsData.length > 0) {
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
		Get({ params: { id: id }, path: 'dashboard', dataSetter: setDashboard, loader: setLoadingDashboard })
		Get({ path: 'google/auth_google', dataSetter: setAnalyticsData, loader: setLoadingAnalyticsData })
	}, [id])

	useEffect(() => {
		SideBarContainer()
		console.log(dashboard.length > 0 && dashboard[0].title)
	}, [dashboard])

	useEffect(() => {
		setPath('/dashboard');

	}, []);

	return (
		<Content>
			{SideBarContainer()}
			<Container>{DashboardContent()}
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
									src="/google_sheets.png"
									alt="Google Sheets"
								/>
							</Logo>
							<div>
								<p>integration</p>
								<h5>Google Sheets with selected Cell</h5>
							</div>
						</Card>
						<Card
							onClick={() =>
								setDataPointSelector(
									'Google Sheets with Spreadsheet',
								)
							}
							row
						>
							<Logo>
								<img
									src="/google_sheets.png"
									alt="Google Sheets"
								/>
							</Logo>
							<div>
								<p>integration</p>
								<h5>Google Sheets with Spreadsheet</h5>
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
					onSubmit={() => handleSubmit(onSubmitNewDashboard)}
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
