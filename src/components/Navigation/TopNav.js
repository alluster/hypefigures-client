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
    position: relative; /* Added for dot positioning */
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
const AddTeamButton = styled.button`
    text-align: center;
    border-radius: 8px;
    padding-left: 40px;
    padding-right: 40px;
    font-size: 22.6px;
    line-height: 64px;
    font-weight: 700;
    display: flex;
    flex-direction: row;
    align-items: center;
const MarginContainer = styled.div`
	;

const InviteButton = styled.p`
	&:hover {
		cursor:pointer;
	}
`;

const MarginContainer = styled.div`
    ${({ sideBarOpen, navigationOpen }) => {
		if (sideBarOpen && !navigationOpen) {
			return `
                margin-left: 160px;
            `;
		} else if (!sideBarOpen && navigationOpen) {
			return `
                margin-left: 160px;
            `;
		} else if (!sideBarOpen && !navigationOpen) {
			return `
                margin-left: 10px;
            `;
		} else if (sideBarOpen && navigationOpen) {
			return `
                margin-left: 340px;
            `;
		}
	}}
`;
const TopNav = () => {
	const { user, sideBarOpen, navigationOpen, isAuthenticated, activeTeam } = useContext(AppContext);
	const [inviteFormOpen, setInviteFormOpen] = useState(false);

	return (
		<div>

			{
				isAuthenticated
					?
					<MarginContainer sideBarOpen={sideBarOpen} navigationOpen={navigationOpen}>
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
								{
									activeTeam != null
										?
										<NavItem to="/invitations">
											<FontAwesomeIcon icon={faBell} size="sm" />
											{user.length > 0 && user[0].invitations.length > 0 && <Dot />}
										</NavItem>
										:
										null
								}

								<NavItem to="/user">
									<p>{user.length > 0 ? user[0].email : ''}</p>
								</NavItem>
							</Links>
						</Wrapper>

					</MarginContainer>
					:
					null
			}

			< FormInvite toggleOpen={setInviteFormOpen} openInviteModal={inviteFormOpen} />
		</div >

	);
};

export default TopNav;
