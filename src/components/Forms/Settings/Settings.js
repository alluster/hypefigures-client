import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AppContext } from '../../../context/Context';
import FormCompiler from '../../../supportFunctions/FormComplier';
import Modal from '../../Modal/Modal';
import SubscriptionWarning from '../../Patterns/SubscriptionWarning/SubscriptionWarning';

const Settings = ({
	toggleOpen,
	openModal,
	feature,
	id,
	title,
	description
}) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const { setNotifyMessage, Post, setDashboard, Get, setLoadingDashboard, setLoadingTeam, setTeam } = useContext(AppContext);

	const onSubmit = async (data) => {
		try {
			let path = '';
			let dataSetter;
			let loader;

			switch (feature) {
				case 'dashboard':
					path = 'dashboard';
					dataSetter = setDashboard;
					loader = setLoadingDashboard;
					break;
				case 'team':
					path = 'team';
					dataSetter = setTeam; // Assuming setTeam is defined
					loader = setLoadingTeam; // Assuming setLoadingTeam is defined
					break;
				default:
					throw new Error('Invalid feature');
			}

			const response = await Post({
				params: {
					id: id,
					title: data.title,
					description: data.description
				},
				path: path,
				dataSetter: dataSetter,
				loader: loader
			});

			if (response.status === 200) {
				Get({
					params: {
						id: id,
					},
					path: path,
					dataSetter: dataSetter,
					loader: loader
				});
				setNotifyMessage('Changes saved');
			} else {
				setNotifyMessage(`Failed to save changes ${response?.message}`);
			}
		} catch (error) {
			console.error(error);
			setNotifyMessage('Something went wrong');
		} finally {
			toggleOpen(false);
			reset();
		}
	};

	useEffect(() => {
		reset({
			title: title || null,
			description: description || null
		})
	}, [title, description])
	return (
		<Modal
			open={openModal}
			openModal={() => toggleOpen()}
			modalTitle="Settings"
		>
			<SubscriptionWarning
			>

				<FormCompiler
					reset={reset}
					openModal={() => toggleOpen()}
					errors={errors}
					onSubmit={() => handleSubmit(onSubmit)}
					register={register}
					buttonTitle='Save changes'
					fields={[
						{
							type: 'input',
							name: 'title',
							label: 'Name',
							options: '',
							required: true,
							errorMessage: 'Name is required',
							placeholder: 'Add a name',
						},
						{
							type: 'input',
							name: 'description',
							label: 'Description',
							options: '',
							required: false,
							errorMessage: '',
							placeholder: 'Add a description',
						},

					]}
				/>

			</SubscriptionWarning>

		</Modal>
	);
};

export default Settings;