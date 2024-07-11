import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AppContext } from '../../../context/Context';
import FormCompiler from '../../../supportFunctions/FormComplier';
import Modal from '../../Modal/Modal';
import SubscriptionWarning from '../../Patterns/SubscriptionWarning/SubscriptionWarning';

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
				setNotifyMessage(`Failed to send invitation to ${data.email}. ${response?.message}`);
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
			modalTitle="Invite a new team member"
		>
			<SubscriptionWarning
			>
				<span className="inline-flex items-center rounded-md bg-red-50 mt-10 px-3 py-3 text-m font-large text-red-800 ring-1 ring-inset ring-red-600/20">
					👋 for security reasons the invited person has to register using the same email provided in the invitation before they can accept your invitation. Send the invitation and email them the register link. https://app.hyperfigures.com/register
				</span>

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
				/>

			</SubscriptionWarning>

		</Modal>
	);
};

export default FormInvite;