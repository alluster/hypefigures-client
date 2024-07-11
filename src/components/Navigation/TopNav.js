import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../context/Context';
import FormInvite from '../Forms/Invite/FormInvite'; // Assuming FormInvite component is imported
import TeamSelector from '../Patterns/TeamSelector/TeamSelector'; // Assuming TeamSelector component is imported
import { device } from '../../styles/device-braking-points';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: 100px;
	background-color: white;
	@media ${device.laptop} {
	    margin-left: 50px;

  }
`;

const Links = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    flex-direction: row;
	height: 100%;
    justify-content: space-between; /* Space evenly between items */
	margin-right: 20px;
	@media ${device.laptop} {
	    margin-left: 0px;
		margin-top: 10px;

  }
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

const InviteButton = styled.p`
	position: relative;
	&:hover {
		cursor:pointer;
	}
		
`;

const MarginContainer = styled.div`
    ${({ sideBarOpen, navigationOpen }) => {
		if (sideBarOpen && !navigationOpen) {
			return `
                margin-left: 160px;
				 @media ${device.laptop} {
	    			margin-left: 0px;
				}
            `;
		} else if (!sideBarOpen && navigationOpen) {
			return `
                margin-left: 160px;
				@media ${device.laptop} {
					margin-left: 0px;
				}
            `;
		} else if (!sideBarOpen && !navigationOpen) {
			return `
                margin-left: 10px;
				@media ${device.laptop} {
					margin-left: 0px;
				}
            `;
		} else if (sideBarOpen && navigationOpen) {
			return `
                margin-left: 340px;
				@media ${device.laptop} {
	    			margin-left: 0px;
				}
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
					<MarginContainer style={{ backgroundColor: '#ffffff' }} sideBarOpen={sideBarOpen} navigationOpen={navigationOpen}>
						<Wrapper>

							<TeamSelector />
							<Links>
								{
									user.length > 0 && user[0].team && user[0].team.length > 0 ?
										<div>

											<InviteButton
												onClick={() => setInviteFormOpen(!inviteFormOpen)}
											>
												<FontAwesomeIcon icon={faUserPlus} size="sm" />
											</InviteButton>
										</div>
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
