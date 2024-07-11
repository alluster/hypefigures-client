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
import { faArrowLeft, faCog, faCopy } from '@fortawesome/free-solid-svg-icons';
import SideBar from '../components/Navigation/SideBar';
import Button from '../components/Button/Button';
import SpinnerSmall from '../components/Spinner/SpinnerSmall';
import FormGoogleSpreadsheetDataPoint from '../components/Forms/DataPoints/FormGoogleSpreadsheetDataPoint';
import FormGoogleAnalytics from '../components/Forms/DataPoints/FormGoogleAnalytics';
import { useHistory } from "react-router-dom";
import FormGoogleTable from '../components/Forms/DataTable/FormGoogleTable';
import CardDataTable from '../components/Card/CardDataTable';
import Chat from '../components/Chat/Chat';
import Checkbox from '../components/Input/Checkbox';
import Conversation from '../components/Chat/Conversation';
import Settings from '../components/Forms/Settings/Settings';
// import { Cell, Jupyter } from "@datalayer/jupyter-react";

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
    font-size: 16px;
    color: ${(props) => props.theme.colors.brand_100};
	text-decoration: underline;
	margin-top: 20px;
	&:hover {
        cursor: pointer;
    }
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

const SidebarTitleContainer = styled.div`
	margin-bottom: 20px;

`

const SidebarTitle = styled.p`
	margin-top: 10px;
	margin-bottom: 10px;
`;
const SidebarDescription = styled.p`
	font-size: 12px;
`;
const SidebarLocation = styled.p`
	font-size: 12px;
`;

const EmptyState = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	align-items: center;
	min-height: 300px;
	height: 100%;
	text-align: center;
`; const EmptyStateTitle = styled.h4`

`;
const EmptyStateDescription = styled.h5`
	margin-top: 28px;
	margin-bottom: 28px;

`;
const Dashboard = () => {
	const [openDataPointModal, setOpenDataPointModal] = useState(false);
	const [openDataTableModal, setOpenDataTableModal] = useState(false);
	const [openSettingsModal, setOpenSettingsModal] = useState(false);

	// const [openActionsModal, setOpenActionsModal] = useState(false);
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
		selectedDataTables,
		setSelectedDataTables,
		dashboards,
		setLoadingDashboard,
		setDashboard,
		dashboard,
		setNotifyMessage,
		setDataTables,
		setLoadingDataTables,
		loadingDataTables,
		dataTables,
		chat,
		activeTeam,
		setChat,
		setLoadingChat,
		isAuthenticated
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
	const DataTables = () => {

		const toggleDataTableSelection = (dataTableId) => {
			if (selectedDataTables.includes(dataTableId)) {
				setSelectedDataTables(selectedDataTables.filter(id => id !== dataTableId));
			} else {
				setSelectedDataTables([...selectedDataTables, dataTableId]);
			}
		};

		if (loadingDataTables) {
			return <SpinnerSmall />;
		}

		return (
			dataTables.length > 0 ? (

				dataTables.map((item, i) => (
					<div key={i} style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
						<Checkbox
							key={i}
							label={null}
							id={`checkbox-${item.id}`}
							checked={selectedDataTables.includes(item.id)}
							onChange={() => toggleDataTableSelection(item.id)}
						/>
						<CardDataTable
							type={item.type}
							to={`/datatables/${item.id}`}
							cell={item.cell || ''}
							spreadsheetId={item.spreadsheet_id || ''}
							sheetId={item.sheet_id || ''}
							title={item.title}
							description={item.description}
							value={item.value}
						/>
					</div>
				))

			) :
				null
		);
	};
	const DashboardContent = () => {

		return (
			<div>

				<HeaderText
					buttonTitle="Integrate to a new Google Sheet"
					onClickFunction={() => setOpenDataTableModal(!openDataTableModal)}
					locationText=""
					title=""
					description=""
				/>
				{
					dataTables.length > 0
						?
						DataTables()
						:
						<EmptyState>
							<EmptyStateTitle>Your dashboard has no integrations yet!</EmptyStateTitle>
							<EmptyStateDescription>Crete an integration to fetch data for your data analyzis.</EmptyStateDescription>
							<Button
								primary
								title="Add New Integration"
								onClick={() => setOpenDataTableModal(!openDataTableModal)}
							/>
						</EmptyState>

				}

			</div >
		)

	}
	const DeleteDashboard = async () => {
		try {
			const userConfirmed = window.confirm('Are you sure you want to delete this dashboard?');
			if (!userConfirmed) {
				return;
			}
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
				<SidebarTitleContainer>
					<SidebarLocation>Dashboard</SidebarLocation>
					<SidebarTitle>{dashboard.length > 0 ? dashboard[0].title : '-'}</SidebarTitle>
					<SidebarDescription>{
						dashboard.length > 0 ? dashboard[0].description :
							'-'
					}</SidebarDescription>
				</SidebarTitleContainer>

				<Button small layoutType='dropdown' title="Options" primary>
					<ActionText

						onClick={() => setOpenSettingsModal(!openSettingsModal)}
					>
						Rename
					</ActionText>
					<ActionText

						onClick={() => DeleteDashboard()}
					>
						Delete Dashboard
					</ActionText>
				</Button>

			</SideBar>
		);
	};

	useEffect(() => {
		Get({ params: { id: id }, path: 'dashboard', dataSetter: setDashboard, loader: setLoadingDashboard })
		Get({ params: { dashboard_id: id }, path: 'data_table', dataSetter: setDataTables, loader: setLoadingDataTables })

	}, [id])

	useEffect(() => {
		SideBarContainer()
	}, [dashboard])

	useEffect(() => {
		setPath('/dashboard');

	}, []);
	useEffect(() => {
		DashboardContent();
		isAuthenticated && activeTeam[0]?.stripe_subscription != true ?
			setChat([{
				message: `It seems that your team does not have any active subscriptions. Please subscribe first. ❤️`

			}])
			:
			setChat([{
				message:
					dataTables.length > 0
						? `Hello! It looks like you have Sheets integrated! Great! ❤️ You can ask me anything about them or add more. I'm particularly good at answering complex questions about multiple sheets at once, which would take you a long time to do manually.`
						: 'Hello! Create an integration to a Google Sheet and ask me anything about it!'

			}])
	}, [dataTables])

	return (
		<Content>

			{SideBarContainer()}
			<Container>
				<Button
					back
					layoutType='back'
					title='Back'
				/>

				<DashboardContent />
				<Conversation />

				<Chat />
			</Container>
			<Settings
				id={id}
				feature='dashboard'
				openModal={openSettingsModal}
				toggleOpen={() => setOpenSettingsModal(!openSettingsModal)}
				title={dashboard.length > 0 ? dashboard[0].title : null}
				description={dashboard.length > 0 ? dashboard[0].description : null}

			/>
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

				{/* {DataPointSelectorHandler()} */}
			</Modal>
			<Modal
				open={openDataTableModal}
				openModal={() => setOpenDataTableModal()}
				modalTitle="Integrate to new Google Sheet"
			>
				<p>Grant viewer access to the Hyperfigures in your Google Sheet.</p>

				<LinkText
					onClick={() => {
						navigator.clipboard.writeText('hyperfigures-bot@hyperfigures-app.iam.gserviceaccount.com');
						setNotifyMessage('Copied to clipboard')
					}}><FontAwesomeIcon icon={faCopy} />  hyperfigures-bot@hyperfigures-app.iam.gserviceaccount.com
				</LinkText>
				<FormGoogleTable
					setOpenDataTableModal={setOpenDataTableModal}
					dashboardsList={(dashboards && dashboards) || []}
				/>
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
		</Content >
	);
};

export default Dashboard;
