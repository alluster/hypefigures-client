import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../../context/Context';
import { useForm } from 'react-hook-form';
import FormCompiler from '../../../supportFunctions/FormComplier';
import { useParams } from 'react-router-dom';

const FormGoogleTable = ({
	setOpenDataTableModal
}) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	let { id } = useParams();

	const {
		setNotifyMessage,
		Post,
		setDataTables,
		setLoadingDataTables,
		dashboards,
		Get,
		setDashboards,
		setLoadingDashboards
	} = useContext(AppContext);

	const sheetId = async (data) => {
		try {
			const regex = /gid=([^&]+)/;
			const match = data.sheetUrl.match(regex);
			const sheetId = match ? match[1] : '0';
			return sheetId;
		} catch (err) {
			console.log(err);
			return 'No Id Found';
		}
	};

	const spreadsheetId = async (data) => {
		try {
			const regex = /\/spreadsheets\/d\/([^/]+)/;
			const match = data.sheetUrl.match(regex);
			const spreadsheetId = match ? match[1] : '0';
			return spreadsheetId;
		} catch (err) {
			console.log(err);
			return 'No Id Found';
		}
	};

	const onSubmit = async (data) => {
		try {
			// Extract spreadsheet_id and sheet_id from the URL
			const spreadsheetIdValue = await spreadsheetId(data);
			const sheetIdValue = await sheetId(data);

			const response = await Post({
				params: {
					title: data.dataTableName,
					description: data.dataTableDescription,
					spreadsheet_id: spreadsheetIdValue,
					sheet_id: sheetIdValue,
					dashboard_id: data.dashboard_id,
				}, path: 'data_table', dataSetter: setDataTables, loader: setLoadingDataTables
			});
			if (response.status === 200) {
				setNotifyMessage(`New Data Table ${data.dataTableName} added`);
			} else {
				setNotifyMessage(`New Data Table ${data.dataTableName} could not be added`);
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
		});
		Get({ params: {}, path: 'dashboard', dataSetter: setDashboards, loader: setLoadingDashboards })

	}, []);

	return (
		<div>
			<FormCompiler
				reset={reset}
				openModal={() => setOpenDataTableModal()}
				errors={errors}
				onSubmit={() => handleSubmit(onSubmit)}
				register={register}
				fields={[
					{
						type: 'input',
						name: 'sheetUrl',
						label: 'Google Sheet URL',
						options: '',
						required: true,
						errorMessage: 'Sheet URL is required',
						placeholder: 'https://docs.google.com/spreadsheets/d/1WLAIkeC55WUo3nahxpIug2uEKBfXH8KtxEBzLPzPs2M/edit#gid=611000715',
					},
					{
						type: 'input',
						name: 'dataTableName',
						label: 'Sheet name',
						options: '',
						required: true,
						errorMessage: 'Data Table name is required',
						placeholder: 'Budget, Profit, Revenue ... etc.',
					},
					{
						type: 'input',
						name: 'dataTableDescription',
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

export default FormGoogleTable;
