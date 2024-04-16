import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/Context';
import Card from '../components/Card/Card';
import HeaderText from '../components/Text/HeaderText';
import Container from '../components/Container/Container';
import ButtonGoBack from '../components/Button/ButtonGoBack';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';
import TextWithLabel from '../components/Text/TextWithLabel';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '../components/Button/Button';

const Value = styled.h3`
    font-weight: bold;
`;

const Divider = styled.div`
    border-bottom: 1px solid ${(props) => props.theme.colors.gray_60};
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
`;
const Label = styled.p`
    color: ${(props) => props.theme.colors.gray_130};
    font-size: 14px;
`;

const DataPoint = () => {

	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	let { id } = useParams();
	const history = useHistory();
	const { setNotifyMessage, setPath, dataPoints, Get, Post, setLoadingDataPoints, setDataPoint, dataPoint } = useContext(AppContext);
	const DeleteDataPoint = async () => {
		try {
			const response = await Post({
				params: {
					id: id,
					deleted_at: true
				}, path: 'data_point', dataSetter: setDataPoint, loader: setLoadingDataPoints
			})
			if (response.status === 200) {
				history.goBack();
				setNotifyMessage('Data Point Deleted')
			} else {
				setNotifyMessage('Data Point removal failed')

			}
		}
		catch (err) { console.log(err), setNotifyMessage('Data Point removal failed') }
	}

	const [data, setData] = useState({
		created_at: 'Loading data...',
		title: 'Loading data...',
		description: 'Loading data...',
		updated_at: 'Loading data...',
		deleted_at: 'Loading data...',
		value: 'Loading data...',
		cell: 'Loading data...',
		spreadsheetId: 'Loading data...',
		sheetId: 'Loading data...',
		creator: 'Loading data...',
		data_point_group: 'Loading data...',
		serviceAccount: 'Loading data...',
		property_id: 'Loading data...',
		type: 'Loading data...'
	});

	useEffect(() => {
		setPath('/dataPoint');
		window.scroll(0, 0);
		Get({ params: { id: id }, path: 'data_point', dataSetter: setDataPoint, loader: setLoadingDataPoints })
	}, []);
	useEffect(() => {
		DataPointContent()
	}, [data])
	useEffect(() => {
		if (dataPoint.length > 0) {
			setData({
				created_at: dataPoint[0].created_at || 'No data',
				title: dataPoint[0].title || 'No data',
				description: dataPoint[0].description || 'No data',
				updated_at: dataPoint[0].updated_at || 'No data',
				deleted_at: dataPoint[0].deleted_at || 'No data',
				value: dataPoint[0].value || 'No data',
				cell: dataPoint[0].cell || 'No data',
				spreadsheetId: dataPoint[0].spreadsheetId || 'No data',
				sheetId: dataPoint[0].sheetId || 'No data',
				creator: dataPoint[0].creator || 'No data',
				serviceAccount: dataPoint[0].title || 'No data',
				property_id: dataPoint[0].property_id || 'No data',
				type: dataPoint[0].type || 'No data'
			})
		}

	}, [dataPoint])

	const DataPointContent = () => {

		return (
			<div>
				<ButtonGoBack text="Go Back" />

				<div>
					<HeaderText
						locationText="Data Point"
						title={data.title || '-'}
						description={data.description || '-'}
					/>
					<Card>
						<TextWithLabel
							title={data.value || '-'}
							label="Value"
						/>
					</Card>
					<Card>
						<TextWithLabel
							title={data.updated_at}
							label="Updated"
						/>
						<TextWithLabel
							title={data.created_at}
							label="Created"
						/>
						<TextWithLabel
							title={data.data_point_group}
							label="Group"
						/>
						<TextWithLabel
							title={data.creator}
							label="Creator"
						/>
					</Card>
					<Card>
						<TextWithLabel
							title={dataPoint.sheetTitle}
							label="Sheet name"
						/>
						<TextWithLabel
							title={data.spreadsheetId}
							label="Spreadsheet"
						/>
						<TextWithLabel
							title={data.sheetId}
							label="Sheet"
						/>
						<TextWithLabel
							title={data.cell}
							label="Cell"
						/>
					</Card>
					<Button
						type="button"
						onClick={() => DeleteDataPoint()}
					>
						<p>Delete Data Point</p>
					</Button>
				</div>
			</div>
		);

	};

	return <Container>{DataPointContent()}</Container>;
};

export default DataPoint;
