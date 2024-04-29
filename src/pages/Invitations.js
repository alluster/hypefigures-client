import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/Context';
import { device } from '../styles/device-braking-points';
import Button from '../components/Button/Button';
import Container from '../components/Container/Container';
import Card from '../components/Card/Card';
import CardGrid from '../components/Card/CardGrid';
import HeaderText from '../components/Text/HeaderText';

const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    margin-top: ${(props) => props.theme.grid.divider_4};
`;

const Invitations = () => {
	const { invitations, Post, setNotifyMessage, user, setInvitations, setLoadingInvitations } = useContext(AppContext);

	const acceptInvitation = async ({ invitation_id, team_id }) => {
		try {
			const response = await Post({
				path: 'invite/accept',
				params: {
					id: invitation_id,
					user_id: user[0].id,
					team_id: team_id
				},
				dataSetter: setInvitations,
				loader: setLoadingInvitations
			});
			if (response.status === 200) {
				console.log('Invitation accepted successfully.');
				// You can add any additional logic here after accepting the invitation
			} else {
				console.error('Failed to accept invitation:', response.data);
			}
		} catch (error) {
			console.error('Error accepting invitation:', error);
		}
	};

	const declineInvitation = async ({ invitation_id, team_id }) => {
		try {
			const response = await Post({
				path: 'invite/decline',
				params: {
					id: invitation_id,
					user_id: user[0].id,
					team_id: team_id
				},
				dataSetter: setNotifyMessage,
				loader: setLoadingInvitations
			});
			if (response.status === 200) {
				console.log('Invitation declined successfully.');
				// You can add any additional logic here after declining the invitation
			} else {
				console.error('Failed to decline invitation:', response.data);
			}
		} catch (error) {
			console.error('Error declining invitation:', error);
		}
	};
	const InvitationsList = () => {
		return (
			<CardGrid>
				{user.length > 0 && user[0].invitations && user[0].invitations.length > 0 ? (
					user[0].invitations.map((invitation, index) => (
						<Card key={index}>
							<h4>{invitation.title}</h4>
							<p>{invitation.description}</p>
							<p>{invitation.updated_at}</p>
							<ButtonRow>
								<Button onClick={() => acceptInvitation({ invitation_id: invitation.id, team_id: invitation.team_id })} dividerRight title="Accept" />
								<Button onClick={() => declineInvitation({ invitation_id: invitation.id, team_id: invitation.team_id })} white title="Decline" />
							</ButtonRow>

						</Card>
					))
				) : (
					<p>No invitations</p>
				)}
			</CardGrid>
		)
	}
	useEffect(() => {
		InvitationsList()
	}, [user])
	return (
		<Container>
			<Button
				ghost
				layoutType='back'
				title='Go Back'
			/>
			<HeaderText
				title="Invitations"
				description="Your invitations"
			/>
			{InvitationsList()}
		</Container>
	);
};

export default Invitations;
