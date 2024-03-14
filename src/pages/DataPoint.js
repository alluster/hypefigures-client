import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/Context';
import Card from '../components/Card';
import HeaderText from '../components/HeaderText';
import Container from '../components/Container';
import ButtonGoBack from '../components/ButtonGoBack';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';
import TextWithLabel from '../components/TextWithLabel';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '../components/Button';

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

	const history = useHistory();
	const { setNotifyMessage, setPath } = useContext(AppContext);

	let { id } = useParams();

	const [dataPoint, setDataPoint] = useState({
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
	});






	useEffect(() => {
		setPath('/dataPoint');
		window.scroll(0, 0);
	}, []);


	const DataPointContent = () => {

		return (
			<div>
				<ButtonGoBack text="Go Back" />

				<div>
					<HeaderText
						locationText="Data Point"
						title={dataPoint.title || '-'}
						description={dataPoint.description || '-'}
					/>
					<Card>
						<TextWithLabel
							title={dataPoint.value || '-'}
							label="Value"
						/>
					</Card>
					<Card>
						<TextWithLabel
							title={dataPoint.updated_at}
							label="Updated"
						/>
						<TextWithLabel
							title={dataPoint.created_at}
							label="Created"
						/>
						<TextWithLabel
							title={dataPoint.data_point_group}
							label="Group"
						/>
						<TextWithLabel
							title={dataPoint.creator}
							label="Creator"
						/>
					</Card>
					<Card>
						<TextWithLabel
							title={dataPoint.sheetTitle}
							label="Sheet name"
						/>
						<TextWithLabel
							title={dataPoint.spreadsheetId}
							label="Spreadsheet"
						/>
						<TextWithLabel
							title={dataPoint.sheetId}
							label="Sheet"
						/>
						<TextWithLabel
							title={dataPoint.cell}
							label="Cell"
						/>
					</Card>
					<Button
						primary
						type="button"
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
