import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AppContext } from '../../../context/Context';
import FormCompiler from '../../../supportFunctions/FormComplier';
import Modal from '../../Modal/Modal';

const FormInvite = ({
	toggleOpen,
	openInviteModal
}) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const { setNotifyMessage, Post, setLoadingInvitations, activeTeam, user, setInvitations } = useContext(AppContext);

	const onSubmit = async (data) => {
		try {
			// Check if the email is the same as the user's email
			if (data.email === user[0].email) {
				setNotifyMessage("You cannot send an invitation to your own email address.");
				return;
			}

			const response = await Post({
				params: {
					email: data.email,
					uniq_team_id: activeTeam[0].uniq_team_id,
					uniq_user_id: user[0].uniq_user_id,
					title: data.title,
					description: data.description
				},
				path: 'invite',
				loader: setLoadingInvitations,
				dataSetter: setInvitations,
			});
			if (response.status === 200) {
				setNotifyMessage(`Invitation sent to ${data.email}`);
			} else {
				setNotifyMessage(`Failed to send invitation to ${data.email}`);
			}
		} catch (error) {
			console.error(error);
			setNotifyMessage('Something went wrong');
		} finally {
			toggleOpen(false);
			reset();
		}
	};

	return (
		<Modal
			open={openInviteModal}
			openModal={() => toggleOpen()}
			modalTitle="Send Invitation"
		>
			<FormCompiler
				reset={reset}
				openModal={() => toggleOpen()}
				errors={errors}
				onSubmit={() => handleSubmit(onSubmit)}
				register={register}
				fields={[
					{
						type: 'email',
						name: 'email',
						label: 'Email',
						options: '',
						required: true,
						errorMessage: 'Email is required',
						placeholder: 'Enter email address',
					},
					{
						type: 'input',
						name: 'title',
						label: 'Invitation message',
						options: '',
						required: true,
						errorMessage: 'Message is required',
						placeholder: 'Enter message',
					}

				]}
			></FormCompiler>
		</Modal>
	);
};

export default FormInvite;