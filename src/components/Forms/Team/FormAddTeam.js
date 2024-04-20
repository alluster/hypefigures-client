import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../../context/Context';
import { useForm } from 'react-hook-form';
import FormCompiler from '../../../supportFunctions/FormComplier';
import { useParams } from 'react-router-dom';
import Modal from '../../Modal/Modal';

const FormAddTeam = ({
	toggleOpen,
	openTeamModal
}) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	let { id } = useParams();

	const { setNotifyMessage, Post, setTeams, setLoadingTeams, user } = useContext(AppContext);

	const onSubmit = async (data) => {
		try {
			const response = await Post({ params: { title: data.teamName, description: data.teamDescription, uniq_user_id: user[0].uniq_user_id }, path: 'team', dataSetter: setTeams, loader: setLoadingTeams })
			if (response.status === 200) {
				setNotifyMessage(`New team ${data.teamName} added`);
			}
			else {
				setNotifyMessage(`New team ${data.teamName} could not be added`);
			}
		} catch (error) {
			console.log(error);
			setNotifyMessage('Something went wrong');
		} finally {
			toggleOpen(false);
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
			<Modal
				open={openTeamModal}
				openModal={() => toggleOpen()}
				modalTitle="Create a new Team"
			>
				<FormCompiler
					reset={reset}
					openModal={() => toggleOpen()}
					errors={errors}
					onSubmit={() => handleSubmit(onSubmit)}
					register={register}
					fields={[
						{
							type: 'input',
							name: 'teamName',
							label: 'Team name',
							options: '',
							required: true,
							errorMessage: 'Team name is required',
							placeholder: 'Give your team a name',
						},
						{
							type: 'textarea',
							name: 'teamDescription',
							label: 'Team Description',
							options: '',
							required: false,
							errorMessage: '',
							placeholder: 'Describe your team',
						},
					]}
				></FormCompiler>
			</Modal>
		</div>
	);
};

export default FormAddTeam;
