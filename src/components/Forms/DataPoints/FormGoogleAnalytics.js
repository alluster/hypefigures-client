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
const FormGoogleAnalytics = ({
	setOpenDataPointModal
}) => {
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

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
					property_id: data.propertyId,
					dashboard_id: data.dashboard_id,
					type: 'google-analytics'
				}, path: 'data_point', dataSetter: setDataPoints, loader: setLoadingDataPoints
			})
			console.log('response from response', response.status)
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
						name: 'propertyId',
						label: 'Property Id Analytics',
						options: '',
						required: true,
						errorMessage: 'Required',
						placeholder: 'Find this from Analytics account',
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

export default FormGoogleAnalytics;
