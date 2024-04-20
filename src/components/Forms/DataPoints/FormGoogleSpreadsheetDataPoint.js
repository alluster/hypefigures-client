import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../context/Context';

import { useForm } from 'react-hook-form';

import FormCompiler from '../../../supportFunctions/FormComplier';
import { useParams } from 'react-router-dom';

const Title = styled.h4`
    margin-top: ${(props) => props.theme.grid.divider_2};
    margin-bottom: ${(props) => props.theme.grid.divider_2};
`;
const FormGoogleSpreadsheetDataPoint = ({
	setOpenDataPointModal,


}) => {
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const [openModal, setOpenModal] = useState(false)
	let { id } = useParams();

	const {
		setNotifyMessage,
		Post, setDataPoints,
		setLoadingDataPoints,
		loadingDataPoints,
		setDashboards,
		setLoadingDashboards,
		dashboards,
		Get
	} = useContext(AppContext);

	const onSubmit = async (data) => {
		try {
			const response = await Post({
				params: {
					title: data.dataPointName,
					description: data.dataPointDescription,
					spreadsheet_id: data.spreadsheet_id,
					sheet_id: data.sheet_id,
					cell: data.cell,
					dashboard_id: data.dashboard_id,
					type: 'google-sheet'
				}, path: 'data_point', dataSetter: setDataPoints, loader: setLoadingDataPoints
			})
			if (response.status === 200) {
				setNotifyMessage(`New Data Point ${data.dataPointName} added`);
			}
			else {
				setNotifyMessage(`New Data Point ${data.dataPointName} could not be added`);
			}
		} catch (error) {
			console.log(error);
			setNotifyMessage('Something went wrong');
		} finally {
			reset();
		}
	};
	useEffect(() => {
		reset({
			dashboard_id: id || null
		})
	}, [])

	return (
		<div>
			<FormCompiler
				reset={reset}
				openModal={() => setOpenDataPointModal()}
				errors={errors}
				onSubmit={() => handleSubmit(onSubmit)}
				register={register}
				fields={[

					{
						type: 'input',
						name: 'spreadsheet_id',
						label: 'Spreadsheet Id',
						options: '',
						required: true,
						errorMessage: 'Spreadsheet Id is required',
						placeholder: 'Find this from the sheet URL...',
					},
					{
						type: 'input',
						name: 'sheet_id',
						label: 'Sheet Id',
						options: '',
						required: true,
						errorMessage: 'Sheet Id is required',
						placeholder: 'Find this from the sheet URL...',
					},
					{
						type: 'input',
						name: 'cell',
						label: 'Cell',
						options: '',
						required: true,
						errorMessage: 'Data Point cell is required',
						placeholder: 'A1, C56 ... etc.',
					},
					{
						type: 'input',
						name: 'dataPointName',
						label: 'Name',
						options: '',
						required: true,
						errorMessage: 'Data Point name is required',
						placeholder: 'Budget, Profit, Revenue ... etc.',
					},
					{
						type: 'input',
						name: 'dataPointDescription',
						label: 'Description',
						options: '',
						required: false,
						errorMessage: '',
						placeholder:
							'Calculated profit for this month ... etc.',
					},
					{
						type: 'select',
						name: 'dashboard_id',
						label: 'Add to Dashboard',
						options: dashboards,
						placeholder: 'Select',
						required: false,
						errorMessage: 'Dashboard',
						onChange: () => null,
					},
				]}
			></FormCompiler>
		</div>
	);
};

export default FormGoogleSpreadsheetDataPoint;
