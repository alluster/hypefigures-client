import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../context/Context';
import FormInvite from '../Forms/Invite/FormInvite'; // Assuming FormInvite component is imported
import TeamSelector from '../Patterns/TeamSelector/TeamSelector'; // Assuming TeamSelector component is imported

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: 100px;
	
`;

const Links = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    flex-direction: row;
    justify-content: space-between; /* Space evenly between items */
	margin-right: 20px;
`;

const NavItem = styled(Link)`
    margin-left: 20px;
    // position: relative; /* Added for dot positioning */
`;

const Dot = styled.div`
    position: absolute;
    top: -3px; /* Adjust as needed for vertical positioning */
    right: -5px; /* Adjust as needed for horizontal positioning */
    width: 8px;
    height: 8px;
    background-color: red;
    border-radius: 50%;
`;
const InviteButton = styled.p`
	&:hover {
		cursor:pointer;
	}
`

const TopNav = () => {
	const { user } = useContext(AppContext);
	const [inviteFormOpen, setInviteFormOpen] = useState(false);

	return (
		<Wrapper>
			<TeamSelector />
			<Links>
				{
					user.length > 0 && user[0].team && user[0].team.length > 0 ?
						<InviteButton
							onClick={() => setInviteFormOpen(!inviteFormOpen)}
						>
							Invite new team member
						</InviteButton>
						:
						null}

				<NavItem to="/invitations">
					<FontAwesomeIcon icon={faBell} size="sm" />
					{user.length > 0 && user[0].invitations.length > 0 && <Dot />}
				</NavItem>
				<NavItem to="/user">
					<p>{user.length > 0 ? user[0].email : ''}</p>
				</NavItem>
			</Links>
			<FormInvite toggleOpen={setInviteFormOpen} openInviteModal={inviteFormOpen} />
		</Wrapper>
	);
};

export default TopNav;
