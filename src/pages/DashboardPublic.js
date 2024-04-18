import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../context/Context';
import HeaderText from '../components/Text/HeaderText';
import Container from '../components/Container/Container';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import CardGrid from '../components/Card/CardGrid';
import CardPublicDataPoint from '../components/Card/CardPublicDataPoint';

const DashboardPublic = () => {
	const [dataPoints, setDataPoints] = useState([]);
	const [openModal] = useState(false);
	let { id } = useParams();
	const { setAppLocation, setNotifyMessage, setPath } =
		useContext(AppContext);
	const { error, loading, data } = useQuery(LOAD_PUBLIC_DASHBOARD, {
		variables: { id: parseInt(id) },
	});

	const [publicDashboardData, setPublicDashboardData] = useState([]);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [publicDashboardid, setPublicDashboardId] = useState('');
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const DataPoints = () => {
		if (loading && dataPoints != {} && dataPoints.length > 0) {
			return <p>Loading data...</p>;
		}
		if (error) {
			console.log('error occurred', error);
		} else {
			return (
				<div>
					<CardGrid>
						{dataPoints.length > 0 &&
							dataPoints.map((item, i) => {
								return (
									<CardPublicDataPoint
										key={i}
										value={item.value}
										title={item.title}
										description={item.sheet_title}
									></CardPublicDataPoint>
								);
							})}
					</CardGrid>
				</div>
			);
		}
	};

	const DashboardContent = () => {
		if (loading) {
			return <p>Loading data...</p>;
		}
		if (error) {
			console.log('error', error);
		} else {
			return (
				<div>
					{publicDashboardData.length > 0 ? (
						<div>
							<HeaderText
								locationText="Public Dashboard"
								title={title}
								description={description}
							/>
							{DataPoints()}
						</div>
					) : (
						<p>No data</p>
					)}
				</div>
			);
		}
	};

	useEffect(() => {
		window.scroll(0, 0);

		if (data) {
			setPublicDashboardData(data.getPublicDashboard[0].dashboard_data);
			setTitle(data.getPublicDashboard[0].title || '');
			setDescription(data.getPublicDashboard[0].description || '');
			setPublicDashboardId(data.getPublicDashboard[0].id || '');
		}
	}, [data]);
	useEffect(() => {
		if (publicDashboardData.length > 0) {
			setDataPoints(JSON.parse(publicDashboardData));
		}
	}, [publicDashboardData]);
	useEffect(() => {
		setPath('/dashboardPublic');
	}, []);
	return <Container>{DashboardContent()}</Container>;
};

export default DashboardPublic;
