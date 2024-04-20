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
	} = useContext(AppContext);

	const onSubmit = async (data) => {
		try {
			const response = await Post({
				params: {
					title: data.dataTableName,
					description: data.dataTableDescription,
					spreadsheet_id: data.spreadsheet_id,
					sheet_id: data.sheet_id,
					dashboard_id: data.dashboard_id,
				}, path: 'data_table', dataSetter: setDataTables, loader: setLoadingDataTables
			})
			if (response.status === 200) {
				setNotifyMessage(`New Data Table ${data.dataTableName} added`);
			}
			else {
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
		})
	}, [])

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
						name: 'dataTableName',
						label: 'Name',
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
